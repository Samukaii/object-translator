#! /usr/bin/env node
import {CreateTranslationArgs} from "./models/create-translation-args";
import 'colors';
import {exceptionHandler} from "./exceptions/exception-handler";
import {loadingBar} from "./core/loading-bar";
import figlet from 'figlet';
import {Command} from "commander";
import {createTranslations} from "./commands/create-translations";
import {setupApplication} from "./commands/setup-application";

const program = new Command();

console.log(figlet.textSync("Translator").cyan);

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
    .description('Config the cli')
    .action(() => setupApplication());

program.parse(process.argv);