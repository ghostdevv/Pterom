"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axiosRequest_1 = __importDefault(require("../utils/axiosRequest"));
const utility_1 = require("../utils/utility");
class Client {
    constructor(host, key) {
        this.host = host;
        this.Key = key;
        this.axiosHandler = new axiosRequest_1.default(host, key);
    }
    async listServers() {
        return this.axiosHandler
            .request('GET', 'api/client', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async showPermissions() {
        return this.axiosHandler
            .request('GET', 'api/client/permissions', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async accountDetails() {
        return this.axiosHandler
            .request('GET', 'api/client/account', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async genarateTwoFactorQR() {
        return this.axiosHandler
            .request('GET', 'api/client/account/two-factor', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async enableTwoFactor(code) {
        const data = { code: code };
        return this.axiosHandler
            .request('POST', 'api/client/account/two-factor', `${data}`)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }
    async disableTwoFactor(password) {
        const data = { password: password };
        return this.axiosHandler
            .request('DELETE', 'api/client/account/two-factor', `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async updateEmail(newEmail, password) {
        const data = { email: newEmail, password: password };
        return this.axiosHandler
            .request('PUT', 'api/client/account/email', `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async updatePassword(currentPassword, newPassword, confirmNewPassword) {
        const data = {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmNewPassword,
        };
        return this.axiosHandler
            .request('PUT', 'api/client/account/password', `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
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
exports.default = Client;
