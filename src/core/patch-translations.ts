import {Translation} from "../models/translation.js";
import {createPathResolver} from "./path-resolver.js";
import {applicationConfig} from "./application-config.js";
import {translate} from "bing-translate-api";
import {translateObject} from "../utils/translate-object.js";
import {convertObjectToTranslations} from "../utils/convert-object-to-translations.js";
import {fileCreator} from "./file-creator.js";
import {convertTranslationsToObject} from "../utils/convert-translations-to-object.js";

const removeDuplicate = (translations: Translation[]) => {
    const paths: string[] = [];

    return translations.filter(translation => {
        if (paths.includes(translation.path))
            return false;

        paths.push(translation.path);

        return true;
    });
}

const translateList = async (translations: Translation[], language: string) => {
    const {sourceLanguage} = applicationConfig.get();

    const result = await translate("Casa", 'pt', 'en');
    console.log(result)
    return Promise.all(translations.map(async (translation) => {


        if (!result)
            throw new Error(`Something went wrong while translating: "${translation.value}" to ${language}`);

        return {
            ...translation,
            value: result.translation
        } as Translation;
    }));
}


export const patchTranslations = async (path: string, translations: Translation[]) => {
    const resolver = await createPathResolver(path);

    const config = applicationConfig.get();
    const allLanguages = [...config.languages, config.sourceLanguage];

    await Promise.all(allLanguages.map(async (language) => {
        const content = resolver.byLanguage(language.folderName);
        const asTranslations = convertObjectToTranslations(content[resolver.varName]);

        asTranslations.unshift(...translations);
        const withoutDuplicates = removeDuplicate(asTranslations);
        const updatedContent = convertTranslationsToObject(withoutDuplicates);

        fileCreator.create(updatedContent, resolver.varName, resolver.getFullPath(language.folderName));
    }))
}
