import {loadingBar} from "../core/loading-bar.js";

export const exceptionHandler = (error: Error) => {
    console.log('');
    loadingBar().fail(` ${error.name}: ${error.message}`.red);
    console.log('');
}

