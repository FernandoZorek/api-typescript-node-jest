import { Application, Router, Request, Response, NextFunction } from 'express';
import Runnable from '@interface/StartUpRunnable';
import path from 'path';
import LoggerUtil from '@util/LoggerUtil';
import ServerError from '@error/ServerError';
import ResponseUtil from '@util/ResponseUtil';
import { StatusCodes } from 'http-status-codes';
import SwaggerUI from 'swagger-ui-express';
import YamlJS from 'yamljs';
import AbstractRoute from '@src/route/AbstractRoute';
import { lstatSync, readdirSync } from 'fs';

class RoutesInitializer implements Runnable {
    async run(server: Application): Promise<Application> {
        LoggerUtil.debug('Initializing Routing configuration...');

        // Adding routes to express.
        this._configurePublicRoutes(server);
        await this._configurePrivateRoutes(server);

        // Error handling
        server.use(
            // Next parameter will not be used, however express requires the definition otherwise the error handling will not work.
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            (err: Error, _1: Request, res: Response, _2: NextFunction) => {
                let statusCode: StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR;
                let response;
                const { name, message, stack } = err;
                if (err instanceof ServerError) {
                    statusCode = err.statusCode;
                    LoggerUtil.error('Error raised inside Server code');
                    response = ResponseUtil.createErrorResponse(err);
                } else {
                    LoggerUtil.error('Unknown Error raised inside Server code');
                    response = ResponseUtil.createErrorResponse({
                        statusCode,
                        name,
                        message,
                    });
                }
                LoggerUtil.error(`Error Code: ${statusCode}`);
                LoggerUtil.error(`Error Name: ${name}`);
                LoggerUtil.error(`Error Message: ${message}`);
                if (stack) {
                    LoggerUtil.error(`Error Stack\n
                    "************************* START STACK *************************\n
                    ${stack}\n
                    *************************   END STACK  *************************
                    `);
                }
                res.status(statusCode).json(response);
            }
        );

        // Configuring 404 responses
        LoggerUtil.debug('Configuring default 404 response.');
        server.use(function (req: Request, res: Response) {
            res.status(StatusCodes.NOT_FOUND).send([
                ResponseUtil.createErrorResponse({
                    statusCode: StatusCodes.NOT_FOUND,
                    name: 'Not Found',
                    message: `Could not find endpoint: ${req.url}`,
                }),
            ]);
        });

        LoggerUtil.debug('Routing initialization was completed.');
        return server;
    }

    /**
     * Configures all public routes of the application.
     * @param server - Express Server
     */
    _configurePublicRoutes(server: Application): void {
        const publicRouter = Router();
        // Setting up Swagger
        publicRouter.use('/docs', SwaggerUI.serve);
        publicRouter.get('/docs', SwaggerUI.setup(YamlJS.load(`${path.resolve(__dirname, '../../')}/swagger.yaml`)));
        LoggerUtil.debug('Swagger route was created on /public/docs');
        server.use('/public', publicRouter);
    }

    /**
     * Configures all private routes of the application.
     * @param server - Express Server
     */
    async _configurePrivateRoutes(server: Application): Promise<void> {
        const privateRouter = Router();
        const routesFolder = path.resolve(__dirname, '../route');
        for (const fileName of readdirSync(routesFolder)) {
            const originalFileName = fileName;

            // Removing .ts suffix
            const fileWithoutSuffix = fileName.split('.')[0];

            // Ignore AbstractRoute
            const ignoredRoutes = ['AbstractRoute'];
            if (ignoredRoutes.includes(fileWithoutSuffix)) {
                LoggerUtil.debug(`Skipping ${fileWithoutSuffix}`);
                continue;
            }

            LoggerUtil.debug(`Creating routing for ${fileWithoutSuffix}`);

            const routeFile = `${routesFolder}/${originalFileName}`;

            // Ignore Directories
            if (lstatSync(routeFile).isDirectory()) {
                continue;
            }

            // Can not predict import.
            /* eslint-disable */
            const routeToBeCreated = new (await import(routeFile)).default();
            /* eslint-enable */

            if (routeToBeCreated instanceof AbstractRoute) {

                privateRouter.use(`/`, routeToBeCreated.router);
                routeToBeCreated.setupRoutes();
                LoggerUtil.debug(`${fileWithoutSuffix} route created.`);
                continue;

            } else {
                LoggerUtil.warn(`Skipping ${fileWithoutSuffix}. It's not an instance of AbstractRoute.`);
            }
        }
        server.use('/api', privateRouter);
    }
}

export default RoutesInitializer;