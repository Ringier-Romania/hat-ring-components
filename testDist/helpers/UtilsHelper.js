"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UtilsHelper_getErrorMessage = void 0;
function UtilsHelper_getErrorMessage(error) {
    if (error instanceof Error) {
        return error.message;
    }
    if (typeof error === 'string') {
        return error;
    }
    if (error && typeof error === 'object' && 'message' in error) {
        return String(error.message);
    }
    return 'Unknown error';
}
exports.UtilsHelper_getErrorMessage = UtilsHelper_getErrorMessage;

