import ServerConfigFile from '@type/config/ServerConfigFile';
/**
 * Server configs according to each environment.
 */
const ServerConfig: ServerConfigFile = {
    development: {
        port: 3000,
    },
    test: {
        port: 3000,
    },
    production: {
        port: 3000,
    },
};

export default ServerConfig;
