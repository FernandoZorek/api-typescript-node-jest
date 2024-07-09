/**
 * Type definition for each entry of LoggerConfigFile.
 */
type LoggerConfig = {
    level: string;
    prettyPrint:
        | boolean
        | {
              translateTime: boolean;
          };
};

export default LoggerConfig;
