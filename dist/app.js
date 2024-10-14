#! /usr/bin/env node
import 'colors';
import { exceptionHandler } from "./exceptions/exception-handler.js";
import { loadingBar } from "./core/loading-bar.js";
import figlet from 'figlet';
import { Command } from "commander";
import { translationCreator } from "./commands/translation-creator.js";
import { setupApplication } from "./commands/setup-application.js";
import { translationEditor } from "./commands/translation-editor.js";
import inquirer from "inquirer";
import inquirerPrompt from 'inquirer-autocomplete-prompt';
import { applicationConfig } from "./core/application-config.js";
import { translationNew } from "./commands/translation-new.js";
var program = new Command();
console.log(figlet.textSync("Translator").blue);
inquirer.registerPrompt('autocomplete', inquirerPrompt);
program
    .version("1.0.0")
    .description("An utility cli to translating objects")
    .action(function () {
    var exists = applicationConfig.exists();
    if (!exists)
        setupApplication()
            .catch(function (error) { return exceptionHandler(error); })
            .finally(function () { return loadingBar().stop(); });
    else
        program.outputHelp();
});
program.command("creator")
    .description('Allow translating a whole file from source language to target languages')
    .action(function () { return translationCreator()
    .catch(function (error) { return exceptionHandler(error); })
    .finally(function () { return loadingBar().stop(); }); });
program.command("new")
    .description('Create blank translation files')
    .action(function () { return translationNew()
    .catch(function (error) { return exceptionHandler(error); })
    .finally(function () { return loadingBar().stop(); }); });
program.command('config')
    .description('Setup the aplication')
    .action(function () {
    return setupApplication()
        .catch(function (error) { return exceptionHandler(error); })
        .finally(function () { return loadingBar().stop(); });
});
program.command('editor')
    .description('Allow translating specific translation path from source language to target languages')
    .action(function () {
    return translationEditor()
        .catch(function (error) { return exceptionHandler(error); })
        .finally(function () { return loadingBar().stop(); });
});
program.parse(process.argv);
//# sourceMappingURL=app.js.map