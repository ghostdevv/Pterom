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
import AxiosHandler from '../utils/axiosHandler';
import { errorType } from '../utils/errorHandler';

export default class App {
    private axiosHandler: AxiosHandler;

    constructor(host: string, key: string) {
        this.axiosHandler = new AxiosHandler(host, key);
    }

    public async listUsers(): Promise<object> {
        return this.axiosHandler
            .request('GET', 'api/application/users')
            .then((res) => res.data)
            .catch(errorType);
    }

    // userdetails via id and external id together
    public async userDetails(
        id: string,
        useExternalId?: boolean,
    ): Promise<object> {
        return this.axiosHandler
            .request(
                'GET',
                `api/application/users/${
                    useExternalId ? `external/${id}` : `${id}`
                }`,
            )
            .then((res) => res.data)
            .catch(errorType);
    }

    public async createUser(
        email: string,
        username: string,
        first_name: string,
        last_name: string,
    ) {
        const data = {
            email: email,
            username: username,
            first_name: first_name,
            last_name: last_name,
        };
        return this.axiosHandler
            .request('POST', 'api/application/users', data)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async updateUser(
        userId: string,
        email: string,
        username: string,
        first_name: string,
        last_name: string,
        language: string,
        password: string,
    ) {
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
            .catch(errorType);
    }

    public async deleteUser(userId: string) {
        return this.axiosHandler
            .request('DELETE', `api/application/users/${userId}`)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async listNodes() {
        return this.axiosHandler
            .request('GET', 'api/application/nodes')
            .then((res) => res.data)
            .catch(errorType);
    }

    public async nodeDetails(nodeId: string) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}`)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async nodeConfiguration(nodeId: string) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}/configuration`)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async createNode(
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
    ) {
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
            .catch(errorType);
    }

    public async updateNode(
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
    ) {
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
            .catch(errorType);
    }

    public async deleteNode(nodeId: string) {
        return this.axiosHandler
            .request('DELETE', `api/application/nodes/${nodeId}`)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async listAllocations(nodeId: string) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}/allocations`)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async createAllocation(
        nodeId: string,
        ip: string,
        ports: Array<string>,
    ) {
        const data = {
            ip: ip,
            ports: ports,
        };
        return this.axiosHandler
            .request(
                'POST',
                `api/application/nodes/${nodeId}/allocations`,
                data,
            )
            .then((res) => res.data)
            .catch(errorType);
    }

    public async deleteAllocation(nodeId: string, allocationId: string) {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/application/nodes/${nodeId}/allocations/${allocationId}`,
            )
            .then((res) => res.data)
            .catch(errorType);
    }

    public async listLocations() {
        return this.axiosHandler
            .request('GET', `api/application/locations`)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async locationDetails(locationId: string) {
        return this.axiosHandler
            .request('GET', `api/application/locations/${locationId}`)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async createLocation(short: string, long: string) {
        const data = {
            short: short,
            long: long,
        };
        return this.axiosHandler
            .request('POST', 'api/application/locations', data)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async updateLocation(
        locationId: string,
        short: string,
        long: string,
    ) {
        const data = {
            short: short,
            long: long,
        };
        return this.axiosHandler
            .request('PATCH', `api/application/locations/${locationId}`, data)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async deleteLocation(
        locationId: string,
        short: string,
        long: string,
    ) {
        const data = {
            short: short,
            long: long,
        };
        return this.axiosHandler
            .request('DELETE', `api/application/locations/${locationId}`, data)
            .then((res) => res.data)
            .catch(errorType);
    }

    public async listServers() {
        return this.axiosHandler
            .request('GET', `api/application/servers`)
            .then((res) => res.data)
            .catch(errorType);
    }

    // server detils via id and external id
    public async serverDetails(id: string, useExternalId?: boolean) {
        return this.axiosHandler
            .request(
                'GET',
                `api/application/servers/${
                    useExternalId ? `external/${id}` : `${id}`
                }`,
            )
            .then((res) => res.data)
            .catch(errorType);
    }

    public async updateDetails(
        serverId: string,
        name: string,
        user: string,
        externalId?: string,
        description?: string,
    ) {
        const data = {
            name: name,
            user: user,
            external_id: externalId,
            description: description,
        };
        return this.axiosHandler
            .request(
                'PATCH',
                `api/application/servers/${serverId}/details`,
                data,
            )
            .then((res) => res.data)
            .catch(errorType);
    }
}
