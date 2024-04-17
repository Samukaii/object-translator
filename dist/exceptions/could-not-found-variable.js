"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouldNotFoundVariable = void 0;
class CouldNotFoundVariable extends Error {
    constructor(variableName, path) {
        super(`Could not found "${variableName}" variable at ${path} file`);
    }
}
exports.CouldNotFoundVariable = CouldNotFoundVariable;
//# sourceMappingURL=could-not-found-variable.js.map