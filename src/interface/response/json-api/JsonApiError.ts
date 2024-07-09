import { StatusCodes } from 'http-status-codes';

/**
 * Json Api error definition.
 */
interface JsonApiError {
    status: StatusCodes;
    title: string;
    detail: string;
    field?: string;
    error_code?: string;
}

export default JsonApiError;
