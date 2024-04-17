import {translateObject} from "./utils/translate-object";
import config from "./config.json";
import {ApplicationConfig} from "./models/application-config";
import {fileCreator} from "./core/file-creator";
import {createPathResolver} from "./core/path-resolver";
import 'colors';
import {loadingBar} from "./core/loading-bar";

export const startApplication = async (args: ApplicationConfig) => {
    const {file} = args;
    const loading = loadingBar();

    const resolver = await createPathResolver(file);

    const {sourceLanguage} = config;

    loading.start();

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
