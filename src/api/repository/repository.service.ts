import { AmazonEcs } from '@providers/amazon-ecs';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class RepositoryService {

    constructor(
        @Inject('AmazonEcs') private readonly amazon: AmazonEcs,
    ) {

    }

    public getRepositoryList(name: string) {
        return this.amazon.getRepositoryList(name);
    }
}
