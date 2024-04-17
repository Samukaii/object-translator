import {startApplication} from "./app";
import minimist from 'minimist';
import {ApplicationConfig} from "./models/application-config";
import 'colors';
import {exceptionHandler} from "./exceptions/exception-handler";
import {NoPathProvidedError} from "./exceptions/no-path-provided-error";
import {loadingBar} from "./core/loading-bar";
import config from "./config.json";

const argHandler = minimist(process.argv.slice(2));

const joinItems = (items: string[]) => {
    const last = items.pop();

    return `${items.join(", ")}${last ? ' and ' + last: ''}`;
}

const sourceLanguage = config.sourceLanguage.label;
const languages = joinItems(config.languages.map(language => language.label));

const message = `Translating ${sourceLanguage} to ${languages}`.blue;

loadingBar().start(message);

const args: ApplicationConfig = {
    file: argHandler._[0],
};

const bootstrap = async () => {
    if (!args.file) throw new NoPathProvidedError();
    await startApplication(args);
}

bootstrap()
    .catch((error: Error) => exceptionHandler(error))
    .finally(() => loadingBar().stop())
