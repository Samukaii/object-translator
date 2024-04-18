import {loadingBar} from "../core/loading-bar.js";

export const exceptionHandler = (error: Error) => {
    loadingBar().fail(` ${error.name}: ${error.message}`.red);
}

