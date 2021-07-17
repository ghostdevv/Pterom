import AxiosHandler from '../utils/axiosRequest';
export default class Client {
    host: string;
    Key: string;
    axiosHandler: AxiosHandler;
    constructor(host: string, key: string);
    listServers(): Promise<any>;
    showPermissions(): Promise<any>;
    accountDetails(): Promise<any>;
    genarateTwoFactorQR(): Promise<any>;
    enableTwoFactor(code: string): Promise<any>;
    disableTwoFactor(password: string): Promise<any>;
    updateEmail(newEmail: string, password: string): Promise<any>;
    updatePassword(currentPassword: string, newPassword: string, confirmNewPassword: string): Promise<any>;
    private errorType;
}
