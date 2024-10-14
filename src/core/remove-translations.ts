import {createPathResolver} from "./path-resolver.js";
import {applicationConfig} from "./application-config.js";
import {loadingBar} from "./loading-bar.js";
import {convertObjectToTranslations} from "../utils/convert-object-to-translations.js";
import {convertTranslationsToObject} from "../utils/convert-translations-to-object.js";
import {fileCreator} from "./file-creator.js";

export const removeTranslations = async (path: string, translationsToRemove: string[]) => {
    const resolver = await createPathResolver(path);

    const config = applicationConfig.get();
    const allLanguages = [...config.languages, config.sourceLanguage];

    loadingBar().start(`Removendo traduções...`);

    await Promise.all(allLanguages.map(async (language) => {
        const content = resolver.byLanguage(language.folderName);
        const existentTranslations = convertObjectToTranslations(content[resolver.varName]);

        const existentWithoutTranslations = existentTranslations.filter(translation => {
            return !translationsToRemove.find(translationToRemove => translation.path === translationToRemove);
        })

        const updatedContent = convertTranslationsToObject(existentWithoutTranslations);

        fileCreator.create(updatedContent, resolver.varName, resolver.getFullPath(language.folderName));
    }));

    loadingBar().succeed(`Traduções removidas com sucesso!`);
}
