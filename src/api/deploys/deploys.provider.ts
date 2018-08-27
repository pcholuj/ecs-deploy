import { Deploys } from './deploys.entity';
import { Connection } from 'typeorm';

export const DeploysProvider = {
    provide: 'DeploysRepository',
    useFactory: (connection: Connection) =>
        connection.getRepository(Deploys),
    inject: ['DbConnectionToken'],
};
