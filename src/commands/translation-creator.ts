import {loadingBar} from "../core/loading-bar.js";
import {createPathResolver} from "../core/path-resolver.js";
import {translateObject} from "../utils/translate-object.js";
import {fileCreator} from "../core/file-creator.js";
import {applicationConfig} from "../core/application-config.js";
import inquirer from "inquirer";
import {searchFiles} from "../utils/search-files.js";
import {joinItems} from "../utils/join-items.js";

const createTranslationFiles = async (file: string) => {
    const config = applicationConfig.get();

    const sourceLanguageLabel = config.sourceLanguage.label;
    const languages = joinItems(config.languages.map(language => language.label));

    const message = `Translating ${sourceLanguageLabel} to ${languages}`.blue;


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

    loading.stop();
};

export const translationCreator = async () => {
    const result = await inquirer.prompt([
        {
            type: "autocomplete",
            name: "path",
            message: "Choose a file path to translate",
            source: (_answers: any, input: string) => searchFiles(input),
        },
    ]);

    await createTranslationFiles(result["path"])
};
