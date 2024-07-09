import LoggerConfigFile from '@type/config/LoggerConfigFile';
/**
 * Logger options according to each environment.
 */
const LoggerConfig: LoggerConfigFile = {
    development: {
        level: 'debug',
        prettyPrint: {
            translateTime: true,
        },
    },
    test: {
        level: 'info',
        prettyPrint: false,
    },
    production: {
        level: 'warn',
        prettyPrint: false,
    },
};

export default LoggerConfig;
