import { Amazon } from 'providers/amazon';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class DeploysService {

    constructor(
        @Inject('Amazon') private readonly amazon: Amazon,
    ) {

    }

    public deploy(name: string, tag: string) {
        // validate name
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
