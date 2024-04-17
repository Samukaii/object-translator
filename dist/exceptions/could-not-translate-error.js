"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CouldNotTranslateError = void 0;
class CouldNotTranslateError extends Error {
    constructor(error) {
        super(error.message);
        this.name = `Something went wrong with while translating`;
    }
}
exports.CouldNotTranslateError = CouldNotTranslateError;
//# sourceMappingURL=could-not-translate-error.js.map