import inquirer, {Question} from 'inquirer';
import {allLanguages} from "../static/all-languages.js";
import fs from "node:fs";
import {Generic} from "../utils/stringify-object.js";
import path from "node:path";
import {loadingBar} from "../core/loading-bar.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const getLanguageInfo = (language: string) => {
    const [label, value] = language.split('-');
    const withoutParentesis = value
        .replace('(', '')
        .replace(')', '');

    return {
        label: label.trim(),
        value: withoutParentesis.trim()
    }
}

const askDefaultConfig = () => {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'basePath',
            message: "What path do you want to find/generate translations?",
            default: process.cwd()
        },
        {
            type: 'input',
            name: 'translationSuffix',
            message: "Do you want to use a suffix to find/generate translations?",
            default: 'translate'
        },
        {
            type: 'list',
            name: 'sourceLanguage',
            pageSize: 25,
            message: 'What will be your main language?',
            filter: (input: string) => getLanguageInfo(input),
            choices: allLanguages.map(input => `${input.label} - (${input.value})`)
        },
        {
            type: 'checkbox',
            name: 'languages',
            pageSize: 25,
            message: 'Wich languages do you want to translate?',
            filter: (input: string[]) => input.map(getLanguageInfo),
            choices: (answers) => allLanguages
                .filter(language => language.value !== answers.sourceLanguage.value)
                .map(input => `${input.label} - (${input.value})`),
            validate: (input: Generic[]) => !input.length ? "You must select at least one language" : true
        },
    ]);
}

const askFolderNames = async (languages: {label: string; value: string}[]) => {
    const folders = await inquirer.prompt(languages.map((language: {label: string; value: string;}) => {
        return {
            type: "input",
            name: language.value,
            message: `Choose a folder for ${language.label}`,
            default: language.value
        } as Question
    }));

    return languages.map(language => ({
        ...language,
        folderName: folders[language.value]
    }));
}

const saveConfig = (config: Generic) => {
    loadingBar().start();
    const fullPath = path.resolve(__dirname, 'config.json');

    const content = JSON.stringify(config, null, 2);

    fs.writeFileSync(fullPath, content);


    console.log('');
    loadingBar().succeed(' Configurations updated succesfully!'.green);
    console.log(`File: ${fullPath}`.yellow);
    console.log('');
}

export const setupApplication = async () => {
    const basicConfig = await askDefaultConfig();

    const languages = await askFolderNames([
        basicConfig.sourceLanguage,
        ...basicConfig.languages
    ]);

    const fullConfig = {
        ...basicConfig,
        sourceLanguage: languages[0],
        languages: languages.slice(1)
    };


    saveConfig(fullConfig);
}