import JsonApiError from './JsonApiError';

/**
 * Custom Type for HTTP Error responses.
 */
interface JsonApiErrorResponse {
    errors: JsonApiError[];
}

export default JsonApiErrorResponse;
