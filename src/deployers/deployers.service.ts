import { Applications } from 'api/applications/applications.entity';
import { Config } from '@providers/config';
import { AdapterInterface } from './adapter/adapter.interface';
import { Injectable, Inject } from '@nestjs/common';
import * as adapters from './adapter';

@Injectable()
export class DeployersService {

    private adapters: any[] = [];

    constructor(@Inject('Config') private readonly config: Config) {

        for (let a in adapters) {
            if (typeof adapters[a] !== 'function') {
                continue;
            }

            const adapter = new adapters[a](this.config) as AdapterInterface;
            this.adapters[adapter.name] = adapter;
        }
    }

    public deploy(application: Applications, tag: string) {
        return this.getAdapter(application.type).deploy(application, tag);
    }
    
    public status(application: Applications) {
        return this.getAdapter(application.type).status(application);
    }

    public versions(application: Applications,) {
        return this.getAdapter(application.type).versions(application);
    }

    private getAdapter(name: string) {
        if (!this.adapters[name]) {
            throw new Error(`Adapter ${name} not found`);
        }

        return this.adapters[name];
    }
}
