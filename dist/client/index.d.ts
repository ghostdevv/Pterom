export default class client {
    hostUrl: string;
    apiKey: string;
    constructor(host: string, key: string);
    listServers(): Promise<unknown>;
    showPermissions(): Promise<unknown>;
    accountDetails(): Promise<unknown>;
    genarateTwoFactorQR(): Promise<unknown>;
    enableTwoFactor(code: string): Promise<unknown>;
    private errorType;
}
