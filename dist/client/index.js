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
    async listApiKeys() {
        return this.axiosHandler
            .request('GET', 'api/client/account/api-keys', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async createApiKey(description, ips) {
        const data = { description: description, allowed_ips: ips };
        return this.axiosHandler
            .request('POST', 'api/client/account/api-keys', `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async deleteApiKey(identifier) {
        return this.axiosHandler
            .request('DELETE', `api/client/account/api-keys/${identifier}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async serverDetails(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async resourceUsage(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/resources`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async sendCommand(serverId, command) {
        const data = { command: command };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/command`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async changePowerState(serverId, state) {
        const data = { signal: state };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/power`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async listDatabases(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/databases`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async createDatabase(serverId, newDatabaseName, remote) {
        const data = { database: newDatabaseName, remote: remote };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/databases`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async rotateDatabasePassword(serverId, databaseId) {
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/databases/${databaseId}/rotate-password`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async deleteDatabase(serverId, databaseId) {
        return this.axiosHandler
            .request('DELETE', `api/client/servers/${serverId}/databases/${databaseId}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async listFiles(serverId, dir) {
        const folderDir = utility_1.encode(dir);
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/list?directory=${folderDir}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async getFileContent(serverId, dir, file) {
        const fileDir = utility_1.encode(dir, file);
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/contents?file=${fileDir}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async downloadFile(serverId, dir, file) {
        const fileDir = utility_1.encode(dir, file);
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/download?file=${fileDir}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async renameFile(serverId, root, fileName, newFileName) {
        const data = {
            root: root,
            files: [{ from: fileName, to: newFileName }],
        };
        return this.axiosHandler
            .request('PUT', `api/client/servers/${serverId}/files/rename`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async copyFile(serverId, location) {
        const data = { location: location };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/copy`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async writeFile(serverId, dir, file, rawData) {
        const fileDir = utility_1.encode(dir, file);
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/write?file=${fileDir}`, `${rawData}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async compressFiles(serverId, root, fileName) {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/compress`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async decompressFile(serverId, root, fileName) {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/decompress`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async deleteFile(serverId, root, fileName) {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/delete`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async createFolder(serverId, root, folderName) {
        const data = { root: root, files: folderName };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/create-folder`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async uploadFolder(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/upload`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async listSchedules(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/schedules`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async createSchedules(serverId, name, minute, hour, dayOfWeek, dayOfMonth, active) {
        const data = {
            name: name,
            minute: minute,
            hour: hour,
            day_of_month: dayOfMonth,
            day_of_week: dayOfWeek,
            is_active: active,
        };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/schedules`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async scheduleDetails(serverId, scheduleId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/schedules/${scheduleId}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async updateSchedule(serverId, scheduleId, name, minute, hour, dayOfWeek, dayOfMonth, active) {
        const data = {
            name: name,
            minute: minute,
            hour: hour,
            day_of_month: dayOfMonth,
            day_of_week: dayOfWeek,
            is_active: active,
        };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/schedules/${scheduleId}`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async deleteSchedule(serverId, scheduleId) {
        return this.axiosHandler
            .request('DELETE', `api/client/servers/${serverId}/schedules/${scheduleId}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async createTask(serverId, scheduleId, action, payload, timeOffSet) {
        const data = {
            action: action,
            payload: payload,
            time_offset: timeOffSet,
        };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/schedules/${scheduleId}/tasks`, `${data}`)
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
