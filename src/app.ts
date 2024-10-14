#! /usr/bin/env node

import 'colors';
import {exceptionHandler} from "./exceptions/exception-handler.js";
import {loadingBar} from "./core/loading-bar.js";
import figlet from 'figlet';
import {Command} from "commander";
import {translationCreator} from "./commands/translation-creator.js";
import {setupApplication} from "./commands/setup-application.js";
import {translationEditor} from "./commands/translation-editor.js";
import inquirer from "inquirer";
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import {applicationConfig} from "./core/application-config.js";
import {translationNew} from "./commands/translation-new.js";

const program = new Command();

console.log(figlet.textSync("Translator").blue);

inquirer.registerPrompt('autocomplete', inquirerPrompt);

program
    .version("1.0.0")
    .description("An utility cli to translating objects")
    .action(() => {
        const exists = applicationConfig.exists();

        if (!exists)
            setupApplication()
                .catch((error: Error) => exceptionHandler(error))
                .finally(() => loadingBar().stop())
        else program.outputHelp();
    })

program.command("creator")
    .description('Allow translating a whole file from source language to target languages')
    .action(() => translationCreator()
        .catch((error: Error) => exceptionHandler(error))
        .finally(() => loadingBar().stop())
    )

program.command("new")
    .description('Create blank translation files')
    .action(() => translationNew()
        .catch((error: Error) => exceptionHandler(error))
        .finally(() => loadingBar().stop())
    )

program.command('config')
    .description('Setup the aplication')
    .action(() =>
        setupApplication()
            .catch((error: Error) => exceptionHandler(error))
            .finally(() => loadingBar().stop())
    );

program.command('editor')
    .description('Allow translating specific translation path from source language to target languages')
    .action(() =>
        translationEditor()
            .catch((error: Error) => exceptionHandler(error))
            .finally(() => loadingBar().stop())
    );

program.parse(process.argv);