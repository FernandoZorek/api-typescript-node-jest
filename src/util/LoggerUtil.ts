import Pino from 'pino';
import ConfigUtil from '@src/util/ConfigUtil';

/**
 * Utillity class for logging
 */
class LoggerUtil {
    /**
     * Logger object.
     */
    static readonly logger = Pino({
        ...ConfigUtil.getLogConfigs(),
    });

    /**
     * Logs a debug message
     * @param msg - The message to be logged.
     */
    static debug(msg: string): void {
        LoggerUtil.logger.debug(msg);
    }

    /**
     * Logs an error message
     * @param msg - The message to be logged.
     */
    static error(msg: string): void {
        LoggerUtil.logger.error(msg);
    }

    /**
     * Logs a fatal message
     * @param msg - The message to be logged.
     */
    static fatal(msg: string): void {
        LoggerUtil.logger.fatal(msg);
    }

    /**
     * Logs an info message
     * @param msg - The message to be logged.
     */
    static info(msg: string): void {
        LoggerUtil.logger.info(msg);
    }

    /**
     * Logs a trace message
     * @param msg - The message to be logged.
     */
    static trace(msg: string): void {
        LoggerUtil.logger.trace(msg);
    }

    /**
     * Logs a warn message
     * @param msg - The message to be logged.
     */
    static warn(msg: string): void {
        LoggerUtil.logger.warn(msg);
    }
}

export default LoggerUtil;
