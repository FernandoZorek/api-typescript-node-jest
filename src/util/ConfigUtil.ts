import LoggerConfigFileOptions from '@type/config/LoggerConfigFileOptions';
import LoggerConfig from '@config/LoggerConfig';
import EnvVariablesUtil from '@util/EnvVariablesUtil';
import ServerConfigFileOptions from '@type/config/ServerConfigFileOptions';
import ServerConfig from '@config/ServerConfig';

/**
 * Utillity for getting config files
 */
class ConfigUtil {
    static getLogConfigs(): LoggerConfigFileOptions {
        return LoggerConfig[EnvVariablesUtil.getNodeEnv()];
    }

    static getServerConfigs(): ServerConfigFileOptions {
        return ServerConfig[EnvVariablesUtil.getNodeEnv()];
    }
}

export default ConfigUtil;
