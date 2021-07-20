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
import Axios from '../utils/axiosRequest';

// optional parameters -- need to work on this
export const listUsers = (host: string, key: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', `api/application/users`, null);
};

// also has optional parameters -- need to work on this
export const userDetails = (host: string, key: string, userId: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', `api/application/users/${userId}`, null);
};

// also has optional parameters -- need to work on this
export const userDetailsExternalId = (
    host: string,
    key: string,
    remoteId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/application/users/external/${remoteId}`,
        null,
    );
};

export const createUser = (
    host: string,
    key: string,
    email: string,
    username: string,
    first_name: string,
    last_name: string,
) => {
    const axios = new Axios(host, key);
    const data = {
        email: email,
        username: username,
        first_name: first_name,
        last_name: last_name,
    };
    return axios.request('POST', `api/application/users`, `${data}`);
};

export const updateUser = (
    host: string,
    key: string,
    userId: string,
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    language: string,
    password: string,
) => {
    const axios = new Axios(host, key);
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

export const deleteUser = (host: string, key: string, userId: string) => {
    const axios = new Axios(host, key);
    return axios.request('POST', `api/application/users/${userId}`, null);
};

// also has optional parameters -- need to work on this
export const listNodes = (host: string, key: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', `api/application/nodes`, null);
};

// also has optional parameters -- need to work on this
export const nodeDetails = (host: string, key: string, nodeId: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', `api/application/nodes/${nodeId}`, null);
};

export const nodeConfiguration = (
    host: string,
    key: string,
    nodeId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/application/nodes/${nodeId}/configuration`,
        null,
    );
};

export const createNode = (
    host: string,
    key: string,
    name: string,
    location_id: number,
    fqdn: string,
    scheme: string,
    memory: number,
    memory_overallocate: number,
    disk: number,
    disk_overallocate: number,
    upload_size: number,
    daemon_sftp: number,
    daemon_listen: number,
) => {
    const axios = new Axios(host, key);
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

export const updateNode = (
    host: string,
    key: string,
    nodeId: string,
    name: string,
    description: string,
    location_id: number,
    fqdn: string,
    scheme: string,
    behind_proxy: boolean,
    maintenance_mode: boolean,
    memory: number,
    memory_overallocate: number,
    disk: number,
    disk_overallocate: number,
    upload_size: number,
    daemon_sftp: number,
    daemon_listen: number,
) => {
    const axios = new Axios(host, key);
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

export const deleteNode = (host: string, key: string, nodeId: string) => {
    const axios = new Axios(host, key);
    return axios.request('DELETE', `api/application/nodes/${nodeId}`, null);
};

// also has optional parameters -- need to work on this
export const listAllocations = (host: string, key: string, nodeId: string) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/application/nodes/${nodeId}/allocations`,
        null,
    );
};

export const createAllocations = (
    host: string,
    key: string,
    nodeId: string,
    ip: string,
    ports: Array<string>,
) => {
    const axios = new Axios(host, key);
    const data = {
        ip: ip,
        ports: ports,
    };
    return axios.request(
        'POST',
        `api/application/nodes/${nodeId}/allocations`,
        `${data}`,
    );
};

export const deleteAllocation = (
    host: string,
    key: string,
    nodeId: string,
    allocationId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'DELETE',
        `api/application/nodes/${nodeId}/allocations/${allocationId}`,
        null,
    );
};

// also has optional parameters -- need to work on this
export const listLocations = (host: string, key: string) => {
    const axios = new Axios(host, key);
    return axios.request('GET', `api/application/locations`, null);
};

// also has optional parameters -- need to work on this
export const locationDetails = (
    host: string,
    key: string,
    locationId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'GET',
        `api/application/locations/${locationId}`,
        null,
    );
};

export const createLocation = (
    host: string,
    key: string,
    short: string,
    long: string,
) => {
    const axios = new Axios(host, key);
    const data = {
        short: short,
        long: long,
    };
    return axios.request('POST', `api/application/locations`, `${data}`);
};

export const updateLocation = (
    host: string,
    key: string,
    locationId: string,
    short: string,
    long: string,
) => {
    const axios = new Axios(host, key);
    const data = {
        short: short,
        long: long,
    };
    return axios.request(
        'PATCH',
        `api/application/locations/${locationId}`,
        `${data}`,
    );
};

export const deleteLocation = (
    host: string,
    key: string,
    locationId: string,
) => {
    const axios = new Axios(host, key);
    return axios.request(
        'DELETE',
        `api/application/locations/${locationId}`,
        null,
    );
};

/* never gonna give you up */
/* never gonna let you down */
