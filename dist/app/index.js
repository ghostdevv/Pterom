"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
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
const axiosRequest_1 = __importDefault(require("../utils/axiosRequest"));
const utility_1 = require("../utils/utility");
class App {
    constructor(host, key) {
        this.axiosHandler = new axiosRequest_1.default(host, key);
    }
    async listServers() {
        return this.axiosHandler
            .request('GET', 'api/application/users', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async userDetails(userId) {
        return this.axiosHandler
            .request('GET', `api/application/users/${userId}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async userDetailsExternalId(remoteId) {
        return this.axiosHandler
            .request('GET', `api/application/users/external/${remoteId}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async createUser(email, username, first_name, last_name) {
        const data = {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
        };
        return this.axiosHandler
            .request('POST', 'api/application/users', `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async updateUser(userId, email, username, first_name, last_name, language, password) {
        const data = {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
            language: language,
            password: password,
        };
        return this.axiosHandler
            .request('PATCH', `api/application/users/${userId}`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async deleteUser(userId) {
        return this.axiosHandler
            .request('DELETE', `api/application/users/${userId}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async listNodes() {
        return this.axiosHandler
            .request('GET', 'api/application/nodes', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async nodeDetails(nodeId) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async nodeConfiguration(nodeId) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}/configuration`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async createNode(name, location_id, fqdn, scheme, memory, memory_overallocate, disk, disk_overallocate, upload_size, daemon_sftp, daemon_listen) {
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
        return this.axiosHandler
            .request('POST', 'api/application/nodes', `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async updateNode(nodeId, name, description, location_id, fqdn, scheme, behind_proxy, maintenance_mode, memory, memory_overallocate, disk, disk_overallocate, upload_size, daemon_sftp, daemon_listen) {
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
        return this.axiosHandler
            .request('PATCH', `api/application/nodes/${nodeId}`, `${data}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async deleteNode(nodeId) {
        return this.axiosHandler
            .request('DELETE', `api/application/nodes/${nodeId}`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    async listAllocations(nodeId) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}/allocations`, null)
            .then((res) => res.data)
            .catch(this.errorType);
    }
    errorType(e) {
        throw utility_1.processError(e, {
            400: () => {
                return new Error('PTEROM APP HTTP ERROR (400): The request was invalid.');
            },
            401: () => {
                return new Error('PTEROM APP HTTP ERROR (401): The request did not include an authentication token or the authentication token was expired.');
            },
            403: () => {
                return new Error('PTEROM APP HTTP ERROR (403): The request was forbidden as it did not have permission to access the requested resource.');
            },
            404: () => {
                return new Error('PTEROM APP HTTP ERROR (404): The requested resource was not found.');
            },
            409: () => {
                return new Error('PTEROM APP HTTP ERROR (409): The request could not be completed due to a conflict.');
            },
            500: () => {
                return new Error('PTEROM APP HTTP ERROR (500): The request was not completed due to an internal error on the server side.');
            },
            502: () => {
                return new Error('PTEROM APP HTTP ERROR (502): The server is offline or bad gateway.');
            },
            503: () => {
                return new Error('PTEROM APP HTTP ERROR (503): The server was unavailable.');
            },
            '*': () => {
                return new Error('PTEROM APP HTTP ERROR (*): Unknown error occured.');
            },
            NO_RESPONSE: () => {
                return new Error('PTEROM APP HTTP ERROR (-): The server did not respond.');
            },
        });
    }
}
exports.default = App;
