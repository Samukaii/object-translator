import inquirer from 'inquirer';
import {Translation} from "../models/translation.js";
import {patchTranslations} from "../core/patch-translations.js";
import {getDirectories} from "../core/get-directories.js";
import {createPathResolver} from "../core/path-resolver.js";
import {convertObjectToTranslations} from "../utils/convert-object-to-translations.js";
import {removeTranslations} from "../core/remove-translations.js";

enum TranslationActions {
    APPLY = 1,
    NEW_TRANSLATION,
    REMOVE_TRANSLATION,
    CANCEL,
}

let filePath: string;
let translationsToAddOrEdit: Translation[] = [];
let translationsToRemove: string[] = [];

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

const removeTranslation = async () => {
    if (!filePath) await chooseFile();
    const resolver = await createPathResolver(filePath);
    const object = resolver.bySourceLanguage();
    const existentTranslations = convertObjectToTranslations(object[resolver.varName]);

    const translations = [
        ...existentTranslations,
        ...translationsToAddOrEdit
    ];

    const asks = inquirer.prompt([
        {
            type: "autocomplete",
            name: "translationPath",
            message: "Choose a file path to remove",
            source: (_answers: any, input: string) => {
                const filtered = translations.filter(directory => {
                    return directory.path.toLowerCase().includes(input?.toLowerCase() ?? "");
                });

                return [
                    input ?? '',
                    ...filtered.map(translation => {
                        return `${translation.path}: ${translation.value}`
                    })
                ];
            },
        }
    ]);

    const result = await asks;

    translationsToAddOrEdit = translationsToAddOrEdit.filter(translation => translation.path !== result.translationPath);

    translationsToRemove.push(result.translationPath);
}

const add = async () => {
    if (!filePath) await chooseFile();
    const resolver = await createPathResolver(filePath);
    const object = resolver.bySourceLanguage();
    const existentTranslations = convertObjectToTranslations(object[resolver.varName]);

    const translations = [
        ...existentTranslations,
        ...translationsToAddOrEdit
    ];

    const asks = inquirer.prompt([
        {
            type: "autocomplete",
            name: "translationPath",
            message: "Choose a file path to translate",
            source: (_answers: any, input: string) => {
                const filtered = translations.filter(directory => {
                    return directory.path.toLowerCase().includes(input?.toLowerCase() ?? "");
                });

                return [
                    input ?? '',
                    ...filtered.map(translation => {
                        return `${translation.path}: ${translation.value}`
                    })
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

    translationsToAddOrEdit = translationsToAddOrEdit.filter(translation => translation.path !== result.translationPath);

    translationsToAddOrEdit.unshift({
        path: result.translationPath,
        value: result.translation,
    });
}

const apply = async () => {
    if(translationsToRemove.length)
        await removeTranslations(filePath, translationsToRemove);

    if(translationsToAddOrEdit.length)
        await patchTranslations(filePath, translationsToAddOrEdit);

    if(!translationsToRemove.length && !translationsToAddOrEdit.length)
        console.log("Nenhuma ação realizada!".yellow);
}


const chooseAction = async () => {
    const asks = await inquirer.prompt([
        {
            type: "list",
            name: "action",
            message: "What do you want to do?",
            choices: [
                {
                    value: TranslationActions.REMOVE_TRANSLATION,
                    name: "Remover uma tradução"
                },
                {
                    value: TranslationActions.NEW_TRANSLATION,
                    name: "Adicionar ou atualizar uma tradução"
                },
                {
                    value: TranslationActions.APPLY,
                    name: "Aplicar alterações"
                },
                {
                    value: TranslationActions.CANCEL,
                    name: "Cancelar todas as alterações"
                },
            ]
        },
    ]);

    const action = asks['action'] as TranslationActions;

    switch (action) {
        case TranslationActions.APPLY:
            await apply();
            break;
        case TranslationActions.CANCEL:
            break;
        case TranslationActions.REMOVE_TRANSLATION:
            await removeTranslation();
            await chooseAction();
            break;
        case TranslationActions.NEW_TRANSLATION:
            await add();
            await chooseAction();
            break;
    }
}

export const translationEditor = async () => {
    await chooseAction();
}
