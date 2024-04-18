import { loadingBar } from "../core/loading-bar.js";
export var exceptionHandler = function (error) {
    loadingBar().fail(" ".concat(error.name, ": ").concat(error.message).red);
};
//# sourceMappingURL=exception-handler.js.map