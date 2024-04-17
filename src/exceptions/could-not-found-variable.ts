export class CouldNotFoundVariable extends Error {
    constructor(variableName: string, path: string) {
        super(`Could not found "${variableName}" variable at ${path} file`);
    }
}

