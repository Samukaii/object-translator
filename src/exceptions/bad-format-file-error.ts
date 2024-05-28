export class BadFormatFileError extends Error {
    constructor(path: string) {
        super(`The structure of file "${path}" is not an acceptable format wich usually can cause bad ` +
        `parsing issues`);
    }
}

