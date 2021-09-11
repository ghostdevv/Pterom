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
const axios_1 = __importDefault(require("axios"));
class AxiosHandler {
    constructor(host, key) {
        this.host = host;
        this.key = key;
    }
    getHeaders() {
        return {
            Authorization: 'Bearer ' + this.key,
            'Content-Type': 'application/json',
            Accept: 'Application/vnd.pterodactyl.v1+json',
        };
    }
    trimUrl() {
        const lastChar = this.host.charAt(this.host.length - 1);
        if (lastChar !== '/') {
            this.host = this.host + '/';
        }
        return this.host;
    }
    request(method, route, data) {
        const URL = this.trimUrl() + route;
        return (0, axios_1.default)(URL, {
            headers: this.getHeaders(),
            maxRedirects: 5,
            method,
            data,
        });
    }
}
exports.default = AxiosHandler;
