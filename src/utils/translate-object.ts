import {Generic} from "./stringify-object.js";
import {convertObjectToTranslations} from "./convert-object-to-translations.js";
import {Translation} from "../models/translation.js";
import {translate, TranslationResult} from "bing-translate-api";
import {convertTranslationsToObject} from "./convert-translations-to-object.js";
import {CouldNotTranslateError} from "../exceptions/could-not-translate-error.js";

const applyTranslation = (translations: Translation[], values: string[]) => {
    const copy: Translation[] = JSON.parse(JSON.stringify(translations));

    values.forEach((value, index) => {
        if (copy[index])
            copy[index].value = value
    });

    return copy;
}

export const translateObject = async (object: Generic, from: string, to: string) => {
    const asTranslations = convertObjectToTranslations(object);

    const asPlainText = asTranslations.map(translation => translation.value).join(";");

    let result: TranslationResult | undefined;

    try {
        result = await translate(asPlainText, from, to);
    }
    catch (e) {
        throw new CouldNotTranslateError(e as Error);
    }

    const resultAsArray = (result?.translation ?? "").split(";").map(text => text.trim());

    const asTranslationsAgain = applyTranslation(asTranslations, resultAsArray);

    return convertTranslationsToObject(asTranslationsAgain);
}
