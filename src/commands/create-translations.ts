import {CreateTranslationArgs} from "../models/create-translation-args.js";
import {loadingBar} from "../core/loading-bar.js";
import {createPathResolver} from "../core/path-resolver.js";
import config from "../config.json" assert {type: "json"};
import {translateObject} from "../utils/translate-object.js";
import {fileCreator} from "../core/file-creator.js";

const joinItems = (items: string[]) => {
    const last = items.pop();

    return `${items.join(", ")}${last ? ' and ' + last : ''}`;
}

const sourceLanguage = config.sourceLanguage.label;
const languages = joinItems(config.languages.map(language => language.label));

const message = `Translating ${sourceLanguage} to ${languages}`.blue;

export const createTranslations = async (args: CreateTranslationArgs) => {
    const {file} = args;
    const loading = loadingBar();

    const resolver = await createPathResolver(file);

    const {sourceLanguage} = config;

    loading.start(message);

    for (let index = 0; index < config.languages.length; index++) {
        const language = config.languages[index];

        if (language.folderName === sourceLanguage.folderName) continue;

        const translated = await translateObject(
            resolver.content,
            sourceLanguage.value,
            language.value
        );

        fileCreator.create(
            translated,
            resolver.varName,
            resolver.getFullPath(language.folderName)
        );


        loading.succeed(` Succesfully created ${language.label} translations`.green);
    }

    console.log('\n');

    config.languages.forEach(language => {
        const languageLabel = `${language.label} translations`;
        const path = resolver.getFullPath(language.folderName);

        console.log(`${languageLabel.blue} => ${path.yellow}`);
    });
};
