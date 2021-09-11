export default class Client {
    private axiosHandler;
    constructor(host: string, key: string);
    /**
     * Lists all servers
     *
     * @param {boolean | undefined} [eggInfo=false] Includes infomation about the egg the servers use.
     * @param {boolean | undefined} [subusers=false] Includes a list of subusers on the servers.
     *
     * @returns {Promise<object>} Returns a object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .listServers()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    listServers(eggInfo?: boolean, subusers?: boolean): Promise<object>;
    /**
     * Retries all available permissions
     *
     * @returns {Promise<object>} Returns a object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .showPermissions()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    showPermissions(): Promise<object>;
    /**
     * Retrieves information about the account
     *
     * @returns {Promise<object>} Returns a object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .accountDetails()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    accountDetails(): Promise<object>;
    /**
     * Generates a TOTP QR code image to allow the setup of 2FA
     *
     * @returns {Promise<object>} Returns a object promise.
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .genarateTwoFactorQR()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    genarateTwoFactorQR(): Promise<object>;
    /**
     * Enables TOTP 2FA
     *
     * @param {string} code Use code from genarateTwoFactorQR().
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .enableTwoFactor('CODE_FROM_genarateTwoFactorQR()')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    enableTwoFactor(code: string): Promise<object>;
    /**
     * Disables TOTP 2FA on the account
     *
     * @param {string} password -------------
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .disableTwoFactor('ACCOUNT_PASSWORD')
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    disableTwoFactor(password: string): Promise<boolean | void>;
    /**
     * Updates the email address of the account
     *
     * @param {string} newEmail ------
     * @param {string} password ------
     *
     * @returns {Promise<boolean | void>} Returns either a boolean or void promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .updateEmail('ACCOUNT_NEW_EMAIL', 'ACCOUNT_PASSWORD')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    updateEmail(newEmail: string, password: string): Promise<boolean | void>;
    /**
     * Updates the password of the account
     *
     * @param {string} currentPassword ------
     * @param {string} newPassword ------
     * @param {string} confirmNewPassword ------
     *
     * @returns {Promise<boolean | void>} Returns either a boolean or void promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .updatePassword('ACCOUNT_CURRENT_PASSWORD', 'ACCOUNT_NEW_PASSWORD', 'CONFIRM_ACCOUNT_NEW_PASSWORD')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    updatePassword(currentPassword: string, newPassword: string, confirmNewPassword: string): Promise<boolean | void>;
    /**
     * Retrieves a list of API keys
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .listApiKeys()
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    listApiKeys(): Promise<object>;
    /**
     * Generates a new API key
     *
     * @param {string} description ------
     * @param {Array<string>} ips ------
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .createApiKey('API_KEY_DESCRIPTION', [API_KEY_IPS])
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    createApiKey(description: string, ips?: Array<string>): Promise<object>;
    /**
     * Deletes the specified API key
     *
     * @param {string} identifier ------
     *
     * @returns {Promise<boolean | void>} Returns either a boolean or void promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .deleteApiKey('API_KEY_IDENTIFIER')
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    deleteApiKey(identifier: string): Promise<boolean | void>;
    /**
     * Retrieves information about the specified server
     *
    public async serverDetails(
        serverId: string,
        eggInfo?: boolean,
        subusers?: boolean,
    ): Promise<object> {
        return this.axiosHandler
            .request(
                'GET',
                `api/client/servers/${serverId}` + (eggInfo || subusers)
                    ? `?include=${eggInfo ? 'egg' : ''}${
                          eggInfo && subusers ? ',' : ''
                      }${subusers ? 'subusers' : ''}`
                    : '',
            )
            .then((res) => res.data.attributes)
            .catch(errorType);
    }
    /*
        Websocket when implimented will go here. This is not a piority as it is not needed as much
    */
    /**
     * Retrieves resource utilization of the specified server
     *
     * @param {string} serverId ------
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .resourceUsage('SERVER_ID')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    resourceUsage(serverId: string): Promise<object>;
    /**
     * Sends a command to the server
     *
     * The server must be online to send a command to it. You will get HTTP 502 is the server if not online.
     *
     * @param {string} serverId ------
     * @param {string} command ------
     *
     * @returns {Promise<boolean | void>} Returns either a boolean or void promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .sendCommand('SERVER_ID', 'COMMAND')
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    sendCommand(serverId: string, command: string): Promise<boolean | void>;
    /**
     * Sends a power signal to the server
     *
     * @param {string} serverId ------
     * @param {'start' | 'stop' | 'restart' | 'kill'} state ------
     *
     * @returns {Promise<boolean | void>} Returns either a boolean or void promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .changePowerState('SERVER_ID', 'STATE')
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    changePowerState(serverId: string, state: 'start' | 'stop' | 'restart' | 'kill'): Promise<boolean | void>;
    /**
     * Lists all databases on a server
     *
     * @param {string} serverId ------
     * @param {string} includePassword ------
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .listDatabases('SERVER_ID', 'INCLUDE_PASSWORD')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    listDatabases(serverId: string, includePassword?: string): Promise<object>;
    /**
     * Creates a new database
     *
     * @param {string} serverId ------
     * @param {string} newDatabaseName ------
     * @param {string} remote -----
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .createDatabase('SERVER_ID', 'NEW_DATABASE_NAME', 'REMOTE')
     * .then((res) => console.log(res))
     * .catch((e) => console.log(e));
     */
    createDatabase(serverId: string, newDatabaseName: string, remote: string): Promise<object>;
    /**
     * Changes the password of a specified database
     *
     * @param {string} serverId ------
     * @param {string} databaseId ------
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .rotateDatabasePassword('SERVER_ID', 'DATABASE_ID')
     * .then(() => console.log(res))
     * .catch((e) => console.log(e));
     */
    rotateDatabasePassword(serverId: string, databaseId: string): Promise<object>;
    /**
     * Deletes the specified database
     *
     * @param {string} serverId ------
     * @param {string} databaseId ------
     *
     * @returns {Promise<boolean | void>} Returns either a boolean or void promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .deleteDatabase('SERVER_ID', 'DATABASE_ID')
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    deleteDatabase(serverId: string, databaseId: string): Promise<boolean | void>;
    /**
     * Lists all files within a folder
     *
     * @param {string} serverId ------
     * @param {string} dir ------
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .listFiles('SERVER_ID', 'DIR')
     * .then(() => console.log(res))
     * .catch((e) => console.log(e));
     */
    listFiles(serverId: string, dir: string): Promise<object>;
    /**
     * Displays the contents of the specified file
     *
     * @param {string} serverId ------
     * @param {string} dir ------
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .getFileContent('SERVER_ID', 'DIR')
     * .then(() => console.log(res))
     * .catch((e) => console.log(e));
     */
    getFileContent(serverId: string, dir: string): Promise<object>;
    /**
     * Generates a one-time link to download the specified file
     *
     * @param {string} serverId ------
     * @param {string} dir ------
     *
     * @returns {Promise<object>} Returns a object promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .downloadFile('SERVER_ID', 'DIR')
     * .then(() => console.log(res))
     * .catch((e) => console.log(e));
     */
    downloadFile(serverId: string, dir: string): Promise<object>;
    /**
     * Renames the specified file
     *
     * @param {string} serverId ------
     * @param {string} root ------
     * @param {string} fileName ------
     * @param {string} newFileName ------
     *
     * @returns {Promise<boolean | void>} Returns either a boolean or void promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .renameFile('SERVER_ID', 'ROOT', 'FILE_NAME', 'NEW_FILE_NAME')
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    renameFile(serverId: string, root: string, fileName: string, newFileName: string): Promise<boolean | void>;
    /**
     * Copies the specified file
     *
     * @param {string} serverId ------
     * @param {string} location ------
     *
     * @returns {Promise<boolean | void>} Returns either a boolean or void promise
     *
     * @example
     * //ESM
     * import Pterom from 'pterom';
     * //CJS
     * const Pterom = require('pterom')
     *
     * const pterom = new Pterom('HOST', 'API_KEY');
     * pterom.client
     * .copyFile('SERVER_ID', 'STATE')
     * .then(() => {
     *      if (true) {
     *      return console.log('done');
     *   }
     * })
     * .catch((e) => console.log(e));
     */
    copyFile(serverId: string, location: string): Promise<boolean | void>;
    /**
     * Writes data to the specified file
     */
    writeFile(serverId: string, dir: string, rawData: string): Promise<boolean | void>;
    /**
     * Compresses the specified file
     */
    compressFiles(serverId: string, root: string, fileName: Array<string>): Promise<object>;
    /**
     * Decompresses the selected file
     */
    decompressFile(serverId: string, root: string, fileName: string): Promise<boolean | void>;
    /**
     * Deletes the specified file(s)
     */
    deleteFile(serverId: string, root: string, fileName: Array<string>): Promise<boolean | void>;
    /**
     * Creates the specified folder in the specified directory
     */
    createFolder(serverId: string, root: string, folderName: string): Promise<boolean | void>;
    /**
     * Returns a signed URL used to upload files to the server using POST request
     *
     * POST request to upload folder is not handled via this library
     */
    uploadFolder(serverId: string): Promise<object>;
    /**
     * Lists all schedules added to the server
     */
    listSchedules(serverId: string): Promise<object>;
    /**
     * Creates a new schedule
     */
    createSchedules(serverId: string, name: string, minute: string, hour: string, dayOfWeek: string, dayOfMonth: string, active?: boolean): Promise<object>;
    /**
     * Retrieves specific schedule
     */
    scheduleDetails(serverId: string, scheduleId: string): Promise<object>;
    /**
     * Updates the specified schedule
     */
    updateSchedule(serverId: string, scheduleId: string, name: string, minute: string, hour: string, dayOfWeek: string, dayOfMonth: string, active?: boolean): Promise<object>;
    /**
     * Deletes the specified schedule
     */
    deleteSchedule(serverId: string, scheduleId: string): Promise<boolean | void>;
    /**
     * Creates a new task on the specified schedule
     */
    createTask(serverId: string, scheduleId: string, action: string, payload: string, timeOffSet: string): Promise<object>;
    /**
     * Updates the specified task
     */
    updateTask(serverId: string, taskId: string, scheduleId: string, action: string, payload: string, timeOffSet: string): Promise<object>;
    /**
     * Deletes the specified task
     */
    deleteTask(serverId: string, scheduleId: string, taskId: string): Promise<boolean | void>;
    /**
     * Retrieves the network information for the specified server
     */
    listAllocations(serverId: string): Promise<object>;
    /**
     * Automatically assigns a new allocation if auto-assign is enabled on the instance
     */
    assignAllocation(serverId: string): Promise<object>;
    /**
     * Sets a note for the allocation
     */
    setAllocationNote(serverId: string, allocationId: string, notes: string): Promise<object>;
    /**
     * Sets the primary allocation
     */
    setPrimaryAllocation(serverId: string, allocationId: string): Promise<object>;
    /**
     * Deletes the specified non-primary allocation
     */
    unassignAllocation(serverId: string, allocationId: string): Promise<boolean | void>;
    /**
     * Lists all users added to the server, along with details about them and their permissions
     */
    listUsers(serverId: string): Promise<object>;
    /**
     * Adds a user to the server
     */
    createUser(serverId: string, email: string, permissions: Array<string>): Promise<object>;
    /**
     * Retrieves information about a specific user
     */
    userDetails(serverId: string, userId: string): Promise<object>;
    /**
     * Updates the specified user
     */
    updateUser(serverId: string, userId: string, permissions: string): Promise<object>;
    /**
     * Removes the specified user from the server
     */
    deleteUser(serverId: string, userId: string): Promise<boolean | void>;
    /**
     * Retrieves a list of backups
     */
    listBackups(serverId: string): Promise<object>;
    /**
     * Creates a new backup
     */
    createBackup(serverId: string): Promise<object>;
    /**
     * Retrieves information about the specified backup
     */
    backupDetails(serverId: string, backupId: string): Promise<object>;
    /**
     * Generates a download link for a backup
     */
    downloadBackup(serverId: string, backupId: string): Promise<object>;
    /**
     * Deletes the specified backup
     */
    deleteBackup(serverId: string, backupId: string): Promise<boolean>;
    /**
     * Lists all variables on the server
     */
    listVariables(serverId: string): Promise<object>;
    /**
     * Updates the specified variable
     */
    updateVariable(serverId: string, key: string, value: string): Promise<object>;
    /**
     * Renames the specified server
     */
    renameServer(serverId: string, name: string): Promise<boolean | void>;
    /**
     * Reinstall the specified server
     */
    reinstallServer(serverId: string): Promise<boolean | void>;
}
