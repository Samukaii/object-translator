#! /usr/bin/env node
import {startApplication} from "./app";
import minimist from 'minimist';
import {ApplicationConfig} from "./models/application-config";
import 'colors';
import {exceptionHandler} from "./exceptions/exception-handler";
import {NoPathProvidedError} from "./exceptions/no-path-provided-error";
import {loadingBar} from "./core/loading-bar";
import config from "./config.json";
import figlet from 'figlet';
import { Command } from "commander";
const argHandler = minimist(process.argv.slice(2));

const program = new Command();

const joinItems = (items: string[]) => {
    const last = items.pop();

    return `${items.join(", ")}${last ? ' and ' + last: ''}`;
}

const sourceLanguage = config.sourceLanguage.label;
const languages = joinItems(config.languages.map(language => language.label));

console.log(figlet.textSync("Translator").cyan);

program
    .version("1.0.0")
    .description("An utility cli to translating objects")
    .parse(process.argv);


const message = `Translating ${sourceLanguage} to ${languages}`.blue;

loadingBar().start(message);

const args: ApplicationConfig = {
    file: argHandler._[0],
};

const bootstrap = async () => {
    if(!args.file) program.outputHelp();
    else await startApplication(args);
}

bootstrap()
    .catch((error: Error) => exceptionHandler(error))
    .finally(() => loadingBar().stop())
