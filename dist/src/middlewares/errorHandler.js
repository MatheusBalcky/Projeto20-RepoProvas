"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const ERRORS = {
    unauthorized: 401,
    conflict: 409,
    not_found: 404,
    bad_request: 400
};
async function errorHandler(error, req, res, next) {
    let statusCode = ERRORS[error.type];
    if (!statusCode) {
        console.log(error);
        statusCode = 500;
        return res.sendStatus(statusCode); // internal server error
    }
    return res.status(statusCode).send(error.message);
}
exports.errorHandler = errorHandler;
