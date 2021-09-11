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
const axiosHandler_1 = __importDefault(require("../utils/axiosHandler"));
const errorHandler_1 = require("../utils/errorHandler");
class App {
    constructor(host, key) {
        this.axiosHandler = new axiosHandler_1.default(host, key);
    }
    async listUsers() {
        return this.axiosHandler
            .request('GET', 'api/application/users')
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    // userdetails via id and external id together
    async userDetails(id, useExternalId) {
        return this.axiosHandler
            .request('GET', `api/application/users/${useExternalId ? `external/${id}` : `${id}`}`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async createUser(email, username, first_name, last_name) {
        const data = {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
        };
        return this.axiosHandler
            .request('POST', 'api/application/users', data)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
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
            .request('PATCH', `api/application/users/${userId}`, data)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async deleteUser(userId) {
        return this.axiosHandler
            .request('DELETE', `api/application/users/${userId}`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async listNodes() {
        return this.axiosHandler
            .request('GET', 'api/application/nodes')
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async nodeDetails(nodeId) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async nodeConfiguration(nodeId) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}/configuration`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
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
            .request('POST', 'api/application/nodes', data)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
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
            .request('PATCH', `api/application/nodes/${nodeId}`, data)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async deleteNode(nodeId) {
        return this.axiosHandler
            .request('DELETE', `api/application/nodes/${nodeId}`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async listAllocations(nodeId) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}/allocations`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async createAllocation(nodeId, ip, ports) {
        const data = {
            ip: ip,
            ports: ports,
        };
        return this.axiosHandler
            .request('POST', `api/application/nodes/${nodeId}/allocations`, data)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async deleteAllocation(nodeId, allocationId) {
        return this.axiosHandler
            .request('DELETE', `api/application/nodes/${nodeId}/allocations/${allocationId}`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async listLocations() {
        return this.axiosHandler
            .request('GET', `api/application/locations`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async locationDetails(locationId) {
        return this.axiosHandler
            .request('GET', `api/application/locations/${locationId}`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async createLocation(short, long) {
        const data = {
            short: short,
            long: long,
        };
        return this.axiosHandler
            .request('POST', 'api/application/locations', data)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async updateLocation(locationId, short, long) {
        const data = {
            short: short,
            long: long,
        };
        return this.axiosHandler
            .request('PATCH', `api/application/locations/${locationId}`, data)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async deleteLocation(locationId, short, long) {
        const data = {
            short: short,
            long: long,
        };
        return this.axiosHandler
            .request('DELETE', `api/application/locations/${locationId}`, data)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async listServers() {
        return this.axiosHandler
            .request('GET', `api/application/servers`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    // server detils via id and external id
    async serverDetails(id, useExternalId) {
        return this.axiosHandler
            .request('GET', `api/application/servers/${useExternalId ? `external/${id}` : `${id}`}`)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
    async updateDetails(serverId, name, user, externalId, description) {
        const data = {
            name: name,
            user: user,
            external_id: externalId,
            description: description,
        };
        return this.axiosHandler
            .request('PATCH', `api/application/servers/${serverId}/details`, data)
            .then((res) => res.data)
            .catch(errorHandler_1.errorType);
    }
}
exports.default = App;
