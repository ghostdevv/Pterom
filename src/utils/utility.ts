/*    
    Copyright (C) 2021  Code-sorcerers <https://github.com/Code-Sorcerers>

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
import { AxiosError } from 'axios';

type ResponseStatusType = number | 'NO_RESPONSE' | '*';
export function processError(
    e: any,
    callbacks: {
        [key in ResponseStatusType]?: (status: ResponseStatusType) => Error;
    },
): Error {
    if (e.isAxiosError) {
        const catchAllHandler = callbacks['*'];

        const axiosError = e as AxiosError;
        if (axiosError.response) {
            const status = axiosError.response.status;
            const errorCallback = callbacks[status];
            if (errorCallback) {
                return errorCallback(status);
            } else if (catchAllHandler) {
                return catchAllHandler(status);
            } else {
                return e;
            }
        } else {
            if (callbacks.NO_RESPONSE) {
                return callbacks.NO_RESPONSE('NO_RESPONSE');
            } else if (catchAllHandler) {
                return catchAllHandler('NO_RESPONSE');
            } else {
                return e;
            }
        }
    } else {
        return e;
    }
}

export function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function encode(dir: string, file?: string) {
    if (file == undefined) {
        const dirLastChar = dir.charAt(dir.length - 1);
        if (dirLastChar == '/') {
            dir = dir.slice(0, -1);
        }

        const slash = /\//gi;
        const encoded = dir.replace(slash, '%2F');

        return encoded;
    } else {
        const dirLastChar = dir.charAt(dir.length - 1);
        if (dirLastChar !== '/') {
            dir = dir + '/';
        }

        const fileDir = dir + file;
        const slash = /\//gi;
        const encoded = fileDir.replace(slash, '%2F');

        return encoded;
    }
}
