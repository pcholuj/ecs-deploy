import { Config } from '@providers/config';
import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class ApplicationsService {

    constructor(
        @Inject('Config') private readonly config: Config,
    ) {

    }

    findAll() {
        return Promise.resolve(this.config.get('applications'));
    }

}
