import UserController from '@src/controller/UserController';
import RouteMethod from '@src/type/RouteMethod';
import User from '@src/type/User';
import AbstractRoute from './AbstractRoute';
import HttpMethod from '@enum/HttpMethod';

class UserRoute extends AbstractRoute<UserController, User> {
    protected allowedRouteMethods: RouteMethod<UserController>[] = [
        {
            httpMethod: HttpMethod.POST,
            methodName: 'createUser',
            path: '/user',
            standardCode: 201
        },
        {
            httpMethod: HttpMethod.GET,
            methodName: 'getUsers',
            path: '/user',
            standardCode: 200
        },
        {
            httpMethod: HttpMethod.GET,
            methodName: 'getUser',
            path: '/user/:id',
            standardCode: 200
        },
        {
            httpMethod: HttpMethod.PATCH,
            methodName: 'updateUserStatus',
            path: '/user/:id',
            standardCode: 200
        }
    ];

    constructor() {
        super(UserController);
    }
}

export default UserRoute;
