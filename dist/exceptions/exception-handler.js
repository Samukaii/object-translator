import { loadingBar } from "../core/loading-bar.js";
export var exceptionHandler = function (error) {
    console.log('');
    loadingBar().fail(" ".concat(error.name, ": ").concat(error.message).red);
    console.log('');
};
//# sourceMappingURL=exception-handler.js.map