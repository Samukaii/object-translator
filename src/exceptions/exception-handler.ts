import {loadingBar} from "../core/loading-bar.js";
import {NoConfigFoundError} from "./no-config-found-error.js";
import {setupApplication} from "../commands/setup-application.js";

export const exceptionHandler = async (error: Error) => {
    if(error instanceof NoConfigFoundError) {
        await setupApplication();
        return;
    }

    console.log('');
    loadingBar().fail(` ${error.name}: ${error.message}`.red);
    console.log('');
}

