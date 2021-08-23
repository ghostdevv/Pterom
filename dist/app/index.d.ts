export default class App {
    private axiosHandler;
    constructor(host: string, key: string);
    listServers(): Promise<any>;
    userDetails(userId: string): Promise<any>;
    userDetailsExternalId(remoteId: string): Promise<any>;
    createUser(email: string, username: string, first_name: string, last_name: string): Promise<any>;
    updateUser(userId: string, email: string, username: string, first_name: string, last_name: string, language: string, password: string): Promise<any>;
    deleteUser(userId: string): Promise<any>;
    listNodes(): Promise<any>;
    nodeDetails(nodeId: string): Promise<any>;
    nodeConfiguration(nodeId: string): Promise<any>;
    createNode(name: string, location_id: number, fqdn: string, scheme: string, memory: number, memory_overallocate: number, disk: number, disk_overallocate: number, upload_size: number, daemon_sftp: number, daemon_listen: number): Promise<any>;
    updateNode(nodeId: string, name: string, description: string, location_id: number, fqdn: string, scheme: string, behind_proxy: boolean, maintenance_mode: boolean, memory: number, memory_overallocate: number, disk: number, disk_overallocate: number, upload_size: number, daemon_sftp: number, daemon_listen: number): Promise<any>;
    deleteNode(nodeId: string): Promise<any>;
    listAllocations(nodeId: string): Promise<any>;
    private errorType;
}
