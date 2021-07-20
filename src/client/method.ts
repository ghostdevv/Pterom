// this file will be removed as it is not needed and only used for ref
import Axios from '../utils/axiosRequest';
import { encode } from '../utils/utility';


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
