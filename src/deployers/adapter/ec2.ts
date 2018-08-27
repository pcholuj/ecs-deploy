import { Config } from '@providers/config';
import { AdapterInterface } from "./adapter.interface";
import { Applications } from 'api/applications/applications.entity';

export class Ec2 implements AdapterInterface {
    public readonly name = 'ec2';

    constructor(private readonly config: Config) {

    }

    public deploy(app: Applications, tag: string, config: any) {}
    
    public status(app: Applications, tag: string) {}

    public versions(app: Applications) {}
}