import AxiosHandler from '../utils/axiosRequest';
import { encode, processError } from '../utils/utility';

export default class Client {
    host: string;
    Key: string;
    axiosHandler: AxiosHandler;

    constructor(host: string, key: string) {
        this.host = host;
        this.Key = key;
        this.axiosHandler = new AxiosHandler(host, key);
    }

    public async listServers(): Promise<any> {
        return this.axiosHandler
            .request('GET', 'api/client', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async showPermissions(): Promise<any> {
        return this.axiosHandler
            .request('GET', 'api/client/permissions', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async accountDetails(): Promise<any> {
        return this.axiosHandler
            .request('GET', 'api/client/account', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async genarateTwoFactorQR(): Promise<any> {
        return this.axiosHandler
            .request('GET', 'api/client/account/two-factor', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async enableTwoFactor(code: string): Promise<any> {
        const data = { code: code };
        return this.axiosHandler
            .request('POST', 'api/client/account/two-factor', `${data}`)
            .then((res) => res.data.attributes)
            .catch(this.errorType);
    }

    public async disableTwoFactor(password: string): Promise<any> {
        const data = { password: password };
        return this.axiosHandler
            .request('DELETE', 'api/client/account/two-factor', `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async updateEmail(newEmail: string, password: string): Promise<any> {
        const data = { email: newEmail, password: password };
        return this.axiosHandler
            .request('PUT', 'api/client/account/email', `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async updatePassword(
        currentPassword: string,
        newPassword: string,
        confirmNewPassword: string,
    ): Promise<any> {
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

    public async listApiKeys(): Promise<any> {
        return this.axiosHandler
            .request('GET', 'api/client/account/api-keys', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async createApiKey(
        description: string,
        ips?: Array<string>,
    ): Promise<any> {
        const data = { description: description, allowed_ips: ips };
        return this.axiosHandler
            .request('POST', 'api/client/account/api-keys', `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async deleteApiKey(identifier: string): Promise<any> {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/account/api-keys/${identifier}`,
                null,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async serverDetails(serverId: string): Promise<any> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    //todo Websocket when implimented will go here. this is not a piority as it is not needed as much

    public async resourceUsage(serverId: string): Promise<any> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/resources`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async sendCommand(serverId: string, command: string): Promise<any> {
        const data = { command: command };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/command`,
                `${data}`,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async changePowerState(
        serverId: string,
        state: 'start' | 'stop' | 'restart' | 'kill',
    ): Promise<any> {
        const data = { signal: state };
        return this.axiosHandler
            .request('POST', `api/client/servers/${serverId}/power`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async listDatabases(serverId: string): Promise<any> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/databases`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async createDatabase(
        serverId: string,
        newDatabaseName: string,
        remote: string,
    ): Promise<any> {
        const data = { database: newDatabaseName, remote: remote };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/databases`,
                `${data}`,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async rotateDatabasePassword(
        serverId: string,
        databaseId: string,
    ): Promise<any> {
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/databases/${databaseId}/rotate-password`,
                null,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async deleteDatabase(
        serverId: string,
        databaseId: string,
    ): Promise<any> {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/databases/${databaseId}`,
                null,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async listFiles(serverId: string, dir: string): Promise<any> {
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

    public async getFileContent(
        serverId: string,
        dir: string,
        file: string,
    ): Promise<any> {
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

    public async downloadFile(
        serverId: string,
        dir: string,
        file: string,
    ): Promise<any> {
        const fileDir = encode(dir, file);
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/files/download?file=${fileDir}`,
                null,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async renameFile(
        serverId: string,
        root: string,
        fileName: string,
        newFileName: string,
    ): Promise<any> {
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
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async copyFile(serverId: string, location: string): Promise<any> {
        const data = { location: location };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/copy`,
                `${data}`,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async writeFile(
        serverId: string,
        dir: string,
        file: string,
        rawData: string,
    ): Promise<any> {
        const fileDir = encode(dir, file);
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/write?file=${fileDir}`,
                `${rawData}`,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async compressFiles(
        serverId: string,
        root: string,
        fileName: Array<string>,
    ): Promise<any> {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/compress`,
                `${data}`,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async decompressFile(
        serverId: string,
        root: string,
        fileName: string,
    ): Promise<any> {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/decompress`,
                `${data}`,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async deleteFile(
        serverId: string,
        root: string,
        fileName: Array<string>,
    ): Promise<any> {
        const data = { root: root, files: fileName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/delete`,
                `${data}`,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async createFolder(
        serverId: string,
        root: string,
        folderName: string,
    ): Promise<any> {
        const data = { root: root, files: folderName };
        return this.axiosHandler
            .request(
                'POST',
                `api/client/servers/${serverId}/files/create-folder`,
                `${data}`,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async uploadFolder(serverId: string): Promise<any> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/files/upload`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async listSchedules(serverId: string): Promise<any> {
        return this.axiosHandler
            .request('GET', `api/client/servers/${serverId}/schedules`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async createSchedules(
        serverId: string,
        name: string,
        minute: string,
        hour: string,
        dayOfWeek: string,
        dayOfMonth: string,
        active?: boolean,
    ): Promise<any> {
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

    public async scheduleDetails(
        serverId: string,
        scheduleId: string,
    ): Promise<any> {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}/schedules/${scheduleId}`,
                null,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async updateSchedule(
        serverId: string,
        scheduleId: string,
        name: string,
        minute: string,
        hour: string,
        dayOfWeek: string,
        dayOfMonth: string,
        active?: boolean,
    ): Promise<any> {
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
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async deleteSchedule(
        serverId: string,
        scheduleId: string,
    ): Promise<any> {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/client/servers/${serverId}/schedules/${scheduleId}`,
                null,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async createTask(
        serverId: string,
        scheduleId: string,
        action: string,
        payload: string,
        timeOffSet: string,
    ): Promise<any> {
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
            .then((res) => res.data)
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
