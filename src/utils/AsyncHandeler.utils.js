import { ApiError } from "./ApiError.utils.js"

const AsyncHandler = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err));
    };
};

export { AsyncHandler };