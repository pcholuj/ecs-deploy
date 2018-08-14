import { AmazonEcs } from '@providers/amazon-ecs';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class DeploysService {

    constructor(
        @Inject('AmazonEcs') private readonly amazon: AmazonEcs,
    ) {

    }

    public getTasks(name: string) {
        return this.amazon.getTaskDefinition(name);
    }

    public deploy(name: string, tag: string) {
        return this.amazon.deploy(name, tag);
    }

    public status(name, arn) {
        return this.amazon.isServiceReady(name, arn);
    }

    public getService(name) {
        return this.amazon.getService(name);
    }

    public list() {

    }
}
