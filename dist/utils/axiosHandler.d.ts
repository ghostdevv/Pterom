export default class AxiosHandler {
    host: string;
    key: string;
    constructor(host: string, key: string);
    private getHeaders;
    private trimUrl;
    request(method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'PATCH', route: string, data?: object | string): import("axios").AxiosPromise<any>;
}
