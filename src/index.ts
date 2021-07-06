export default class Pterom {
    packMode: 'CLIENT' | 'APP';
    hostUrl: string;
    apiKey: string;

    constructor(mode: 'CLIENT' | 'APP', host: string, key: string) {
        this.hostUrl = host;
        this.apiKey = key;
        this.packMode = mode;
    }
}
