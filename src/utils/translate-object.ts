import {Generic} from "./stringify-object";
import {convertObjectToTranslations} from "./convert-object-to-translations";
import {Translation} from "../models/translation";
import {translate, TranslationResult} from "bing-translate-api";
import {convertTranslationsToObject} from "./convert-translations-to-object";

import {CouldNotTranslateError} from "../exceptions/could-not-translate-error";

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
