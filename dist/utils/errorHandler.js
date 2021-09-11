"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorType = void 0;
function processError(e, callbacks) {
    if (e.isAxiosError) {
        const catchAllHandler = callbacks['*'];
        const axiosError = e;
        if (axiosError.response) {
            const status = axiosError.response.status;
            const errorCallback = callbacks[status];
            if (errorCallback) {
                return errorCallback(status);
            }
            else if (catchAllHandler) {
                return catchAllHandler(status);
            }
            else {
                return e;
            }
        }
        else {
            if (callbacks.NO_RESPONSE) {
                return callbacks.NO_RESPONSE('NO_RESPONSE');
            }
            else if (catchAllHandler) {
                return catchAllHandler('NO_RESPONSE');
            }
            else {
                return e;
            }
        }
    }
    else {
        return e;
    }
}
function errorType(e) {
    throw processError(e, {
        400: () => {
            return new Error('PTEROM HTTP ERROR (400): INVALID REQUEST');
        },
        401: () => {
            return new Error('PTEROM HTTP ERROR (401): INVALID AUTHENTICATION');
        },
        403: () => {
            return new Error('PTEROM HTTP ERROR (403): FORBIDDEN REQUEST');
        },
        404: () => {
            return new Error('PTEROM HTTP (404): RESOURCE NOT FOUND');
        },
        409: () => {
            return new Error('PTEROM HTTP ERROR (409): CONFLICTED REQUEST');
        },
        500: () => {
            return new Error('PTEROM HTTP ERROR (500): SERVER SIDE INTERNAL ERROR');
        },
        502: () => {
            return new Error('PTEROM HTTP ERROR (502): SERVER OFFLINE | BAD GATEWAY');
        },
        503: () => {
            return new Error('PTEROM HTTP ERROR (503): SERVER UNAVAILABLE');
        },
        '*': () => {
            return new Error('PTEROM HTTP ERROR (*): UNKNOWN ERROR OCCURED');
        },
        NO_RESPONSE: () => {
            return new Error('PTEROM HTTP ERROR (-): NO RESPONSE FROM SERVER');
        },
    });
}
exports.errorType = errorType;
