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
    constructor(options: PteromOptions);
}
export {};
