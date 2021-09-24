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
const index_1 = __importDefault(require("./client/index"));
const index_2 = __importDefault(require("./app/index"));
class Pterom {
    constructor(options) {
        const { host, clientKey, appKey } = options;
        if (!host || typeof host != 'string')
            throw new TypeError(`Expected host option to be a string, recieved ${typeof host}`);
        if (clientKey && typeof clientKey != 'string')
            throw new TypeError('clientKey option should be a string');
        if (appKey && typeof appKey != 'string')
            throw new TypeError('appKey option should be a string');
        if (!appKey && !clientKey)
            throw new Error('One of appKey or clientKey is required');
        this.app = new index_2.default(host, appKey);
        this.client = new index_1.default(host, clientKey);
    }
}
exports.default = Pterom;
