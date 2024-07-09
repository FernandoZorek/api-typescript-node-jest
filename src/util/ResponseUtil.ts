import RequestError from '@error/ServerError';
import JsonApiErrorResponse from '@src/interface/response/json-api/JsonApiErrorResponse';
import JsonApiError from '@src/interface/response/json-api/JsonApiError';

/**
 * Utillity class for creating responses.
 */
class ResponseUtil {
    /**
     * Creates an error response
     * @param error - Error object for creating response.
     */
    static createErrorResponse(error: RequestError | RequestError[]): JsonApiErrorResponse {
        if (Array.isArray(error)) {
            return { errors: error.map((e) => ResponseUtil.createErrorObject(e)) };
        }
        return { errors: [ResponseUtil.createErrorObject(error)] };
    }

    /**
     * Creates a default error response
     * @param error - Error object for creating response.
     */
    private static createErrorObject(error: RequestError): JsonApiError {
        const { message, name, statusCode } = error;
        const errorResponse: JsonApiError = {
            status: statusCode,
            title: name,
            detail: message,
        };
        return errorResponse;
    }
}

export default ResponseUtil;
