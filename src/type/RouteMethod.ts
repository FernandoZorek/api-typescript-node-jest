import HttpMethod from '@enum/HttpMethod';

/**
 * This type describe the relationship between a given route path and its expected method in a controller.
 * It's being used in AbstractRouter so as to configure routes.
 */
type RouteMethod<T> = {
    httpMethod: HttpMethod;
    // Expected method name in a controller. (i.e. "findAll" or "create")
    methodName: keyof T;
    // URL path (i.e. "/" or "/:id")
    path: string;
    // Default status code for request
    standardCode: number;
};

export default RouteMethod;
