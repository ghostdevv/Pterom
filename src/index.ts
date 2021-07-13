import Client from "./client";
import App from "./app";

export default class Ptero {
    client: Client;
    app: App;
    constructor(host: string, key: string) {
        this.client = new Client(host, key);
        this.app = new App(host, key);
      }
}