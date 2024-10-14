import {Translation} from "../models/translation.js";
import {createPathResolver} from "./path-resolver.js";
import {applicationConfig} from "./application-config.js";
import {convertObjectToTranslations} from "../utils/convert-object-to-translations.js";
import {fileCreator} from "./file-creator.js";
import {convertTranslationsToObject} from "../utils/convert-translations-to-object.js";
import {addItemToTranslations} from "../utils/add-item-to-translations.js";
import {translateList} from "../utils/translate-list.js";
import {loadingBar} from "./loading-bar.js";


export const patchTranslations = async (path: string, translations: Translation[]) => {
    const resolver = await createPathResolver(path);

    const config = applicationConfig.get();
    const allLanguages = [...config.languages, config.sourceLanguage];

    loadingBar().start(`Gerando traduções...`);

    await Promise.all(allLanguages.map(async (language) => {
        const content = resolver.byLanguage(language.folderName);
        const asTranslations = convertObjectToTranslations(content[resolver.varName]);

        const translated = await translateList(translations, language.value)

        translated.forEach(translation => {
            addItemToTranslations(asTranslations, translation);
        });

        const updatedContent = convertTranslationsToObject(asTranslations);

        fileCreator.create(updatedContent, resolver.varName, resolver.getFullPath(language.folderName));
    }));

    loadingBar().succeed(`Traduções atualizadas com sucesso!`);
}


