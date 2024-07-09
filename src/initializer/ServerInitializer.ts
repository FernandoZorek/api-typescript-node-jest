import Express, { Application, json } from 'express';
import cors from 'cors';
import Helmet from 'helmet';
import Compression from 'compression';
import ExpressPinoLogger from 'express-pino-logger';
import RoutesInitializer from '@initializer/RoutesInitializer';
import StartUpRunnable from '@interface/StartUpRunnable';
import LoggerUtil from '@src/util/LoggerUtil';
import Db from '@src/initializer/DBInitializer';

const env = process.env.NODE_ENV || 'development';

// TODO: Filter
class ServerInitializer {
    static async getServer(): Promise<Application> {
        let server: Application = Express();

        server.use(
            ExpressPinoLogger({
                logger: LoggerUtil.logger,
            })
        );
        server.use(Helmet());
        server.use(json());
        server.use(Compression());

        if (env === 'development') {
            server.use(cors());
        }

        const initializersToRun: StartUpRunnable[] = [new RoutesInitializer()];

        for (const initializer of initializersToRun) {
            server = await initializer.run(server);
        }

        await Db.open();
        return server;
    }
}

export default ServerInitializer;
