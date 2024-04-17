import {loadingBar} from "../core/loading-bar";

export const exceptionHandler = (error: Error) => {
    loadingBar().fail(` ${error.name}: ${error.message}`.red);
}

