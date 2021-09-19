/*    
    Copyright (C) 2021  Code-sorcerers <https://github.com/Code-Sorcerers>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import { AxiosResponse } from 'axios';
import AxiosHandler from '../utils/axiosHandler';
import { errorType } from '../utils/errorHandler';

export default class Client {
    private axiosHandler: AxiosHandler;

    constructor(host: string, key: string) {
        this.axiosHandler = new AxiosHandler(host, key);
    }

    /**
     * Lists all servers
     *
     * @param {boolean | undefined} [eggInfo=false] Includes infomation about the egg the servers use.
     * @param {boolean | undefined} [subusers=false] Includes a list of subusers on the servers.
     *
     * @returns {Promise<object>} Returns an object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listServers()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async listServers(
        eggInfo?: boolean,
        subusers?: boolean,
    ): Promise<object> {
        return this.axiosHandler
            .request(
                'GET',
                'api/client' + (eggInfo || subusers)
                    ? `?include=${eggInfo ? 'egg' : ''}${
                          eggInfo && subusers ? ',' : ''
                      }${subusers ? 'subusers' : ''}`
                    : '',
            )
            .then((res) => res.data)
            .catch(errorType);
    }

    /**
     * Retries all available permissions
     *
     * @returns {Promise<object>} Returns an object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .showPermissions()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */

    public async showPermissions(): Promise<object> {
        return this.axiosHandler
            .request('GET', 'api/client/permissions')
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Retrieves information about the account
     *
     * @returns {Promise<object>} Returns an object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .accountDetails()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async accountDetails(): Promise<object> {
        return this.axiosHandler
            .request('GET', 'api/client/account')
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Generates a TOTP QR code image to allow the setup of 2FA
     *
     * @returns {Promise<object>} Returns an object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .genarateTwoFactorQR()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async genarateTwoFactorQR(): Promise<object> {
        return this.axiosHandler
            .request('GET', 'api/client/account/two-factor')
            .then((res) => res.data.image_url_data)
            .catch(errorType);
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
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .enableTwoFactor('CODE_FROM_genarateTwoFactorQR()')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async enableTwoFactor(code: string): Promise<object> {
        const data = { code: code };
        return this.axiosHandler
            .request('POST', 'api/client/account/two-factor', data)
            .then((res) => res.data.attributes)
            .catch(errorType);
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
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .disableTwoFactor('ACCOUNT_PASSWORD')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async disableTwoFactor(
        password: string,
    ): Promise<AxiosResponse | void> {
        const data = { password: password };
        return this.axiosHandler
            .request('DELETE', 'api/client/account/two-factor', data)
            .catch(errorType);
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
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .updateEmail('ACCOUNT_NEW_EMAIL', 'ACCOUNT_PASSWORD')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async updateEmail(
        newEmail: string,
        password: string,
    ): Promise<AxiosResponse | void> {
        const data = { email: newEmail, password: password };
        return this.axiosHandler
            .request('PUT', 'api/client/account/email', data)
            .catch(errorType);
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
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .updatePassword('ACCOUNT_CURRENT_PASSWORD', 'ACCOUNT_NEW_PASSWORD', 'CONFIRM_ACCOUNT_NEW_PASSWORD')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async updatePassword(
        currentPassword: string,
        newPassword: string,
        confirmNewPassword: string,
    ): Promise<AxiosResponse | void> {
        const data = {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmNewPassword,
        };
        return this.axiosHandler
            .request('PUT', 'api/client/account/password', data)
            .catch(errorType);
    }

    /**
     * Retrieves a list of API keys
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listApiKeys()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async listApiKeys(): Promise<object> {
        return this.axiosHandler
            .request('GET', 'api/client/account/api-keys')
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Generates a new API key
     *
     * @param {string} description Description of the new API key.
     * @param {Array<string>} ips Leave blank to allow any IP address to use this API key, otherwise provide each IP address.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .createApiKey('API_KEY_DESCRIPTION', [API_KEY_IPS])
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async createApiKey(
        description: string,
        ips?: Array<string>,
    ): Promise<object> {
        const data = { description: description, allowed_ips: ips };
        return this.axiosHandler
            .request('POST', 'api/client/account/api-keys', data)
            .then((res) => res.data.attributes)
            .catch(errorType);
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
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .deleteApiKey('API_KEY_IDENTIFIER')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async deleteApiKey(
        identifier: string,
    ): Promise<AxiosResponse | void> {
        return this.axiosHandler
            .request('DELETE', `api/client/account/api-keys/${identifier}`)
            .catch(errorType);
    }
    /*
        Websocket when implimented will go here. This is not a piority as it is not needed as much
    */
    /**
     * Retrieves resource utilization of the specified server
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .resourceUsage('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async resourceUsage(serverId: string): Promise<object> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/resources`)
            .then((res) => res.data.attributes)
            .catch(errorType);
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
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .sendCommand('SERVER_ID', 'COMMAND')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async sendCommand(
        serverId: string,
        command: string,
    ): Promise<AxiosResponse | void> {
        const data = { command: command };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/command`, data)
            .catch(errorType);
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
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .changePowerState('SERVER_ID', 'STATE')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async changePowerState(
        serverId: string,
        state: 'start' | 'stop' | 'restart' | 'kill',
    ): Promise<AxiosResponse | void> {
        const data = { signal: state };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/power`, data)
            .catch(errorType);
    }

    /**
     * Lists all databases on a server
     *
     * @param {string} serverId The id of the server.
     * @param {boolean} [includePassword=false] Includes the database user password.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listDatabases('SERVER_ID', 'INCLUDE_PASSWORD')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async listDatabases(
        serverId: string,
        includePassword?: boolean,
    ): Promise<object> {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/databases` + includePassword
                    ? '?include=password'
                    : '',
            )
            .then((res) => res.data)
            .catch(errorType);
    }

    /**
     * Creates a new database
     *
     * @param {string} serverId The id of the server.
     * @param {string} newDatabaseName Name of the new database.
     * @param {string} remote
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .createDatabase('SERVER_ID', 'NEW_DATABASE_NAME', 'REMOTE')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async createDatabase(
        serverId: string,
        newDatabaseName: string,
        remote: string,
    ): Promise<object> {
        const data = { database: newDatabaseName, remote: remote };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/databases`, data)
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Changes the password of a specified database
     *
     * @param {string} serverId The id of the server.
     * @param {string} databaseId The id of the database.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .rotateDatabasePassword('SERVER_ID', 'DATABASE_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async rotateDatabasePassword(
        serverId: string,
        databaseId: string,
    ): Promise<object> {
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/databases/${databaseId}/rotate-password`,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
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
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .deleteDatabase('SERVER_ID', 'DATABASE_ID')
     * .then(() => console.log('done');
     * .catch((e) => console.log(e));
     */
    public async deleteDatabase(
        serverId: string,
        databaseId: string,
    ): Promise<AxiosResponse | void> {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/databases/${databaseId}`,
            )
            .catch(errorType);
    }

    /**
     * Lists all files within a folder
     *
     * @param {string} serverId The id of the server.
     * @param {string} dir The dir of the folder.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listFiles('SERVER_ID', 'DIR')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async listFiles(serverId: string, dir: string): Promise<object> {
        const folderDir = encodeURIComponent(dir);
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/files/list?directory=${folderDir}`,
            )
            .then((res) => res.data)
            .catch(errorType);
    }

    /**
     * Displays the contents of the specified file
     *
     * @param {string} serverId The id of the server.
     * @param {string} dir The dir of the file.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .getFileContent('SERVER_ID', 'DIR')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async getFileContent(
        serverId: string,
        dir: string,
    ): Promise<object> {
        const fileDir = encodeURIComponent(dir);
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/files/contents?file=${fileDir}`,
            )
            .then((res) => res.data)
            .catch(errorType);
    }

    /**
     * Generates a one-time link to download the specified file
     *
     * @param {string} serverId The id of the server.
     * @param {string} dir The dir of the file.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .downloadFile('SERVER_ID', 'DIR')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async downloadFile(serverId: string, dir: string): Promise<object> {
        const fileDir = encodeURIComponent(dir);
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/files/download?file=${fileDir}`,
            )
            .then((res) => res.data.attributes.url)
            .catch(errorType);
    }

    /**
     * Renames the specified file
     *
     * @param {string} serverId The id of the server.
     * @param {string} root The folder the file is in.
     * @param {string} fileName Current file name.
     * @param {string} newFileName New file name.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .renameFile('SERVER_ID', 'ROOT', 'FILE_NAME', 'NEW_FILE_NAME')
     * .then(() => console.log('done')
     * .catch((e) => console.log(e));
     */
    public async renameFile(
        serverId: string,
        root: string,
        fileName: string,
        newFileName: string,
    ): Promise<AxiosResponse | void> {
        const data = {
            root: root,
            files: [{ from: fileName, to: newFileName }],
        };
        return this.axiosHandler
            .request('PUT', `api/client/servers/${serverId}/files/rename`, data)
            .catch(errorType);
    }

    /**
     * Copies the specified file
     *
     * @param {string} serverId The id of the server.
     * @param {string} location Path to file.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .copyFile('SERVER_ID', 'LOCATION')
     * .then(() => console.log('done')
     * .catch((e) => console.log(e));
     */
    public async copyFile(
        serverId: string,
        location: string,
    ): Promise<AxiosResponse | void> {
        const data = { location: location };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/files/copy`, data)
            .catch(errorType);
    }

    /**
     * Writes data to the specified file
     *
     * @param {string} serverId The id of the server.
     * @param {string} dir Dir of file plus file name.
     * @param {string} rawData The raw data you wish to write to the file.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .writeFile('SERVER_ID', 'DIR', 'RAW_DATA')
     * .then(() => return console.log('done')
     * .catch((e) => console.log(e));
     */
    public async writeFile(
        serverId: string,
        dir: string,
        rawData: string,
    ): Promise<AxiosResponse | void> {
        const fileDir = encodeURIComponent(dir);
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/write?file=${fileDir}`,
                rawData,
            )
            .catch(errorType);
    }

    /**
     * Compresses the specified file
     *
     * @param {string} serverId The id of the server.
     * @param {string} root The path to folder the file is in.
     * @param {Array<string>} fileName The file name.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .compressFiles('SERVER_ID', 'ROOT', [FILE_NAME])
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async compressFiles(
        serverId: string,
        root: string,
        fileName: Array<string>,
    ): Promise<object> {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/compress`,
                data,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Decompresses the selected file
     *
     * @param {string} serverId The id of the server.
     * @param {string} root The path to the folder the file is in.
     * @param {string} fileName The file name.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .decompressFile('SERVER_ID', 'ROOT', 'FILE_NAME')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async decompressFile(
        serverId: string,
        root: string,
        fileName: string,
    ): Promise<AxiosResponse | void> {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/decompress`,
                data,
            )
            .catch(errorType);
    }

    /**
     * Deletes the specified file(s)
     *
     * @param {string} serverId The id of the server.
     * @param {string} root The path to the folder the file is in.
     * @param {Array<string>} fileName File name.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .deleteFile('SERVER_ID', 'ROOT', ['FILE_NAME'])
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async deleteFile(
        serverId: string,
        root: string,
        fileName: Array<string>,
    ): Promise<AxiosResponse | void> {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/delete`,
                data,
            )
            .catch(errorType);
    }

    /**
     * Creates the specified folder in the specified directory
     *
     * @param {string} serverId The id of the server.
     * @param {string} root The folder that you wish to create a folder within.
     * @param {string} folderName Folder name.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .createFolder('SERVER_ID', 'ROOT', 'FOLDER_NAME')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async createFolder(
        serverId: string,
        root: string,
        folderName: string,
    ): Promise<AxiosResponse | void> {
        const data = { root: root, files: folderName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/create-folder`,
                data,
            )
            .catch(errorType);
    }

    /**
     * Returns a signed URL used to upload files to the server using POST request
     *
     * POST request to upload folder is not handled via this library
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .uploadFolder('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async uploadFolder(serverId: string): Promise<object> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/upload`)
            .then((res) => res.data.attributes.url)
            .catch(errorType);
    }

    /**
     * Lists all schedules added to the server
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listSchedules('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async listSchedules(serverId: string): Promise<object> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/schedules`)
            .then((res) => res.data)
            .catch(errorType);
    }

    /**
     * Creates a new schedule
     *
     * @param {string} serverId The id of the server.
     * @param {string} name Name of the schedule.
     * @param {string} minute Cron minute syntax.
     * @param {string} hour Cron hour syntax.
     * @param {string} dayOfWeek Cron day-of-month syntax.
     * @param {string} dayOfMonth Cron day-of-month syntax.
     * @param {boolean} active Specifie whether the schedule is active.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listSchedules(
     * 'SERVER_ID',
     * 'NAME',
     * 'MINUTE',
     * 'HOUR',
     * 'DAY_OF_WEEK',
     * 'DAY_OF_MONTH',
     * )
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async createSchedules(
        serverId: string,
        name: string,
        minute: string,
        hour: string,
        dayOfWeek: string,
        dayOfMonth: string,
        active?: boolean,
    ): Promise<object> {
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
            .catch(errorType);
    }

    /**
     * Retrieves specific schedule
     *
     * @param {string} serverId The id of the server.
     * @param {string} scheduleId The id of the schedule.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .scheduleDetails('SERVER_ID', 'SCHEDULE_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async scheduleDetails(
        serverId: string,
        scheduleId: string,
    ): Promise<object> {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/schedules/${scheduleId}`,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Updates the specified schedule
     *
     * @param {string} serverId The id of the server.
     * @param {string} scheduleId The id of the schedule.
     * @param {string} name Name of the schedule.
     * @param {string} minute Cron minute syntax.
     * @param {string} hour Cron hour syntax.
     * @param {string} dayOfWeek Cron day-of-month syntax.
     * @param {string} dayOfMonth Cron day-of-month syntax.
     * @param {boolean} active Specifie whether the schedule is active.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .updateSchedule(
     * 'SERVER_ID',
     * 'SCHEDULE_ID'
     * 'NAME',
     * 'MINUTE',
     * 'HOUR',
     * 'DAY_OF_WEEK',
     * 'DAY_OF_MONTH',
     * )
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async updateSchedule(
        serverId: string,
        scheduleId: string,
        name: string,
        minute: string,
        hour: string,
        dayOfWeek: string,
        dayOfMonth: string,
        active?: boolean,
    ): Promise<object> {
        const data = {
            name: name,
            minute: minute,
            hour: hour,
            day_of_month: dayOfMonth,
            day_of_week: dayOfWeek,
            is_active: active,
        };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/schedules/${scheduleId}`,
                data,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Deletes the specified schedule
     *
     * @param serverId The id of the server.
     * @param scheduleId The id of the schedule.
     *
     * @returns {Promise<AxiosResponse | void>} Returns a promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .deleteSchedule('SERVER_ID', 'SCHEDULE_ID')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async deleteSchedule(
        serverId: string,
        scheduleId: string,
    ): Promise<AxiosResponse | void> {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/schedules/${scheduleId}`,
            )
            .catch(errorType);
    }

    /**
     * Creates a new task on the specified schedule
     *
     * @param {string} serverId The id of the server.
     * @param {string} scheduleId The id of the schedule
     * @param {'command' | 'power' | 'backup'} action Type of action to use.
     * @param {string} payload Payload to send.
     * @param {string} timeOffSet Offset in seconds
     *
     * @returns {Promise<object>} Returns an object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .createTask(
     * 'SERVER_ID',
     * 'SCHEDULE_ID',
     * 'ACTION',
     * 'PAYLOAD',
     * 'TIME_ OFF_SET'
     * )
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async createTask(
        serverId: string,
        scheduleId: string,
        action: 'command' | 'power' | 'backup',
        payload: string,
        timeOffSet: string,
    ): Promise<object> {
        const data = {
            action: action,
            payload: payload,
            time_offset: timeOffSet,
        };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/schedules/${scheduleId}/tasks`,
                data,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Updates the specified task
     *
     * @param {string} serverId The id of the server.
     * @param {string} taskId The id of the task.
     * @param {string} scheduleId The id of the schedule.
     * @param {string} action Type of action to use.
     * @param {string} payload Payload to send.
     * @param {string} timeOffSet Offset in seconds.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .updayteTask(
     * 'SERVER_ID',
     * 'SCHEDULE_ID',
     * 'ACTION',
     * 'PAYLOAD',
     * 'TIME_OFFSET',
     * )
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async updateTask(
        serverId: string,
        taskId: string,
        scheduleId: string,
        action: string,
        payload: string,
        timeOffSet: string,
    ): Promise<object> {
        const data = {
            action: action,
            payload: payload,
            time_offset: timeOffSet,
        };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`,
                data,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Deletes the specified task
     *
     * @param {string} serverId The id of the server.
     * @param {string} scheduleId The id of a schedule.
     * @param {string} taskId The id of a task.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listAllocations('SERVER_ID')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async deleteTask(
        serverId: string,
        scheduleId: string,
        taskId: string,
    ): Promise<AxiosResponse | void> {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`,
            )
            .catch(errorType);
    }

    /**
     * Retrieves the network information for the specified server
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listAllocations('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async listAllocations(serverId: string): Promise<object> {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/network/allocations`,
            )
            .then((res) => res.data)
            .catch(errorType);
    }

    /**
     * Automatically assigns a new allocation if auto-assign is enabled on the instance
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .assignAllocation('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async assignAllocation(serverId: string): Promise<object> {
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/network/allocations`,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Sets a note for the allocation
     *
     * @param {string} serverId The id of the server.
     * @param {string} allocationId The id of the allocation.
     * @param {string} notes The notes that will be set for the allocaion
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .setAllocationNote('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async setAllocationNote(
        serverId: string,
        allocationId: string,
        notes: string,
    ): Promise<object> {
        const data = { notes: notes };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/network/allocations/${allocationId}`,
                data,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Sets the primary allocation
     *
     * @param {string} serverId The id of the server.
     * @param {string} allocationId The id of the allocation.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .setPrimaryAllocation('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async setPrimaryAllocation(
        serverId: string,
        allocationId: string,
    ): Promise<object> {
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/network/allocations/${allocationId}/primary`,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Deletes the specified non-primary allocation.
     *
     * @param {string} serverId The id of the server.
     * @param {string} allocationId The id of the allocation.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .unassignAllocation('SERVER_ID')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async unassignAllocation(
        serverId: string,
        allocationId: string,
    ): Promise<AxiosResponse | void> {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/network/allocations/${allocationId}`,
            )
            .catch(errorType);
    }

    /**
     * Lists all users added to the server, along with details about them and their permissions
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listUsers('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async listUsers(serverId: string): Promise<object> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/users`)
            .then((res) => res.data)
            .catch(errorType);
    }

    /**
     * Adds a user to the server
     *
     * @param {string} serverId The id of the server.
     * @param {string} email The email of the new user.
     * @param {Array<string>} permissions The permissions the new user will have.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .createUser('SERVER_ID', 'EMAIL', 'PERMISSIONS')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async createUser(
        serverId: string,
        email: string,
        permissions: Array<string>,
    ): Promise<object> {
        const data = {
            email: email,
            permissions: permissions,
        };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/users`, data)
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Retrieves information about a specific user
     *
     * @param {string} serverId The id of the server.
     * @param {string} userId The id of a user.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .userDetails('SERVER_ID', 'USER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async userDetails(
        serverId: string,
        userId: string,
    ): Promise<object> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/users/${userId}`)
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Updates the specified user
     *
     * @param {string} serverId The id of the server.
     * @param {string} userId The id of a user.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .updateUser('SERVER_ID', 'USER_ID')
     * .then((res) => console.log('res'))
     * .catch((e) => console.log(e));
     */
    public async updateUser(
        serverId: string,
        userId: string,
        permissions: string,
    ): Promise<object> {
        const data = { permissions: permissions };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/users/${userId}`,
                data,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Removes the specified user from the server
     *
     * @param {string} serverId The id of the server.
     * @param {string} userId The id of a user.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .deleteUser('SERVER_ID', 'USER_ID')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async deleteUser(
        serverId: string,
        userId: string,
    ): Promise<AxiosResponse | void> {
        return this.axiosHandler
            .request('DELETE', `api/client/servers/${serverId}/users/${userId}`)
            .catch(errorType);
    }

    /**
     * Retrieves a list of backups
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listBackups('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async listBackups(serverId: string): Promise<object> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/backups`)
            .then((res) => res.data)
            .catch(errorType);
    }

    /**
     * Creates a new backup
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .createBackup('SERVER_ID')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async createBackup(serverId: string): Promise<object> {
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/backups`)
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Retrieves information about the specified backup
     *
     * @param {string} serverId The id of the server.
     * @param {string} backupId The id of a backup.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .backupDetails('SERVER_ID', 'BACKUP_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async backupDetails(
        serverId: string,
        backupId: string,
    ): Promise<object> {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/backups/${backupId}`,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Generates a download link for the backup
     *
     * @param {string} serverId The id of the server.
     * @param {string} backupId The id of a backup.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .deleteBackup('SERVER_ID', 'BACKUP_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async downloadBackup(
        serverId: string,
        backupId: string,
    ): Promise<object> {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/backups/${backupId}/download`,
            )
            .then((res) => res.data.attributes.url)
            .catch(errorType);
    }

    /**
     * Deletes the specified backup
     *
     * @param {string} serverId The id of the server.
     * @param {string} backupId The id of a backup.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .deleteBackup('SERVER_ID', 'BACKUP_ID')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async deleteBackup(
        serverId: string,
        backupId: string,
    ): Promise<AxiosResponse | void> {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/backups/${backupId}`,
            )
            .catch(errorType);
    }

    /**
     * Lists all variables on the server
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .listVariable('SERVER_ID', 'KEY', 'VALUE')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async listVariables(serverId: string): Promise<object> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/startup`)
            .then((res) => res.data)
            .catch(errorType);
    }

    /**
     * Updates the specified variable
     *
     * @param {string} serverId The id of the server.
     * @param {string} key The key of the variable.
     * @param {string} value The value of the variable.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .updateVariable('SERVER_ID', 'KEY', 'VALUE')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    public async updateVariable(
        serverId: string,
        key: string,
        value: string,
    ): Promise<object> {
        const data = { key: key, value: value };
        return this.axiosHandler
            .request(
                'PUT',
                `api/client/servers/${serverId}/startup/variable`,
                data,
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }

    /**
     * Renames the specified server
     *
     * @param {string} serverId The id of the server.
     * @param {string} name The new name of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .renameServer('SERVER_ID', 'NAME')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async renameServer(
        serverId: string,
        name: string,
    ): Promise<AxiosResponse | void> {
        const data = { name: name };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/settings/rename`,
                data,
            )
            .catch(errorType);
    }

    /**
     * Reinstall the specified server
     *
     * @param {string} serverId The id of the server.
     *
     * @returns {Promise<object>} Returns an object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'CLIENT_API_KEY');
     * pterom.client
     * .reinstallServer('SERVER_ID')
     * .then(() => console.log('done'))
     * .catch((e) => console.log(e));
     */
    public async reinstallServer(
        serverId: string,
    ): Promise<AxiosResponse | void> {
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/reinstall`)
            .catch(errorType);
    }
