export class CouldNotMoveOrRenameFileError extends Error {
    constructor(sourceFile: string, targetFile: string, error: Error) {
        super(`Some problem occurred while move or rename ${sourceFile} to ${targetFile}: \n ${error.message}`);
    }
}

