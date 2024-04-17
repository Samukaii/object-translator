"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exceptionHandler = void 0;
const loading_bar_1 = require("../core/loading-bar");
const exceptionHandler = (error) => {
    (0, loading_bar_1.loadingBar)().fail(` ${error.name}: ${error.message}`.red);
};
exports.exceptionHandler = exceptionHandler;
//# sourceMappingURL=exception-handler.js.map