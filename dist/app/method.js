"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteLocation = exports.updateLocation = exports.createLocation = exports.locationDetails = exports.listLocations = exports.deleteAllocation = exports.createAllocations = exports.listAllocations = exports.deleteNode = exports.updateNode = exports.createNode = exports.nodeConfiguration = exports.nodeDetails = exports.listNodes = exports.deleteUser = exports.updateUser = exports.createUser = exports.userDetailsExternalId = exports.userDetails = exports.listUsers = void 0;
const axiosRequest_1 = __importDefault(require("../utils/axiosRequest"));
const listUsers = (host, key) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('GET', `api/application/users`, null);
};
exports.listUsers = listUsers;
const userDetails = (host, key, userId) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('GET', `api/application/users/${userId}`, null);
};
exports.userDetails = userDetails;
const userDetailsExternalId = (host, key, remoteId) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('GET', `api/application/users/external/${remoteId}`, null);
};
exports.userDetailsExternalId = userDetailsExternalId;
const createUser = (host, key, email, username, first_name, last_name) => {
    const axios = new axiosRequest_1.default(host, key);
    const data = {
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
    };
    return axios.request('POST', `api/application/users`, `${data}`);
};
exports.createUser = createUser;
const updateUser = (host, key, userId, email, username, first_name, last_name, language, password) => {
    const axios = new axiosRequest_1.default(host, key);
    const data = {
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
        language: language,
        password: password,
    };
    return axios.request('PATCH', `api/application/users/${userId}`, `${data}`);
};
exports.updateUser = updateUser;
const deleteUser = (host, key, userId) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('POST', `api/application/users/${userId}`, null);
};
exports.deleteUser = deleteUser;
const listNodes = (host, key) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('GET', `api/application/nodes`, null);
};
exports.listNodes = listNodes;
const nodeDetails = (host, key, nodeId) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('GET', `api/application/nodes/${nodeId}`, null);
};
exports.nodeDetails = nodeDetails;
const nodeConfiguration = (host, key, nodeId) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('GET', `api/application/nodes/${nodeId}/configuration`, null);
};
exports.nodeConfiguration = nodeConfiguration;
const createNode = (host, key, name, location_id, fqdn, scheme, memory, memory_overallocate, disk, disk_overallocate, upload_size, daemon_sftp, daemon_listen) => {
    const axios = new axiosRequest_1.default(host, key);
    const data = {
        name: name,
        location_id: location_id,
        fqdn: fqdn,
        scheme: scheme,
        memory: memory,
        memory_overallocate: memory_overallocate,
        disk: disk,
        disk_overallocate: disk_overallocate,
        upload_size: upload_size,
        daemon_sftp: daemon_sftp,
        daemon_listen: daemon_listen,
    };
    return axios.request('POST', `api/application/nodes`, `${data}`);
};
exports.createNode = createNode;
const updateNode = (host, key, nodeId, name, description, location_id, fqdn, scheme, behind_proxy, maintenance_mode, memory, memory_overallocate, disk, disk_overallocate, upload_size, daemon_sftp, daemon_listen) => {
    const axios = new axiosRequest_1.default(host, key);
    const data = {
        name: name,
        description: description,
        location_id: location_id,
        fqdn: fqdn,
        scheme: scheme,
        behind_proxy: behind_proxy,
        maintenance_mode: maintenance_mode,
        memory: memory,
        memory_overallocate: memory_overallocate,
        disk: disk,
        disk_overallocate: disk_overallocate,
        upload_size: upload_size,
        daemon_sftp: daemon_sftp,
        daemon_listen: daemon_listen,
    };
    return axios.request('PATCH', `api/application/nodes/${nodeId}`, `${data}`);
};
exports.updateNode = updateNode;
const deleteNode = (host, key, nodeId) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('DELETE', `api/application/nodes/${nodeId}`, null);
};
exports.deleteNode = deleteNode;
const listAllocations = (host, key, nodeId) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('GET', `api/application/nodes/${nodeId}/allocations`, null);
};
exports.listAllocations = listAllocations;
const createAllocations = (host, key, nodeId, ip, ports) => {
    const axios = new axiosRequest_1.default(host, key);
    const data = {
        ip: ip,
        ports: ports,
    };
    return axios.request('POST', `api/application/nodes/${nodeId}/allocations`, `${data}`);
};
exports.createAllocations = createAllocations;
const deleteAllocation = (host, key, nodeId, allocationId) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('DELETE', `api/application/nodes/${nodeId}/allocations/${allocationId}`, null);
};
exports.deleteAllocation = deleteAllocation;
const listLocations = (host, key) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('GET', `api/application/locations`, null);
};
exports.listLocations = listLocations;
const locationDetails = (host, key, locationId) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('GET', `api/application/locations/${locationId}`, null);
};
exports.locationDetails = locationDetails;
const createLocation = (host, key, short, long) => {
    const axios = new axiosRequest_1.default(host, key);
    const data = {
        short: short,
        long: long,
    };
    return axios.request('POST', `api/application/locations`, `${data}`);
};
exports.createLocation = createLocation;
const updateLocation = (host, key, locationId, short, long) => {
    const axios = new axiosRequest_1.default(host, key);
    const data = {
        short: short,
        long: long,
    };
    return axios.request('PATCH', `api/application/locations/${locationId}`, `${data}`);
};
exports.updateLocation = updateLocation;
const deleteLocation = (host, key, locationId) => {
    const axios = new axiosRequest_1.default(host, key);
    return axios.request('DELETE', `api/application/locations/${locationId}`, null);
};
exports.deleteLocation = deleteLocation;
