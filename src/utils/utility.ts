export function formatBytes(bytes: number, decimals = 2) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function encode(dir: string, file?: string) {
    if (file == undefined) {
        const dirLastChar = dir.charAt(dir.length - 1);
        if (dirLastChar == '/') {
            dir = dir.slice(0, -1);
        }

        const slash = /\//gi;
        const encoded = dir.replace(slash, '%2F');

        return encoded;
    } else {
        const dirLastChar = dir.charAt(dir.length - 1);
        if (dirLastChar !== '/') {
            dir = dir + '/';
        }

        const fileDir = dir + file;
        const slash = /\//gi;
        const encoded = fileDir.replace(slash, '%2F');

        return encoded;
    }
}
