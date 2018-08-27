import { Deploys } from './deploys.entity';
import { Applications } from './../applications/applications.entity';
import { AmazonEcs } from '@providers/amazon-ecs';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DeployersService } from 'deployers/deployers.service';

@Injectable()
export class DeploysService {

    constructor(
        @Inject('ApplicationsRepository') private readonly applications: Repository<Applications>,
        @Inject('DeploysRepository') private readonly deploys: Repository<Deploys>,
        @Inject('AmazonEcs') private readonly amazon: AmazonEcs,
        @Inject('DeployersService') private readonly deployer: DeployersService,
    ) {

    }

    public findAll() {
        return this.deploys.find();
    }

    public findById(id: number) {
        return this.deploys.findByIds([id]);
    }

    public deploy(name: string, tag: string) {
        // return this.amazon.deploy(name, tag);
    }

    public status(name, arn) {
        // return this.amazon.isServiceReady(name, arn);
    }

}
