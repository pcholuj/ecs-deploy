import { Applications } from 'api/applications/applications.entity';

export interface DeployersVersions {
    name: string;
    tag: string;
    config?: any;
}

export interface DeployersStatus {
    name: string;
    tag: string;
    status: number;
}

export interface AdapterInterface {
    name: string;

    deploy(application: Applications, tag: string, config: any);
    
    status(application: Applications);

    versions(application: Applications);
}