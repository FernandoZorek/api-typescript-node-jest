import './util/setup/ModuleAliasSetup';
import { Server } from 'http';
import ServerInitializer from '@initializer/ServerInitializer';
import ConfigUtil from '@util/ConfigUtil';
import LoggerUtil from '@util/LoggerUtil';
import ExitStatus from '@enum/ExitStatus';

/**
 * Handles unhandledRejection and uncaughtException events.
 */
const _configureUnhandledOperations = () => {
    process.on('unhandledRejection', (reason, promise) => {
        LoggerUtil.fatal(`App exiting due to an unhandled promise: ${String(promise)} and reason: ${String(reason)}`);
        throw reason;
    });
    process.on('uncaughtException', (error) => {
        LoggerUtil.fatal(`App exiting due to an uncaught error: ${String(error)}`);
        process.exit(ExitStatus.FAILURE);
    });
};

/**
 * Configures a gracefull shutdown whenever server crashes.
 * @param server - The server that could crash.
 */
const _configureGracefulShutdown = (server: Server) => {
    const exitSignals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM', 'SIGQUIT'];
    exitSignals.forEach((signal) => {
        process.on(signal, () => {
            LoggerUtil.info(`Event ${signal} was emitted forcing the server to shut down...`);
            // Trying to close server
            server.close((serverError) => {
                // Closing DB connection
                if (serverError) {
                    LoggerUtil.fatal('An unexpected error ocurred while trying to shut down...\n');
                    LoggerUtil.fatal(String(serverError));
                    process.exit(ExitStatus.FAILURE);
                } else {
                    LoggerUtil.info('Server was shut down.');
                    process.exit(ExitStatus.SUCCESS);
                }
            });
        });
    });
};

void (async (): Promise<void> => {
    try {
        LoggerUtil.info('Starting server...');
        _configureUnhandledOperations();
        const { port } = ConfigUtil.getServerConfigs();
        const app = await ServerInitializer.getServer();
        const server = app.listen(port);
        _configureGracefulShutdown(server);
        LoggerUtil.info(`Server is ready and listening on port ${port}.`);
    } catch (error) {
        LoggerUtil.fatal('An unexpected error prevented the server from starting up.');
        LoggerUtil.fatal(String(error));
        LoggerUtil.info('Server was shut down.');
        process.exit(ExitStatus.FAILURE);
    }
})();
