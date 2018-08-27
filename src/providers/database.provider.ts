import { Config } from './config';

import { createConnection } from 'typeorm';

export const DatabaseProvider = [
    {
        provide: 'DbConnectionToken',
        useFactory: async (config: Config) =>
            await createConnection(
                Object.assign(
                    {
                        entities: [process.cwd() + '/src/api/**/*.entity.ts'],
                    },
                    config.get('db'),
                ),
            ),
        inject: [Config],
    },
];
