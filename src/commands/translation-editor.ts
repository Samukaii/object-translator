import inquirer from 'inquirer';
import {Translation} from "../models/translation.js";
import {patchTranslations} from "../core/patch-translations.js";
import {getDirectories} from "../core/get-directories.js";
import {createPathResolver} from "../core/path-resolver.js";
import {convertObjectToTranslations} from "../utils/convert-object-to-translations.js";

enum TranslationActions {
    FINISH = 1,
    CONTINUE,
    CANCEL,
    CHOOSE_PATH
}

let filePath: string;
let allTranslations: Translation[] = [];

const chooseFile = async () => {
    const directories = getDirectories();

    const result = await inquirer.prompt([
        {
            type: "autocomplete",
            name: "path",
            message: "Choose a file path to translate",
            source: (_answers: any, input: string) => directories.filter(directory => {
                return directory.toLowerCase().includes(input?.toLowerCase() ?? "");
            }),
        },
    ]);

    filePath = result['path'];
}


const add = async () => {
    if (!filePath) await chooseFile();
    const resolver = await createPathResolver(filePath);
    const object = resolver.bySourceLanguage();
    const translations = convertObjectToTranslations(object[resolver.varName]).map(translation => {
        return translation.path
    });

    const asks = inquirer.prompt([
        {
            type: "autocomplete",
            name: "translationPath",
            message: "Choose a file path to translate",
            source: (_answers: any, input: string) => {
                const filtered = translations.filter(directory => {
                    return directory.toLowerCase().includes(input?.toLowerCase() ?? "");
                });

                return [
                    input ?? '',
                    ...filtered
                ];
            },
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

export const translationEditor = async () => {
    await chooseFile();
    await add();
    await chooseAction();
}
