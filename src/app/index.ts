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
import { processError } from '../utils/utility';

export default class App {
    private axiosHandler: AxiosHandler;

    constructor(host: string, key: string) {
        this.axiosHandler = new AxiosHandler(host, key);
    }

    public async listServers() {
        return this.axiosHandler
            .request('GET', 'api/application/users')
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async userDetails(userId: string) {
        return this.axiosHandler
            .request('GET', `api/application/users/${userId}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async userDetailsExternalId(remoteId: string) {
        return this.axiosHandler
            .request('GET', `api/application/users/external/${remoteId}`)
            .then((res) => res.data)
            .catch(this.errorType);
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
            .catch(this.errorType);
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
            .catch(this.errorType);
    }

    public async deleteUser(userId: string) {
        return this.axiosHandler
            .request('DELETE', `api/application/users/${userId}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async listNodes() {
        return this.axiosHandler
            .request('GET', 'api/application/nodes')
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async nodeDetails(nodeId: string) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async nodeConfiguration(nodeId: string) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}/configuration`)
            .then((res) => res.data)
            .catch(this.errorType);
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
            .catch(this.errorType);
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
            .catch(this.errorType);
    }

    public async deleteNode(nodeId: string) {
        return this.axiosHandler
            .request('DELETE', `api/application/nodes/${nodeId}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async listAllocations(nodeId: string) {
        return this.axiosHandler
            .request('GET', `api/application/nodes/${nodeId}/allocations`)
            .then((res) => res.data)
            .catch(this.errorType);
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
            .catch(this.errorType);
    }

    public async deleteAllocation(nodeId: string, allocationId: string) {
        return this.axiosHandler
            .request(
                'DELETE',
                `api/application/nodes/${nodeId}/allocations/${allocationId}`,
            )
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async listLocations() {
        return this.axiosHandler
            .request('GET', `api/application/locations`)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async locationDetails(locationId: string) {
        return this.axiosHandler
            .request('GET', `api/application/locations/${locationId}`)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async createLocation(short: string, long: string) {
        const data = {
            short: short,
            long: long,
        };
        return this.axiosHandler
            .request('POST', 'api/application/locations', data)
            .then((res) => res.data)
            .catch(this.errorType);
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
            .catch(this.errorType);
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
            .catch(this.errorType);
    }

    private errorType(e: any) {
        throw processError(e, {
            400: () => {
                return new Error(
                    'PTEROM APP HTTP ERROR (400): The request was invalid.',
                );
            },
            401: () => {
                return new Error(
                    'PTEROM APP HTTP ERROR (401): The request did not include an authentication token or the authentication token was expired.',
                );
            },
            403: () => {
                return new Error(
                    'PTEROM APP HTTP ERROR (403): The request was forbidden as it did not have permission to access the requested resource.',
                );
            },
            404: () => {
                return new Error(
                    'PTEROM APP HTTP ERROR (404): The requested resource was not found.',
                );
            },
            409: () => {
                return new Error(
                    'PTEROM APP HTTP ERROR (409): The request could not be completed due to a conflict.',
                );
            },
            500: () => {
                return new Error(
                    'PTEROM APP HTTP ERROR (500): The request was not completed due to an internal error on the server side.',
                );
            },
            502: () => {
                return new Error(
                    'PTEROM APP HTTP ERROR (502): The server is offline or bad gateway.',
                );
            },
            503: () => {
                return new Error(
                    'PTEROM APP HTTP ERROR (503): The server was unavailable.',
                );
            },
            '*': () => {
                return new Error(
                    'PTEROM APP HTTP ERROR (*): Unknown error occured.',
                );
            },
            NO_RESPONSE: () => {
                return new Error(
                    'PTEROM APP HTTP ERROR (-): The server did not respond.',
                );
            },
        });
    }
}
