"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encode = exports.formatBytes = exports.processError = void 0;
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
exports.processError = processError;
function formatBytes(bytes, decimals = 2) {
    if (bytes === 0)
        return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
exports.formatBytes = formatBytes;
function encode(dir, file) {
    if (file == undefined) {
        const dirLastChar = dir.charAt(dir.length - 1);
        if (dirLastChar == '/') {
            dir = dir.slice(0, -1);
        }
        const slash = /\//gi;
        const encoded = dir.replace(slash, '%2F');
        return encoded;
    }
    else {
        const dirLastChar = dir.charAt(dir.length - 1);
        if (dirLastChar !== '/') {
            dir = dir + '/';
        }
        const fileDir = dir + file;
        const slash = /\//gi;
        const encoded = fileDir.replace(slash, '%2F');
        return encoded;
    }
}
exports.encode = encode;
