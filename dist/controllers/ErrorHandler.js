"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ResponseError {
    constructor(message, status, error) {
        this.message = message;
        this.status = status;
        this.stack = this.getStack(error);
    }
    response() {
        return {
            message: this.message,
            status: this.status,
        };
    }
    getStack(error) {
        if (error.stack) {
            return error.stack;
        }
        return 'none';
    }
    get stacktrace() {
        return this.stack;
    }
}
exports.ResponseError = ResponseError;
exports.default = { ResponseError };
//# sourceMappingURL=ErrorHandler.js.map