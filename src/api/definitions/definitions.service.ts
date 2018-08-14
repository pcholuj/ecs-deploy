import { AmazonEcs } from '@providers/amazon-ecs';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class DefinitionsService {

    constructor(
        @Inject('AmazonEcs') private readonly amazon: AmazonEcs,
    ) {

    }

    public getByName(name: string) {
        return this.amazon.getTaskDefinition(name);
    }
}
