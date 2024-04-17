"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileNotFoundError = void 0;
class FileNotFoundError extends Error {
    constructor(path) {
        super(`The file at path "${path}" was not found`);
    }
}
exports.FileNotFoundError = FileNotFoundError;
//# sourceMappingURL=file-not-found-error.js.map