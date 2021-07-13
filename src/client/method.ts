import Axios from '../utils/axiosRequest';
import { encode } from '../utils/utility';

export const factory = (method: "GET" | "PUT" | "POST" | "DELETE" | "PATCH", route: string, data: string | null) => {
    return (host: string, key: string) => {
        const axios = new Axios(host, key);
        return axios.request(method, route, data);
    }
}

export const test = factory('GET', 'api/client', null)

export const listServers = (host: string, key: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', 'api/client', null);
};

export const showPermissions = (host: string, key: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', 'api/client/permissions', null);
};

export const accountDetails = (host: string, key: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', 'api/client/account', null);
};

export const genarateTwoFactorQR = (host: string, key: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', 'api/client/account/two-factor', null);
};

export const enableTwoFactor = (
    host: string,
    key: string,
    twoFACode: string,
) => {
    const data = { code: twoFACode };
    const axios = new Axios(host, key);
    return axios.request('POST', 'api/client/account/two-factor', `${data}`);
};

export const disableTwoFactor = (
    host: string,
    key: string,
    password: string,
) => {
    const data = { password: password };
    const axios = new Axios(host, key);
    return axios.request('DELETE', 'api/client/account/two-factor', `${data}`);
};

export const updateEmail = (
    host: string,
    key: string,
    newEmail: string,
    password: string,
) => {
    const data = { email: newEmail, password: password };
    const axios = new Axios(host, key);
    return axios.request('PUT', 'api/client/account/email', `${data}`);
};

export const updatePassword = (
    host: string,
    key: string,
    password: string,
    newPassword: string,
    confirmNewPassword?: string,
    confimation?: boolean,
) => {
    const data = {
        current_password: password,
        password: newPassword,
        password_confirmation: confirmNewPassword,
    };
    if (confimation == false) {
        const data = {
            current_password: password,
            password: newPassword,
            password_confirmation: newPassword,
        };
        return data;
    }
    const axios = new Axios(host, key);
    return axios.request('PUT', 'api/client/account/password', `${data}`);
};

export const listApiKeys = (host: string, key: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', 'api/client/account/api-keys', null);
};

export const createApikey = (
    host: string,
    key: string,
    description: string,
    ips?: Array<string>,
) => {
    const data = { description: description, allowed_ips: ips };
    const axios = new Axios(host, key);
    return axios.request('POST', 'api/client/account/api-keys', `${data}`);
};

export const deleteApiKey = (host: string, key: string, identifier: string) => {
    const axios = new Axios(host, key);
    return axios.request(
        'DELETE',
        `api/client/account/api-keys/${identifier}`,
        null,
    );
};

export const serverDetails = (host: string, key: string, serverId: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', `api/client/servers/${serverId}`, null);
};

//todo websocket will be implimented last.

export const resourceUsage = (host: string, key: string, serverId: string) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/resources`,
        null,
    );
};

export const sendCommand = (
    host: string,
    key: string,
    serverId: string,
    command: string,
) => {
    const data = { command: command };
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/command`,
        `${data}`,
    );
};

export const changePowerState = (
    host: string,
    key: string,
    serverId: string,
    state: 'start' | 'stop' | 'restart' | 'kill',
) => {
    const data = { signal: state };
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/power`,
        `${data}`,
    );
};

export const listDatabases = (host: string, key: string, serverId: string) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/databases`,
        null,
    );
};

export const createDatabase = (
    host: string,
    key: string,
    serverId: string,
    newDatabaseName: string,
    remote: string,
) => {
    const data = { database: newDatabaseName, remote: remote };
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/databases`,
        `${data}`,
    );
};

export const rotateDatabasePassword = (
    host: string,
    key: string,
    serverId: string,
    databaseId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/databases/${databaseId}/rotate-password`,
        null,
    );
};

export const deleteDatabase = (
    host: string,
    key: string,
    serverId: string,
    databaseId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'DELETE',
        `api/client/servers/${serverId}/databases/${databaseId}`,
        null,
    );
};

export const listFiles = (
    host: string,
    key: string,
    serverId: string,
    dir: string,
) => {
    const folderDir = encode(dir);
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/files/list?directory=${folderDir}`,
        null,
    );
};

export const getFileContent = (
    host: string,
    key: string,
    serverId: string,
    dir: string,
    file: string,
) => {
    const fileDir = encode(dir, file);
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/files/contents?file=${fileDir}`,
        null,
    );
};

export const downloadFile = (
    host: string,
    key: string,
    serverId: string,
    dir: string,
    file: string,
) => {
    const fileDir = encode(dir, file);
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/files/download?file=${fileDir}`,
        null,
    );
};

export const renameFile = (
    host: string,
    key: string,
    serverId: string,
    root: string,
    fileName: string,
    newFileName: string,
) => {
    const data = { root: root, files: [{ from: fileName, to: newFileName }] };
    const axios = new Axios(host, key);
    return axios.request(
        'PUT',
        `api/client/servers/${serverId}/files/rename`,
        `${data}`,
    );
};

export const copyFile = (
    host: string,
    key: string,
    serverId: string,
    location: string,
) => {
    const data = { location: location };
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/files/copy`,
        `${data}`,
    );
};

export const writeFile = (
    host: string,
    key: string,
    serverId: string,
    dir: string,
    file: string,
    rawData: string,
) => {
    const fileDir = encode(dir, file);
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/files/write?file=${fileDir}`,
        `${rawData}`,
    );
};

export const compressFile = (
    host: string,
    key: string,
    serverId: string,
    root: string,
    fileName: Array<string>,
) => {
    const data = { root: root, files: fileName };
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/files/compress`,
        `${data}`,
    );
};

export const decompressFile = (
    host: string,
    key: string,
    serverId: string,
    root: string,
    fileName: string,
) => {
    const data = { root: root, files: fileName };
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/files/decompress`,
        `${data}`,
    );
};

export const deleteFile = (
    host: string,
    key: string,
    serverId: string,
    root: string,
    fileName: Array<string>,
) => {
    const data = { root: root, files: fileName };
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/files/delete`,
        `${data}`,
    );
};

export const createFolder = (
    host: string,
    key: string,
    serverId: string,
    root: string,
    folderName: string,
) => {
    const data = { root: root, name: folderName };
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/files/create-folder`,
        `${data}`,
    );
};

export const uploadFile = (host: string, key: string, serverId: string) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/files/upload`,
        null,
    );
};

export const listSchedules = (host: string, key: string, serverId: string) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/schedules`,
        null,
    );
};

export const createSchedule = (
    host: string,
    key: string,
    serverId: string,
    name: string,
    minute: string,
    hour: string,
    dayOfWeek: string,
    dayOfMonth: string,
    active?: boolean,
) => {
    const axios = new Axios(host, key);
    const data = {
        name: name,
        minute: minute,
        hour: hour,
        day_of_month: dayOfMonth,
        day_of_week: dayOfWeek,
        is_active: active,
    };
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/schedules`,
        `${data}`,
    );
};

export const scheduleDetails = (
    host: string,
    key: string,
    serverId: string,
    scheduleId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/schedules/${scheduleId}`,
        null,
    );
};

export const updateSchedule = (
    host: string,
    key: string,
    serverId: string,
    scheduleId: string,
    name: string,
    minute: string,
    hour: string,
    dayOfWeek: string,
    dayOfMonth: string,
    active?: boolean,
) => {
    const axios = new Axios(host, key);
    const data = {
        name: name,
        minute: minute,
        hour: hour,
        day_of_month: dayOfMonth,
        day_of_week: dayOfWeek,
        is_active: active,
    };
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/schedules/${scheduleId}`,
        `${data}`,
    );
};

export const deleteSchedule = (
    host: string,
    key: string,
    serverId: string,
    scheduleId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'DELETE',
        `api/client/servers/${serverId}/schedules/${scheduleId}`,
        null,
    );
};

export const createTask = (
    host: string,
    key: string,
    serverId: string,
    scheduleId: string,
    action: string,
    payload: string,
    timeOffSet: string,
) => {
    const axios = new Axios(host, key);
    const data = {
        action: action,
        payload: payload,
        time_offset: timeOffSet,
    };
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/schedules/${scheduleId}/tasks`,
        `${data}`,
    );
};

export const updateTask = (
    host: string,
    key: string,
    serverId: string,
    taskId: string,
    scheduleId: string,
    action: string,
    payload: string,
    timeOffSet: string,
) => {
    const axios = new Axios(host, key);
    const data = {
        action: action,
        payload: payload,
        time_offset: timeOffSet,
    };
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`,
        `${data}`,
    );
};

export const deleteTask = (
    host: string,
    key: string,
    serverId: string,
    scheduleId: string,
    taskId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'DELETE',
        `api/client/servers/${serverId}/schedules/${scheduleId}/tasks/${taskId}`,
        null,
    );
};

export const listAllocations = (
    host: string,
    key: string,
    serverId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/network/allocations`,
        null,
    );
};

export const assignAllocation = (
    host: string,
    key: string,
    serverId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/network/allocations`,
        null,
    );
};

export const setAllocationNote = (
    host: string,
    key: string,
    serverId: string,
    allocationId: string,
    notes: string,
) => {
    const axios = new Axios(host, key);
    const data = { notes: notes };
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/network/allocations/${allocationId}`,
        `${data}`,
    );
};

export const setPrimaryAllocation = (
    host: string,
    key: string,
    serverId: string,
    allocationId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/network/allocations/${allocationId}/primary`,
        null,
    );
};

export const unassignAllocation = (
    host: string,
    key: string,
    serverId: string,
    allocationId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'DELETE',
        `api/client/servers/${serverId}/network/allocations/${allocationId}`,
        null,
    );
};

export const listUsers = (host: string, key: string, serverId: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', `api/client/servers/${serverId}/users`, null);
};

export const createUser = (
    host: string,
    key: string,
    serverId: string,
    email: string,
    permissions: string,
) => {
    const axios = new Axios(host, key);
    const data = {
        email: email,
        permissions: permissions,
    };
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/users`,
        `${data}`,
    );
};

export const userDetails = (
    host: string,
    key: string,
    serverId: string,
    userId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/users/${userId}`,
        null,
    );
};

export const updateUser = (
    host: string,
    key: string,
    serverId: string,
    userId: string,
    permissions: string,
) => {
    const axios = new Axios(host, key);
    const data = { permissions: permissions };
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/users/${userId}`,
        `${data}`,
    );
};

export const deleteUser = (
    host: string,
    key: string,
    serverId: string,
    userId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'DELETE',
        `api/client/servers/${serverId}/users/${userId}`,
        null,
    );
};

export const listBackups = (host: string, key: string, serverId: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', `api/client/servers/${serverId}/backups`, null);
};

export const createBackup = (host: string, key: string, serverId: string) => {
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/backups`,
        null,
    );
};

export const backupDetails = (
    host: string,
    key: string,
    serverId: string,
    backupId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/backups/${backupId}`,
        null,
    );
};

export const downloadBackup = (
    host: string,
    key: string,
    serverId: string,
    backupId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/client/servers/${serverId}/backups/${backupId}/download`,
        null,
    );
};

export const deleteBackup = (
    host: string,
    key: string,
    serverId: string,
    backupId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'DELETE',
        `api/client/servers/${serverId}/backups/${backupId}`,
        null,
    );
};

export const listVariables = (host: string, key: string, serverId: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', `api/client/servers/${serverId}/startup`, null);
};

export const updateVariable = (
    host: string,
    key: string,
    serverId: string,
    key2: string,
    value: string,
) => {
    const axios = new Axios(host, key);
    const data = { key: key2, value: value };
    return axios.request(
        'PUT',
        `api/client/servers/${serverId}/startup/variable`,
        `${data}`,
    );
};

export const renameServer = (
    host: string,
    key: string,
    serverId: string,
    name: string,
) => {
    const axios = new Axios(host, key);
    const data = { name: name };
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/settings/rename`,
        `${data}`,
    );
};

export const reinstallServer = (
    host: string,
    key: string,
    serverId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'POST',
        `api/client/servers/${serverId}/reinstall`,
        null,
    );
};
