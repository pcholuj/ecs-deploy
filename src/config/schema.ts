export const schema = {
    api: {
        version: {
            format: 'integer',
        },
        port: {
            format: 'integer',
        },
    },
    applications: {

    },
    swagger: {
        path: {
            type: 'string',
        },
    },
    users: [],
    aws: {
        region: {
            default: 'us-east-1',
            new: 'AWS_REGION',
        },
    },
    jwt: {
        secret: {
            default: '',
        },
    },
    env: {
        doc: 'The applicaton environment.',
        format: ['production', 'development', 'test'],
        default: 'development',
        env: 'NODE_ENV',
    },
    connection: {
        port: {
            doc: 'Port binding',
            format: 'port',
            default: 3000,
            env: 'PORT',
        },
        host: {
            doc: 'Host binding',
            format: '*',
            default: 'localhost',
            env: 'HOST',
        },
    },
    googleAuth: {
        clientID: {
            doc: 'Google oauth clientID',
            default: '',
            format: '*',
            env: 'GA_CLIENT_ID',
        },
        clientSecret: {
            doc: 'Google oauth client secret',
            default: '',
            format: '*',
            env: 'GA_CLIENT_SECRET',
        },
    },
};