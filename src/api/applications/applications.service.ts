import { DeployersService } from 'deployers/deployers.service';
import { Applications } from './applications.entity';
// import { Config } from '@providers/config';
import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';

@Injectable()
export class ApplicationsService {

    constructor(
        @Inject('ApplicationsRepository') private readonly repository: Repository<Applications>,
        @Inject('DeployersService') private readonly deployer: DeployersService,
    ) {

    }

    findAll() {
        return this.repository.find();
    }

    findById(id: number) {
        return this.repository.findOne({
            where: {
                id,
            },
        });
    }

    async deploy(id: number, tag: string) {
        const app = await this.findById(id);

        if (!app) {
            throw new Error(`Application with id ${id} not found`);
        }

        return this.deployer.deploy(app, tag);
    }

    async status(id: number) {
        const app = await this.findById(id);

        if (!app) {
            throw new Error(`Application with id ${id} not found`);
        }

        return this.deployer.status(app);
    }

    async findVersionsById(id: number) {
        const app = await this.findById(id);

        if (!app) {
            throw new Error(`Application with id ${id} not found`);
        }

        return this.deployer.versions(app);
    }
}
