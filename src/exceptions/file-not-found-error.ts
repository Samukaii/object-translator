export class FileNotFoundError extends Error {
    constructor(path: string) {
        super(`The file at path "${path}" was not found`);
    }
}

