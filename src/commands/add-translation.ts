import inquirer from 'inquirer';
import {Translation} from "../models/translation.js";
import {patchTranslations} from "../core/patch-translations.js";

enum TranslationActions {
    FINISH = 1,
    CONTINUE,
    CANCEL,
    CHOOSE_PATH
}

let filePath: string;
let allTranslations: Translation[] = [];

const chooseFile = async () => {
    const result = await inquirer.prompt([
        {
            type: "input",
            name: "path",
            message: "Choose a file path to translate",
        },
    ]);

    filePath = result['path'];
}



const add = async () => {
    if (!filePath) await chooseFile();

    const asks = inquirer.prompt([
        {
            type: "input",
            name: "translationPath",
            message: "Choose a translation path",
        },
        {
            type: "input",
            name: "translation",
            message: "What is the translation? (in source language)"
        }
    ]);
    const result = await asks;

    allTranslations.unshift({
        path: result.translationPath,
        value: result.translation,
    });
}

const finish = async () => {
    await patchTranslations(filePath, allTranslations);
}


const chooseAction = async () => {
    const asks = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: [
                {
                    value: TranslationActions.FINISH,
                    name: "Finalizar"
                },
                {
                    value: TranslationActions.CONTINUE,
                    name: "Prosseguir"
                },
                {
                    value: TranslationActions.CANCEL,
                    name: "Cancelar"
                },
                {
                    value: TranslationActions.CHOOSE_PATH,
                    name: "Escolher outro arquivo"
                }
            ]
        },
    ]);

    const action = asks['action'] as TranslationActions;

    switch (action) {
        case TranslationActions.FINISH:
            finish();
            break;
        case TranslationActions.CANCEL:
            break;
        case TranslationActions.CONTINUE:
            await add();
            await chooseAction();
            break;
        case TranslationActions.CHOOSE_PATH:
            await chooseFile();
            await chooseAction();
            break;
    }
}

export const addTranslation = async () => {
    await chooseFile();
    await add();
    await chooseAction();
}
