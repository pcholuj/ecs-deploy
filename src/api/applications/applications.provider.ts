import { Applications } from './applications.entity';
import { Connection } from 'typeorm';

export const ApplicationProvider = {
    provide: 'ApplicationsRepository',
    useFactory: (connection: Connection) =>
        connection.getRepository(Applications),
    inject: ['DbConnectionToken'],
};
