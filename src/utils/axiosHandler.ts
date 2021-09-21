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
import axios from 'axios';

export default class AxiosHandler {
    host: string;
    key?: string;

    constructor(host: string, key?: string) {
        this.host = host;
        this.key = key;
    }

    private getHeaders() {
        return {
            Authorization: 'Bearer ' + this.key,
            'Content-Type': 'application/json',
            Accept: 'Application/vnd.pterodactyl.v1+json',
        };
    }

    private trimUrl() {
        return this.host.endsWith('/') ? this.host.slice(0, -1) : this.host;
    }

    public request(
        method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
        route: string,
        data?: object | string,
    ) {
        const URL = this.trimUrl() + route;

        return axios(URL, {
            headers: this.getHeaders(),
            maxRedirects: 5,
            method,
            data,
        });
    }
}
