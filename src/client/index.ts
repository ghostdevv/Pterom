export default class NodeactylClient {
    hostUrl: string;
    apiKey: string;

    constructor(host: string, key: string) {
        this.hostUrl = host;
        this.apiKey = key;
    }
}
