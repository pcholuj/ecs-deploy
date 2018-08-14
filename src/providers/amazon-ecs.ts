import { Injectable, Inject } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as Convict from 'convict';

export const DEPLOYMENT_STATUS_INPROGRESS = 1;
export const DEPLOYMENT_STATUS_ERROR = 2;
export const DEPLOYMENT_STATUS_DONE = 3;

@Injectable()
export class AmazonEcs {

    private sdk: AWS.ECS;
    private ecrSdk: AWS.ECR;

    constructor(@Inject('Config') private readonly config: Convict) {
        AWS.config.update(this.config.get('aws'));

        this.sdk = new AWS.ECS();
        this.ecrSdk = new AWS.ECR();
    }

    public getTaskDefinition(definitionName: string): Promise<AWS.ECS.Types.DescribeTaskDefinitionResponse> {
        return this.sdk.describeTaskDefinition({
            taskDefinition: definitionName,
        }).promise();
    }

    public getRepositoryList(name: string) {
        const app = this.getApplication(name);

        return this.ecrSdk.listImages({
            repositoryName: app.repository,
        }).promise();
    }

    public deploy(name, tag) {
        return this.checkRepository(name, tag).then(() => {
            console.info(`[AWS][ECS] - Service deploy started ${name}:${tag}`);

            return this.updateTaskDefinition(name, tag).then((taskArn) => {
                return this.updateService(name, taskArn).then((res) => {
                    console.info(`[AWS][ECS] - Service deploy done ${name}:${tag}`);
                    return res.service;
                });
            });
        });
    }

    public getService(name): Promise<AWS.ECS.Types.Service | undefined> {
        const app = this.getApplication(name);

        return this.sdk.describeServices({
            cluster: app.clusterName,
            services: [app.serviceName],
        }).promise().then((res) => {
            if (!res.services || res.services.length === 0) {
                throw new Error(`[AWS][ECS] - Cannot get service ${name}`);
            }

            return res.services.pop();
        });
    }

    public isServiceReady(name, taskArn) {
        return new Promise((resolve, reject) => {
            this.getService(name).then((service) => {
                if (!service) {
                    throw new Error(`[AWS][ECS] - Cannot get service ${name}`);
                }

                if (!service.deployments || service.deployments.length === 0) {
                    return reject({
                        status: DEPLOYMENT_STATUS_ERROR,
                        message: 'No deployment found',
                    });
                }

                let oldServicesCount = 0;
                let currentDeployment: AWS.ECS.Deployment | null = null;

                for (let i = 0; i < service.deployments.length; i++) {
                    if (!service.deployments.hasOwnProperty(i)) {
                        continue;
                    }

                    if (service.deployments[i].taskDefinition === taskArn) {
                        currentDeployment = service.deployments[i];
                        continue;
                    }

                    oldServicesCount += service.deployments[i].runningCount || 0;
                }

                if (!currentDeployment) {
                    return true;
                }

                if (currentDeployment.desiredCount === currentDeployment.runningCount) {
                    if (oldServicesCount === 0) {
                        return resolve({
                            status: DEPLOYMENT_STATUS_DONE,
                            message: 'Old services are still running',
                        });
                    }

                    return reject({
                        status: DEPLOYMENT_STATUS_INPROGRESS,
                        message: 'Old services are running',
                    });
                }

                return reject({
                    status: DEPLOYMENT_STATUS_INPROGRESS,
                    message: 'Waiting for desired instances count',
                });

            });

        });
    }

    private updateTaskDefinition(definitionName: string, tag: string) {
        console.info(`[AWS][ECS] - Updating task definition for ${definitionName}:${tag}`);

        return this.getTaskDefinition(definitionName).then((response) => {
            const taskDefinition = response.taskDefinition;

            if (!taskDefinition) {
                throw new Error('[AWS][ECS] - Task definition not found');
            }

            if (!taskDefinition.containerDefinitions) {
                throw new Error('[AWS][ECS] - Container definitions not found');
            }

            taskDefinition.containerDefinitions = taskDefinition.containerDefinitions.map((tdc) => {
                tdc.image = tdc.image ? this.updateImageVersion(tdc.image, tag) : '';
                return tdc;
            });

            const newTaskDefinition = {
                family: definitionName,
                taskRoleArn: taskDefinition.taskRoleArn,
                executionRoleArn: taskDefinition.executionRoleArn,
                networkMode: taskDefinition.networkMode,
                containerDefinitions: taskDefinition.containerDefinitions,
                volumes: taskDefinition.volumes,
                placementConstraints: taskDefinition.placementConstraints,
                requiresCompatibilities: taskDefinition.requiresCompatibilities,
                cpu: taskDefinition.cpu,
                memory: taskDefinition.memory,
            };

            return this.sdk.registerTaskDefinition(newTaskDefinition).promise().then((registerRes) => {
                if (registerRes.taskDefinition) {
                    console.info(`[AWS][ECS] - Register task definition:
                                ${definitionName}:${tag} - ${registerRes.taskDefinition.taskDefinitionArn}`);

                    return registerRes.taskDefinition.taskDefinitionArn;
                }

                throw new Error(`[AWS][ECS] - Task definition ${definitionName} not registered. Missing arn`);
            });
        });
    }

    private updateService(name, taskArn) {
        const app = this.getApplication(name);

        return this.sdk.updateService({
            service: app.serviceName,
            cluster: app.clusterName,
            taskDefinition: taskArn,
        }).promise();
    }

    private checkRepository(name, tag) {
        const app = this.getApplication(name);

        return this.ecrSdk.listImages({
            repositoryName: app.repository,
        }).promise().then((results) => {
            if (!results.imageIds) {
                throw new Error(`[AWS][ECS] - Image ${name} not found`);
            }

            const exists = results.imageIds.some((el) => {
                return el.imageTag === tag;
            });

            if (!exists) {
                throw new Error(`[AWS][ECS] - Image ${name}:${tag} not found in repository`);
            }
        });
    }

    private getApplication(name) {
        if (!this.config.has(`applications`)) {
            throw new Error(`[AWS][ECS] - Application ${name} not found in config`);
        }

        const applications = this.config.get('applications');

        for (const i in applications) {
            if (applications[i].name === name && applications[i].type === 'esc') {
                return applications[i];
            }
        }

        throw new Error(`[AWS][ECS] - Application ${name} not found in config`);
    }

    private updateImageVersion(image: string, version: string) {
        const imageParts = image.split(':');
        return [imageParts[0], version].join(':');
    }

}
