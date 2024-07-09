/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response, Router, NextFunction } from 'express';
import RouteMethod from '@type/RouteMethod';
import LoggerUtil from '@util/LoggerUtil';
import JsonApiResponse from '@src/interface/response/json-api/JsonApiResponse';
import AbstractController from '@src/controller/AbstractController';

/**
 * This Route is meant to be extended by all other routes.
 * It'll provide error handling and transactional entity manager
 */
abstract class AbstractRoute<C extends AbstractController, RT> {
    protected abstract allowedRouteMethods: RouteMethod<C>[];
    protected controller: new () => C;
    protected _router: Router;

    constructor(readonly controllerT: new () => C) {
        this.controller = controllerT;
        this._router = express.Router({ mergeParams: true });
    }

    /**
     * Configures router according to allowedRouteMethods.
     */
    setupRoutes(): void {
        this.allowedRouteMethods.forEach(({ httpMethod, methodName, path, standardCode }) => {
            this._router[httpMethod](
                path,
                async (req: Request, res: Response, next: NextFunction): Promise<void> => {
                    try {
                        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                        const controller: C = new this.controller();
                        const methodToBeCalled = Reflect.get(controller, methodName) as (
                            req: Request,
                            res: Response,
                            next: NextFunction
                        ) => RT | Promise<RT> | RT[] | Promise<RT[]>;
                        if (!methodToBeCalled || typeof methodToBeCalled !== 'function') {
                            throw Error('Not implemented!');
                        }
                        const data = await methodToBeCalled(req, res, next);

                        const response: JsonApiResponse<RT | RT[]> = {
                            data,
                        };
                        if (!res.headersSent) {
                            res.status(standardCode).send(response);
                        }
                    } catch (error) {
                        next(error);
                    }
                }
            );
            LoggerUtil.debug(`Created route [${httpMethod.toUpperCase()}] ${path}`);
        });
    }

    get router(): Router {
        return this._router;
    }
}

export default AbstractRoute;
