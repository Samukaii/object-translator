import {Translation} from "../models/translation.js";
import {applicationConfig} from "../core/application-config.js";
import {translate} from "bing-translate-api";

export const translateList = async (translations: Translation[], language: string) => {
    const {sourceLanguage} = applicationConfig.get();

    return Promise.all(translations.map(async (translation) => {
        const result = await translate(translation.value, sourceLanguage.value, language);
        if (!result)
            throw new Error(`Something went wrong while translating: "${translation.value}" to ${language}`);

        return {
            ...translation,
            value: result.translation
        } as Translation;
    }));
}