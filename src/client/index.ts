import { processError } from '../utils/utility';
import * as method from './method';

export default class Client {
    hostUrl: string;
    apiKey: string;

    constructor(host: string, key: string) {
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

    enableTwoFactor(code: string) {
        return new Promise((res, rej) => {
            method
                .enableTwoFactor(this.hostUrl, this.apiKey, code)
                .then((response) => {
                    return res(response.data);
                })
                .catch((e) => rej(this.errorType(e)));
        });
    }

    private errorType(e: any) {
        throw processError(e, {
            400: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (400): The request was invalid.',
                );
            },
            401: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (401): The request did not include an authentication token or the authentication token was expired.',
                );
            },
            403: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (403): The request was forbidden as it did not have permission to access the requested resource.',
                );
            },
            404: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (404): The requested resource was not found.',
                );
            },
            409: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (409): The request could not be completed due to a conflict.',
                );
            },
            500: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (500): The request was not completed due to an internal error on the server side.',
                );
            },
            503: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (503): The server was unavailable.',
                );
            },
            '*': () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (*): Unknown error occured.',
                );
            },
            NO_RESPONSE: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (-): The server did not respond.',
                );
            },
        });
    }
}
