"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axiosHandler_1 = __importDefault(require("../utils/axiosHandler"));
const errorHandler_1 = require("../utils/errorHandler");
class Client {
    constructor(host, key) {
        this.axiosHandler = new axiosHandler_1.default(host, key);
    }
    /**
     * Lists all servers
     *
     * @param {boolean | undefined} [eggInfo=false] Includes infomation about the egg the servers use.
     * @param {boolean | undefined} [subusers=false] Includes a list of subusers on the servers.
     *
     * @returns {Promise<object>} Returns a object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .listServers()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async listServers(eggInfo, subusers) {
        return this.axiosHandler
            .request('GET', 'api/client' + (eggInfo || subusers)
            ? `?include=${eggInfo ? 'egg' : ''}${eggInfo && subusers ? ',' : ''}${subusers ? 'subusers' : ''}`
            : '')
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Retries all available permissions
     *
     * @returns {Promise<object>} Returns a object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .showPermissions()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async showPermissions() {
        return this.axiosHandler
            .request('GET', 'api/client/permissions')
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Retrieves information about the account
     *
     * @returns {Promise<object>} Returns a object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .accountDetails()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async accountDetails() {
        return this.axiosHandler
            .request('GET', 'api/client/account')
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Generates a TOTP QR code image to allow the setup of 2FA
     *
     * @returns {Promise<object>} Returns a object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .genarateTwoFactorQR()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async genarateTwoFactorQR() {
        return this.axiosHandler
            .request('GET', 'api/client/account/two-factor')
            .then((res) => res.data.image_url_data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Enables TOTP 2FA
     *
     * @param {string} code Use code from genarateTwoFactorQR().
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .enableTwoFactor('CODE_FROM_genarateTwoFactorQR()')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async enableTwoFactor(code) {
        const data = { code: code };
        return this.axiosHandler
            .request('POST', 'api/client/account/two-factor', data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Disables TOTP 2FA on the account
     *
     * @param {string} password Password of the users account.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .disableTwoFactor('ACCOUNT_PASSWORD')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    async disableTwoFactor(password) {
        const data = { password: password };
        return this.axiosHandler
            .request('DELETE', 'api/client/account/two-factor', data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Updates the email address of the account
     *
     * @param {string} newEmail New email that you wish to update the account with.
     * @param {string} password Password of the users account.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .updateEmail('ACCOUNT_NEW_EMAIL', 'ACCOUNT_PASSWORD')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    async updateEmail(newEmail, password) {
        const data = { email: newEmail, password: password };
        return this.axiosHandler
            .request('PUT', 'api/client/account/email', data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Updates the password of the account
     *
     * @param {string} currentPassword Current password of the users account.
     * @param {string} newPassword New password that you wish to change to.
     * @param {string} confirmNewPassword Confirm new password to insure it is correct.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .updatePassword('ACCOUNT_CURRENT_PASSWORD', 'ACCOUNT_NEW_PASSWORD', 'CONFIRM_ACCOUNT_NEW_PASSWORD')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    async updatePassword(currentPassword, newPassword, confirmNewPassword) {
        const data = {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmNewPassword,
        };
        return this.axiosHandler
            .request('PUT', 'api/client/account/password', data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Retrieves a list of API keys
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .listApiKeys()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async listApiKeys() {
        return this.axiosHandler
            .request('GET', 'api/client/account/api-keys')
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Generates a new API key
     *
     * @param {string} description Description of the new API key.
     * @param {Array<string>} ips Leave blank to allow any IP address to use this API key, otherwise provide each IP address.
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .createApiKey('API_KEY_DESCRIPTION', [API_KEY_IPS])
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async createApiKey(description, ips) {
        const data = { description: description, allowed_ips: ips };
        return this.axiosHandler
            .request('POST', 'api/client/account/api-keys', data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Deletes the specified API key
     *
     * @param {string} identifier The identifier of the API key. If you do not know the identifier you can find it via listApiKeys().
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .deleteApiKey('API_KEY_IDENTIFIER')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    async deleteApiKey(identifier) {
        return this.axiosHandler
            .request('DELETE', `api/client/account/api-keys/${identifier}`)
            .catch(errorHandler_1.errorType);
    }
    /*
        Websocket when implimented will go here. This is not a piority as it is not needed as much
    */
    /**
     * Retrieves resource utilization of the specified server
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .resourceUsage('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async resourceUsage(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/resources`)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Sends a command to the server
     *
     * The server must be online to send a command to it. You will get HTTP 502 is the server if not online.
     *
     * @param {string} serverId The id of the server.
     * @param {string} command The command to wish to send.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .sendCommand('SERVER_ID', 'COMMAND')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    async sendCommand(serverId, command) {
        const data = { command: command };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/command`, data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Sends a power signal to the server
     *
     * @param {string} serverId The id of the server.
     * @param {'start' | 'stop' | 'restart' | 'kill'} state The power state you wish to set on the server.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .changePowerState('SERVER_ID', 'STATE')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    async changePowerState(serverId, state) {
        const data = { signal: state };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/power`, data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Lists all databases on a server
     *
     * @param {string} serverId The id of the server.
     * @param {boolean} [includePassword=false] Includes the database user password.
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .listDatabases('SERVER_ID', 'INCLUDE_PASSWORD')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async listDatabases(serverId, includePassword) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/databases` + includePassword
            ? '?include=password'
            : '')
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Creates a new database
     *
     * @param {string} serverId The id of the server.
     * @param {string} newDatabaseName Name of the new database.
     * @param {string} remote -----
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .createDatabase('SERVER_ID', 'NEW_DATABASE_NAME', 'REMOTE')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async createDatabase(serverId, newDatabaseName, remote) {
        const data = { database: newDatabaseName, remote: remote };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/databases`, data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Changes the password of a specified database
     *
     * @param {string} serverId The id of the server.
     * @param {string} databaseId The id of the database.
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .rotateDatabasePassword('SERVER_ID', 'DATABASE_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async rotateDatabasePassword(serverId, databaseId) {
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/databases/${databaseId}/rotate-password`)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Deletes the specified database
     *
     * @param {string} serverId The id of the server.
     * @param {string} databaseId The id of the database.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .deleteDatabase('SERVER_ID', 'DATABASE_ID')
     * .then(() => console.log('done');
     * .catch((e) => console.log(e));
     */
    async deleteDatabase(serverId, databaseId) {
        return this.axiosHandler
            .request('DELETE', `api/client/servers/${serverId}/databases/${databaseId}`)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Lists all files within a folder
     *
     * @param {string} serverId The id of the server.
     * @param {string} dir The dir of the folder.
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .listFiles('SERVER_ID', 'DIR')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async listFiles(serverId, dir) {
        const folderDir = encodeURIComponent(dir);
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/list?directory=${folderDir}`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Displays the contents of the specified file
     *
     * @param {string} serverId The id of the server.
     * @param {string} dir The dir of the file.
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .getFileContent('SERVER_ID', 'DIR')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async getFileContent(serverId, dir) {
        const fileDir = encodeURIComponent(dir);
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/contents?file=${fileDir}`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Generates a one-time link to download the specified file
     *
     * @param {string} serverId The id of the server.
     * @param {string} dir The dir of the file.
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .downloadFile('SERVER_ID', 'DIR')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    async downloadFile(serverId, dir) {
        const fileDir = encodeURIComponent(dir);
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/download?file=${fileDir}`)
            .then((res) => res.data.attributes.url)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Renames the specified file
     *
     * @param {string} serverId ------
     * @param {string} root ------
     * @param {string} fileName ------
     * @param {string} newFileName ------
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .renameFile('SERVER_ID', 'ROOT', 'FILE_NAME', 'NEW_FILE_NAME')
     * .then(() => console.log('done')
     * .catch((e) => console.log(e));
     */
    async renameFile(serverId, root, fileName, newFileName) {
        const data = {
            root: root,
            files: [{ from: fileName, to: newFileName }],
        };
        return this.axiosHandler
            .request('PUT', `api/client/servers/${serverId}/files/rename`, data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Copies the specified file
     *
     * @param {string} serverId ------
     * @param {string} location ------
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .copyFile('SERVER_ID', 'LOCATION')
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    async copyFile(serverId, location) {
        const data = { location: location };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/copy`, data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Writes data to the specified file
     *
     * @param {string} serverId ------
     * @param {string} dir ------
     * @param {string} rawData ------
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .writeFile('SERVER_ID', 'DIR', 'RAW_DATA')
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    async writeFile(serverId, dir, rawData) {
        const fileDir = encodeURIComponent(dir);
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/write?file=${fileDir}`, rawData)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Compresses the specified file
     *
     * @param {string} serverId ------
     * @param {string} root ------
     * @param {Array<string>} fileName ------
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .compressFiles('SERVER_ID', 'ROOT', [FILE_NAME])
     * .then(() => console.log(res))
     * .catch((e) => console.log(e));
     */
    async compressFiles(serverId, root, fileName) {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/compress`, data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Decompresses the selected file
     *
     * @param {string} serverId ------
     * @param {string} root ------
     * @param {string} fileName ------
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .decompressFile('SERVER_ID', 'ROOT', 'FILE_NAME')
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    async decompressFile(serverId, root, fileName) {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/decompress`, data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Deletes the specified file(s)
     *
     * @param {string} serverId ------
     * @param {string} root ------
     * @param {Array<string>} fileName ------
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .deleteFile('SERVER_ID', 'ROOT', [FILE_NAME])
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    async deleteFile(serverId, root, fileName) {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/delete`, data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Creates the specified folder in the specified directory
     */
    async createFolder(serverId, root, folderName) {
        const data = { root: root, files: folderName };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/create-folder`, data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Returns a signed URL used to upload files to the server using POST request
     *
     * POST request to upload folder is not handled via this library
     */
    async uploadFolder(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/upload`)
            .then((res) => res.data.attributes.url)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Lists all schedules added to the server
     */
    async listSchedules(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/schedules`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Creates a new schedule
     */
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
            .request('POST', `api/client/servers/${serverId}/schedules`, data)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Retrieves specific schedule
     */
    async scheduleDetails(serverId, scheduleId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/schedules/${scheduleId}`)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Updates the specified schedule
     */
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
            .request('POST', `api/client/servers/${serverId}/schedules/${scheduleId}`, data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Deletes the specified schedule
     */
    async deleteSchedule(serverId, scheduleId) {
        return this.axiosHandler
            .request('DELETE', `api/client/servers/${serverId}/schedules/${scheduleId}`)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Creates a new task on the specified schedule
     */
    async createTask(serverId, scheduleId, action, payload, timeOffSet) {
        const data = {
            action: action,
            payload: payload,
            time_offset: timeOffSet,
        };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/schedules/${scheduleId}/tasks`, data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Updates the specified task
     */
    async updateTask(serverId, taskId, scheduleId, action, payload, timeOffSet) {
        const data = {
            action: action,
            payload: payload,
            time_offset: timeOffSet,
        };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`, data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Deletes the specified task
     */
    async deleteTask(serverId, scheduleId, taskId) {
        return this.axiosHandler
            .request('DELETE', `api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Retrieves the network information for the specified server
     */
    async listAllocations(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/network/allocations`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Automatically assigns a new allocation if auto-assign is enabled on the instance
     */
    async assignAllocation(serverId) {
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/network/allocations`)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Sets a note for the allocation
     */
    async setAllocationNote(serverId, allocationId, notes) {
        const data = { notes: notes };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/network/allocations/${allocationId}`, data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Sets the primary allocation
     */
    async setPrimaryAllocation(serverId, allocationId) {
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/network/allocations/${allocationId}/primary`)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Deletes the specified non-primary allocation
     */
    async unassignAllocation(serverId, allocationId) {
        return this.axiosHandler
            .request('DELETE', `api/client/servers/${serverId}/network/allocations/${allocationId}`)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Lists all users added to the server, along with details about them and their permissions
     */
    async listUsers(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/users`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Adds a user to the server
     */
    async createUser(serverId, email, permissions) {
        const data = {
            email: email,
            permissions: permissions,
        };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/users`, data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Retrieves information about a specific user
     */
    async userDetails(serverId, userId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/users/${userId}`)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Updates the specified user
     */
    async updateUser(serverId, userId, permissions) {
        const data = { permissions: permissions };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/users/${userId}`, data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Removes the specified user from the server
     */
    async deleteUser(serverId, userId) {
        return this.axiosHandler
            .request('DELETE', `api/client/servers/${serverId}/users/${userId}`)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Retrieves a list of backups
     */
    async listBackups(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/backups`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Creates a new backup
     */
    async createBackup(serverId) {
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/backups`)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Retrieves information about the specified backup
     */
    async backupDetails(serverId, backupId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/backups/${backupId}`)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Generates a download link for a backup
     */
    async downloadBackup(serverId, backupId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/backups/${backupId}/download`)
            .then((res) => res.data.attributes.url)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Deletes the specified backup
     */
    async deleteBackup(serverId, backupId) {
        return this.axiosHandler
            .request('DELETE', `api/client/servers/${serverId}/backups/${backupId}`)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Lists all variables on the server
     */
    async listVariables(serverId) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/startup`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Updates the specified variable
     */
    async updateVariable(serverId, key, value) {
        const data = { key: key, value: value };
        return this.axiosHandler
            .request('PUT', `api/client/servers/${serverId}/startup/variable`, data)
            .then((res) => res.data.attributes)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Renames the specified server
     */
    async renameServer(serverId, name) {
        const data = { name: name };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/settings/rename`, data)
            .catch(errorHandler_1.errorType);
    }
    /**
     * Reinstall the specified server
     */
    async reinstallServer(serverId) {
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/reinstall`)
            .catch(errorHandler_1.errorType);
    }
}
exports.default = Client;
