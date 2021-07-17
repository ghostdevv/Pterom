"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = __importDefault(require("./client"));
const app_1 = __importDefault(require("./app"));
class Pterom {
    constructor(host, key) {
        this.client = new client_1.default(host, key);
        this.app = new app_1.default(host, key);
    }
}
exports.default = Pterom;
