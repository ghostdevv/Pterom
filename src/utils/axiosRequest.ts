import axios from 'axios';

export default class AxiosHandler {
    host: string;
    key: string;

    constructor(host: string, key: string) {
        this.host = host;
        this.key = key;
    }

    private getHeaders() {
        return {
            Authorization: 'Bearer ' + this.key,
            'Content-Type': 'application/json',
            Accept: 'Application/vnd.pterodactyl.v1+json',
        };
    }

    private trimUrl() {
        const lastChar = this.host.charAt(this.host.length - 1);
        if (lastChar !== '/') {
            this.host = this.host + '/';
        }

        return this.host;
    }

    public request(
        method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH',
        route: string,
        data: string | null,
    ) {
        const URL = this.trimUrl() + route;

        return axios(URL, {
            headers: this.getHeaders(),
            maxRedirects: 5,
            method,
            data,
        });
    }
}
