export class CouldNotTranslateError extends Error {
    constructor(error: Error) {
        super(error.message);
        this.name = `Something went wrong with while translating`;
    }
}