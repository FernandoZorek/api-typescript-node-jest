import { StatusCodes } from 'http-status-codes';

class ServerError extends Error {
    constructor(readonly message: string, readonly statusCode: StatusCodes) {
        super(message);
        this.statusCode = statusCode;
    }
}

export default ServerError;
