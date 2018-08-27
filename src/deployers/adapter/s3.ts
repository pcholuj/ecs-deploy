import { Config } from '@providers/config';
import { AdapterInterface } from './adapter.interface';
import { Applications } from 'api/applications/applications.entity';

export class S3 implements AdapterInterface{
    public readonly name = 's3';

    constructor(private readonly config: Config) {

    }
    
    public deploy(app: Applications, tag: string, config: any) {}
    
    public status(app: Applications, tag: string) {}

    public versions(app: Applications) {}
}