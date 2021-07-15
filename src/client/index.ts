import AxiosHandler from '../utils/axiosRequest';
import { processError } from '../utils/utility';

export default class Client {
    host: string;
    Key: string;
    axiosHandler: AxiosHandler;

    constructor(host: string, key: string) {
        this.host = host;
        this.Key = key;
        this.axiosHandler = new AxiosHandler(host, key);
    }

    public async listServers(): Promise<any> {
        return this.axiosHandler
            .request('GET', 'api/client', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    public async showPermissions(): Promise<any> {
        return this.axiosHandler
            .request('GET', 'api/client/permissions', null)
            .then((res) => res.data)
            .catch(this.errorType);
    }

    private errorType(e: any) {
        throw processError(e, {
            400: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (400): The request was invalid.',
                );
            },
            401: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (401): The request did not include an authentication token or the authentication token was expired.',
                );
            },
            403: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (403): The request was forbidden as it did not have permission to access the requested resource.',
                );
            },
            404: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (404): The requested resource was not found.',
                );
            },
            409: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (409): The request could not be completed due to a conflict.',
                );
            },
            500: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (500): The request was not completed due to an internal error on the server side.',
                );
            },
            503: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (503): The server was unavailable.',
                );
            },
            '*': () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (*): Unknown error occured.',
                );
            },
            NO_RESPONSE: () => {
                return new Error(
                    'PTEROM CLIENT HTTP ERROR (-): The server did not respond.',
                );
            },
        });
    }
}
