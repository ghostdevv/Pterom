declare type ResponseStatusType = number | 'NO_RESPONSE' | '*';
export declare function processError(e: any, callbacks: {
    [key in ResponseStatusType]?: (status: ResponseStatusType) => Error;
}): Error;
export declare function formatBytes(bytes: number, decimals?: number): string;
export declare function encode(dir: string, file?: string): string;
export {};
