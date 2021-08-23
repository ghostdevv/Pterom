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
import AxiosHandler from '../utils/axiosRequest';
import { encode, processError } from '../utils/utility';

export default class Client {
    private axiosHandler: AxiosHandler;

    constructor(host: string, key: string) {
        this.axiosHandler = new AxiosHandler(host, key);
    }

    /**
     * Lists all servers
     */
    public async listServers() {
        return this.axiosHandler
            .request('GET', 'api/client', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    /**
     * Retries all available permissions
     */
    public async showPermissions() {
        return this.axiosHandler
            .request('GET', 'api/client/permissions', null)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Retrieves information about the account
     */
    public async accountDetails() {
        return this.axiosHandler
            .request('GET', 'api/client/account', null)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Generates a TOTP QR code image to allow the setup of 2FA
     */
    public async genarateTwoFactorQR() {
        return this.axiosHandler
            .request('GET', 'api/client/account/two-factor', null)
            .then((res) => res.data.image_url_data)
            .catch(this.errorType);
    }

    /**
     * Enables TOTP 2FA using the QR code generated by genarateTwoFactorQR
     */
    public async enableTwoFactor(code: string) {
        const data = { code: code };
        return this.axiosHandler
            .request('POST', 'api/client/account/two-factor', `${data}`)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Disables TOTP 2FA on the account
     */
    public async disableTwoFactor(password: string) {
        const data = { password: password };
        return this.axiosHandler
            .request('DELETE', 'api/client/account/two-factor', `${data}`)
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Updates the email address of the account
     */
    public async updateEmail(newEmail: string, password: string) {
        const data = { email: newEmail, password: password };
        return this.axiosHandler
            .request('PUT', 'api/client/account/email', `${data}`)
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Updates the password of the account
     */
    public async updatePassword(
        currentPassword: string,
        newPassword: string,
        confirmNewPassword: string,
    ) {
        const data = {
            current_password: currentPassword,
            password: newPassword,
            password_confirmation: confirmNewPassword,
        };
        return this.axiosHandler
            .request('PUT', 'api/client/account/password', `${data}`)
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Retrieves a list of API keys
     */
    public async listApiKeys() {
        return this.axiosHandler
            .request('GET', 'api/client/account/api-keys', null)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Generates a new API key
     */
    public async createApiKey(description: string, ips?: Array<string>) {
        const data = { description: description, allowed_ips: ips };
        return this.axiosHandler
            .request('POST', 'api/client/account/api-keys', `${data}`)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Deletes the specified API key
     */
    public async deleteApiKey(identifier: string) {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/account/api-keys/${identifier}`,
                null,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Retrieves information about the specified server
     */
    public async serverDetails(serverId: string) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}`, null)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }
    /*
        Websocket when implimented will go here. This is not a piority as it is not needed as much
    */
    /**
     * Retrieves resource utilization of the specified server
     */
    public async resourceUsage(serverId: string) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/resources`, null)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Sends a command to the server
     *
     * The server must be online to send a command to it. You will get HTTP 502 is the server if not online.
     */
    public async sendCommand(serverId: string, command: string) {
        const data = { command: command };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/command`,
                `${data}`,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Sends a power signal to the server
     */
    public async changePowerState(
        serverId: string,
        state: 'start' | 'stop' | 'restart' | 'kill',
    ) {
        const data = { signal: state };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/power`, `${data}`)
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Lists all databases on a server
     */
    public async listDatabases(serverId: string) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/databases`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    /**
     * Creates a new database
     */
    public async createDatabase(
        serverId: string,
        newDatabaseName: string,
        remote: string,
    ) {
        const data = { database: newDatabaseName, remote: remote };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/databases`,
                `${data}`,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Changes the password of a specified database
     */
    public async rotateDatabasePassword(serverId: string, databaseId: string) {
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/databases/${databaseId}/rotate-password`,
                null,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Deletes the specified database
     */
    public async deleteDatabase(serverId: string, databaseId: string) {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/databases/${databaseId}`,
                null,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Lists all files within a folder
     */
    public async listFiles(serverId: string, dir: string) {
        const folderDir = encode(dir);
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/files/list?directory=${folderDir}`,
                null,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    /**
     * Displays the contents of the specified file
     */
    public async getFileContent(serverId: string, dir: string, file: string) {
        const fileDir = encode(dir, file);
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/files/contents?file=${fileDir}`,
                null,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    /**
     * Generates a one-time link to download the specified file
     */
    public async downloadFile(serverId: string, dir: string, file: string) {
        const fileDir = encode(dir, file);
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/files/download?file=${fileDir}`,
                null,
            )
            .then((res) => res.data.attributes.url)
            .catch(this.errorType);
    }

    /**
     * Renames the specified file
     */
    public async renameFile(
        serverId: string,
        root: string,
        fileName: string,
        newFileName: string,
    ) {
        const data = {
            root: root,
            files: [{ from: fileName, to: newFileName }],
        };
        return this.axiosHandler
            .request(
                'PUT',
                `api/client/servers/${serverId}/files/rename`,
                `${data}`,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Copies the specified file
     */
    public async copyFile(serverId: string, location: string) {
        const data = { location: location };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/copy`,
                `${data}`,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Writes data to the specified file
     */
    public async writeFile(
        serverId: string,
        dir: string,
        file: string,
        rawData: string,
    ) {
        const fileDir = encode(dir, file);
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/write?file=${fileDir}`,
                `${rawData}`,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Compresses the specified file
     */
    public async compressFiles(
        serverId: string,
        root: string,
        fileName: Array<string>,
    ) {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/compress`,
                `${data}`,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Decompresses the selected file
     */
    public async decompressFile(
        serverId: string,
        root: string,
        fileName: string,
    ) {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/decompress`,
                `${data}`,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Deletes the specified file(s)
     */
    public async deleteFile(
        serverId: string,
        root: string,
        fileName: Array<string>,
    ) {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/delete`,
                `${data}`,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Creates the specified folder in the specified directory
     */
    public async createFolder(
        serverId: string,
        root: string,
        folderName: string,
    ) {
        const data = { root: root, files: folderName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/create-folder`,
                `${data}`,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Returns a signed URL used to upload files to the server using POST request
     *
     * POST request to upload folder is not handled via this library
     */
    public async uploadFolder(serverId: string) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/upload`, null)
            .then((res) => res.data.attributes.url)
            .catch(this.errorType);
    }

    /**
     * Lists all schedules added to the server
     */
    public async listSchedules(serverId: string) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/schedules`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    /**
     * Creates a new schedule
     */
    public async createSchedules(
        serverId: string,
        name: string,
        minute: string,
        hour: string,
        dayOfWeek: string,
        dayOfMonth: string,
        active?: boolean,
    ) {
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
                `api/client/servers/${serverId}/schedules`,
                `${data}`,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    /**
     * Retrieves specific schedule
     */
    public async scheduleDetails(serverId: string, scheduleId: string) {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/schedules/${scheduleId}`,
                null,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Updates the specified schedule
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
    ) {
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
                `${data}`,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Deletes the specified schedule
     */
    public async deleteSchedule(serverId: string, scheduleId: string) {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/schedules/${scheduleId}`,
                null,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Creates a new task on the specified schedule
     */
    public async createTask(
        serverId: string,
        scheduleId: string,
        action: string,
        payload: string,
        timeOffSet: string,
    ) {
        const data = {
            action: action,
            payload: payload,
            time_offset: timeOffSet,
        };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/schedules/${scheduleId}/tasks`,
                `${data}`,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Updates the specified task
     */
    public async updateTask(
        serverId: string,
        taskId: string,
        scheduleId: string,
        action: string,
        payload: string,
        timeOffSet: string,
    ) {
        const data = {
            action: action,
            payload: payload,
            time_offset: timeOffSet,
        };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`,
                `${data}`,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Deletes the specified task
     */
    public async deleteTask(
        serverId: string,
        scheduleId: string,
        taskId: string,
    ) {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`,
                null,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Retrieves the network information for the specified server
     */
    public async listAllocations(serverId: string) {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/network/allocations`,
                null,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    /**
     * Automatically assigns a new allocation if auto-assign is enabled on the instance
     */
    public async assignAllocation(serverId: string) {
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/network/allocations`,
                null,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Sets a note for the allocation
     */
    public async setAllocationNote(
        serverId: string,
        allocationId: string,
        notes: string,
    ) {
        const data = { notes: notes };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/network/allocations/${allocationId}`,
                `${data}`,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Sets the primary allocation
     */
    public async setPrimaryAllocation(serverId: string, allocationId: string) {
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/network/allocations/${allocationId}/primary`,
                null,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Deletes the specified non-primary allocation
     */
    public async unassignAllocation(serverId: string, allocationId: string) {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/network/allocations/${allocationId}`,
                null,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Lists all users added to the server, along with details about them and their permissions
     */
    public async listUsers(serverId: string) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/users`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    /**
     * Adds a user to the server
     */
    public async createUser(
        serverId: string,
        email: string,
        permissions: Array<string>,
    ) {
        const data = {
            email: email,
            permissions: permissions,
        };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/users`, `${data}`)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Retrieves information about a specific user
     */
    public async userDetails(serverId: string, userId: string) {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/users/${userId}`,
                null,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Updates the specified user
     */
    public async updateUser(
        serverId: string,
        userId: string,
        permissions: string,
    ) {
        const data = { permissions: permissions };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/users/${userId}`,
                `${data}`,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Removes the specified user from the server
     */
    public async deleteUser(serverId: string, userId: string) {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/users/${userId}`,
                null,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Retrieves a list of backups
     */
    public async listBackups(serverId: string) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/backups`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    /**
     * Creates a new backup
     */
    public async createBackup(serverId: string) {
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/backups`, null)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Retrieves information about the specified backup
     */
    public async backupDetails(serverId: string, backupId: string) {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/backups/${backupId}`,
                null,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Generates a download link for a backup
     */
    public async downloadBackup(serverId: string, backupId: string) {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/backups/${backupId}/download`,
                null,
            )
            .then((res) => res.data.attributes.url)
            .catch(this.errorType);
    }

    /**
     * Deletes the specified backup
     */
    public async deleteBackup(serverId: string, backupId: string) {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/backups/${backupId}`,
                null,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Lists all variables on the server
     */
    public async listVariables(serverId: string) {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/startup`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    /**
     * Updates the specified variable
     */
    public async updateVariable(serverId: string, key: string, value: string) {
        const data = { key: key, value: value };
        return this.axiosHandler
            .request(
                'PUT',
                `api/client/servers/${serverId}/startup/variable`,
                `${data}`,
            )
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    /**
     * Renames the specified server
     */
    public async renameServer(serverId: string, name: string) {
        const data = { name: name };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/settings/rename`,
                `${data}`,
            )
            .then(() => true)
            .catch(this.errorType);
    }

    /**
     * Reinstall the specified server
     */
    public async reinstallServer(serverId: string) {
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/reinstall`, null)
            .then(() => true)
            .catch(this.errorType);
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
            502: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (502): The server is offline or bad gateway.',
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
