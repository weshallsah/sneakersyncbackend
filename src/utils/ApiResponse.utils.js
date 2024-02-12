
class ApiResponse {

    constructor(
        StatusCode,
        body,
        message = "successful"
    ) {
        this.StatusCode = StatusCode;
        this.body = body;
        this.message = message;
        this.success = StatusCode < 400;
    }
}

export { ApiResponse };