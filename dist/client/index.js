"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const utility_1 = require("../utils/utility");
const method = __importStar(require("./method"));
class client {
    constructor(host, key) {
        this.hostUrl = host;
        this.apiKey = key;
    }
    listServers() {
        return new Promise((res, rej) => {
            method
                .listServers(this.hostUrl, this.apiKey)
                .then((response) => {
                return res(response.data);
            })
                .catch((e) => rej(this.errorType(e)));
        });
    }
    showPermissions() {
        return new Promise((res, rej) => {
            method
                .showPermissions(this.hostUrl, this.apiKey)
                .then((response) => {
                return res(response.data);
            })
                .catch((e) => rej(this.errorType(e)));
        });
    }
    accountDetails() {
        return new Promise((res, rej) => {
            method
                .accountDetails(this.hostUrl, this.apiKey)
                .then((response) => {
                return res(response.data);
            })
                .catch((e) => rej(this.errorType(e)));
        });
    }
    genarateTwoFactorQR() {
        return new Promise((res, rej) => {
            method
                .genarateTwoFactorQR(this.hostUrl, this.apiKey)
                .then((response) => {
                return res(response.data);
            })
                .catch((e) => rej(this.errorType(e)));
        });
    }
    enableTwoFactor(code) {
        return new Promise((res, rej) => {
            method
                .enableTwoFactor(this.hostUrl, this.apiKey, code)
                .then((response) => {
                return res(response.data);
            })
                .catch((e) => rej(this.errorType(e)));
        });
    }
    errorType(e) {
        throw utility_1.processError(e, {
            400: () => {
                return new Error('PTEROM CLIENT HTTP ERROR (400): The request was invalid.');
            },
            401: () => {
                return new Error('PTEROM CLIENT HTTP ERROR (401): The request did not include an authentication token or the authentication token was expired.');
            },
            403: () => {
                return new Error('PTEROM CLIENT HTTP ERROR (403): The request was forbidden as it did not have permission to access the requested resource.');
            },
            404: () => {
                return new Error('PTEROM CLIENT HTTP ERROR (404): The requested resource was not found.');
            },
            409: () => {
                return new Error('PTEROM CLIENT HTTP ERROR (409): The request could not be completed due to a conflict.');
            },
            500: () => {
                return new Error('PTEROM CLIENT HTTP ERROR (500): The request was not completed due to an internal error on the server side.');
            },
            503: () => {
                return new Error('PTEROM CLIENT HTTP ERROR (503): The server was unavailable.');
            },
            '*': () => {
                return new Error('PTEROM CLIENT HTTP ERROR (*): Unknown error occured.');
            },
            NO_RESPONSE: () => {
                return new Error('PTEROM CLIENT HTTP ERROR (-): The server did not respond.');
            },
        });
    }
}
exports.default = client;
