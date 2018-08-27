import { Config } from '@providers/config';
import { AdapterInterface, DeployersStatus, DeployersVersions } from './adapter.interface';
import * as AWS from 'aws-sdk';
import { Applications } from 'api/applications/applications.entity';

export const DEPLOYMENT_STATUS_INPROGRESS = 1;
export const DEPLOYMENT_STATUS_ERROR = 2;
export const DEPLOYMENT_STATUS_NOTFOUND = 3;
export const DEPLOYMENT_STATUS_DONE = 4;

export class Ecs implements AdapterInterface {
    public readonly name = 'ecs';

    private sdk: AWS.ECS;
    private ecrSdk: AWS.ECR;

    constructor(private readonly config: Config) {
        AWS.config.update(this.config.get('aws'));

        this.sdk = new AWS.ECS();
        this.ecrSdk = new AWS.ECR();
    }

    public deploy(app: Applications, tag: string, config: any): Promise<DeployersStatus> {
        console.info(`deploying ${app.name} from tag ${tag} and config ${JSON.stringify(config)}`);

        return this.checkRepository(app, tag).then(() => {
            console.info(`[AWS][ECS] - Service deploy started ${app.name}:${tag}`);

            return this.updateTaskDefinition(app, tag).then((taskArn) => {
                return this.updateService(app, taskArn).then((res) => {
                    return {
                        name: app.name,
                        tag,
                        status: DEPLOYMENT_STATUS_INPROGRESS,
                    }
                });
            });
        });

    }
    
    public async status(app: Applications): Promise<DeployersStatus> {
        console.info(`Status of ${app.name}`);
        return this.getLastDeployStatus(app);
    }

    public async versions(app: Applications): Promise<DeployersVersions[]> {
        return this.ecrSdk.listImages({
            repositoryName: app.config.repository,
        }).promise().then((res) => {
            if (!res.imageIds) {
                return [];
            }

            return res.imageIds.map((entry) => {
                return {
                    name: app.name,
                    tag: entry.imageTag,
                    config: {
                        digest: entry.imageDigest
                    }
                };
            })
        });
    }

    private getTaskDefinition({config}): Promise<any> {
        return this.sdk.describeTaskDefinition({
            taskDefinition: config.taskDefinition,
        }).promise();
    }

    private async getTagByTaskDefinition({name, config}) {
        const td = await this.getTaskDefinition({config});
        let tag = null;

        td.taskDefinition.containerDefinitions.forEach((t) => {
            if (t.name.indexOf(name) > -1) {
                tag = t.image.split(':').slice(-1).pop();
            }
        });

        return tag
    }

    private getService(app): Promise<AWS.ECS.Types.Service | undefined> {
        return this.sdk.describeServices({
            cluster: app.config.clusterName,
            services: [app.config.serviceName],
        }).promise().then((res) => {
            if (!res.services || res.services.length === 0) {
                throw new Error(`[AWS][ECS] - Cannot get service ${app.name}`);
            }

            return res.services.pop();
        });
    }

    private async getLastDeployStatus(app) {
        const service = await this.getService(app);
        const tag = await this.getTagByTaskDefinition(app);

        if (!service) {
            throw new Error(`[AWS][ECS] - Cannot get service ${app.name}`);
        }

        if (!service.deployments || service.deployments.length === 0) {
            return Promise.resolve({
                name: app.name,
                tag,
                status: DEPLOYMENT_STATUS_NOTFOUND,
            });
        }

        let oldServicesCount = 0;
        let currentDeployment: AWS.ECS.Deployment | null = null;

        for (let i = 0; i < service.deployments.length; i++) {
            if (!service.deployments.hasOwnProperty(i)) {
                continue;
            }

            if (service.deployments[i].taskDefinition === service.taskDefinition) {
                currentDeployment = service.deployments[i];
                continue;
            }

            oldServicesCount += service.deployments[i].runningCount || 0;
        }

        if (!currentDeployment) {
            return Promise.resolve({
                status: DEPLOYMENT_STATUS_NOTFOUND,
                name: app.name,
                tag,
            });
        }

        if (currentDeployment.desiredCount === currentDeployment.runningCount) {
            if (oldServicesCount === 0) {
                return Promise.resolve({
                    status: DEPLOYMENT_STATUS_DONE,
                    name: app.name,
                tag,
                });
            }

            return Promise.resolve({
                status: DEPLOYMENT_STATUS_INPROGRESS,
                name: app.name,
                tag,
            });
        }

        return Promise.resolve({
            status: DEPLOYMENT_STATUS_INPROGRESS,
            name: app.name,
            tag,
        });
    }

    private updateTaskDefinition(app, tag: string) {
        console.info(`[AWS][ECS] - Updating task definition for ${app.name}:${tag}`);

        return this.getTaskDefinition(app).then(({ taskDefinition }) => {
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
                family: app.config.taskDefinition,
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
                                ${app.name}:${tag} - ${registerRes.taskDefinition.taskDefinitionArn}`);

                    return registerRes.taskDefinition.taskDefinitionArn;
                }

                throw new Error(`[AWS][ECS] - Task definition ${app.name} not registered. Missing arn`);
            });
        });
    }

    private updateService({config}, taskArn) {
        // const app = this.getApplication(name);

        return this.sdk.updateService({
            service: config.serviceName,
            cluster: config.clusterName,
            taskDefinition: taskArn,
        }).promise();
    }

    private checkRepository({name, config}, tag) {
        // const app = this.getApplication(name);

        return this.ecrSdk.listImages({
            repositoryName: config.repository,
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

    private updateImageVersion(image: string, version: string) {
        const imageParts = image.split(':');
        return [imageParts[0], version].join(':');
    }
}