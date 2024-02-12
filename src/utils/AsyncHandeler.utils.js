import { ApiError } from "./ApiError.utils.js"

const AsyncHandeller = (reqHandler) => {
    return (req, res, next) => {
        Promise.resolve(reqHandler(req, res, next)).catch((err) => next(err));
    };
};

export { AsyncHandeller };