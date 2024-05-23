#! /usr/bin/env node

import {CreateTranslationArgs} from "./models/create-translation-args.js";
import 'colors';
import {exceptionHandler} from "./exceptions/exception-handler.js";
import {loadingBar} from "./core/loading-bar.js";
import figlet from 'figlet';
import {Command} from "commander";
import {createTranslations} from "./commands/create-translations.js";
import {setupApplication} from "./commands/setup-application.js";
import {addTranslation} from "./commands/add-translation.js";

const program = new Command();

console.log(figlet.textSync("Translator").blue);

const bootstrap = async () => {
    const args: CreateTranslationArgs = {
        file: process.argv[2],
    };

    if (!args.file) program.outputHelp();
    else await createTranslations(args);
}

program
    .version("1.0.0")
    .description("An utility cli to translating objects")
    .action(() => bootstrap()
        .catch((error: Error) => exceptionHandler(error))
        .finally(() => loadingBar().stop())
    )

program.command('config')
    .description('Setup the aplication')
    .action(() => setupApplication());

program.command('creator')
    .description('Open a translation creator')
    .action(() => addTranslation());

program.parse(process.argv);