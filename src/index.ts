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
import Client from './client/index';
import App from './app/index';

interface PteromOptions {
    host: string;
    clientKey?: string;
    appKey?: string;
}

export default class Pterom {
    client: Client;
    app: App;
    constructor(options: PteromOptions) {
        const { host, clientKey, appKey } = options;

        if (!host || typeof host != 'string')
            throw new TypeError(
                `Expected host option to be a string, recieved ${typeof host}`,
            );

        if (clientKey && typeof clientKey != 'string')
            throw new TypeError('clientKey option should be a string');
        if (appKey && typeof appKey != 'string')
            throw new TypeError('appKey option should be a string');

        if (!appKey && !clientKey)
            throw new Error('One of appKey or clientKey is required');

        this.app = new App(host, appKey);
        this.client = new Client(host, clientKey);
    }
}
