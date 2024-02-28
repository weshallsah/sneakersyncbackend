
class ApiError extends Error{

    constructor(
        statuscode,
        message = "something went wrong",
        error,
        stack,
    ) {
        // console.log(statuscode);
        super(message);
        this.statuscode = statuscode;
        this.data = null;
        this.message = message;
        this.succes = false;
        this.error = error;
        if (stack) {
            this.stack = stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { ApiError };