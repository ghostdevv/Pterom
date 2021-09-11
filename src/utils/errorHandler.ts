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
import { AxiosError } from 'axios';

type ResponseStatusType = number | 'NO_RESPONSE' | '*';
function processError(
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

export function errorType(e: any) {
    throw processError(e, {
        400: () => {
            return new Error('PTEROM HTTP ERROR (400): INVALID REQUEST');
        },
        401: () => {
            return new Error('PTEROM HTTP ERROR (401): INVALID AUTHENTICATION');
        },
        403: () => {
            return new Error('PTEROM HTTP ERROR (403): FORBIDDEN REQUEST');
        },
        404: () => {
            return new Error('PTEROM HTTP (404): RESOURCE NOT FOUND');
        },
        409: () => {
            return new Error('PTEROM HTTP ERROR (409): CONFLICTED REQUEST');
        },
        500: () => {
            return new Error(
                'PTEROM HTTP ERROR (500): SERVER SIDE INTERNAL ERROR',
            );
        },
        502: () => {
            return new Error(
                'PTEROM HTTP ERROR (502): SERVER OFFLINE | BAD GATEWAY',
            );
        },
        503: () => {
            return new Error('PTEROM HTTP ERROR (503): SERVER UNAVAILABLE');
        },
        '*': () => {
            return new Error('PTEROM HTTP ERROR (*): UNKNOWN ERROR OCCURED');
        },
        NO_RESPONSE: () => {
            return new Error('PTEROM HTTP ERROR (-): NO RESPONSE FROM SERVER');
        },
    });
}
