import {Generic} from "./stringify-object.js";
import {convertObjectToTranslations} from "./convert-object-to-translations.js";
import {Translation} from "../models/translation.js";
import {translate} from "bing-translate-api";
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

const separator = ';';

const cropText = (text: string, limit = 1000) => {
    const terms = text.split(separator);
    const groups = [];
    let currentGroup = '';

    for (const term of terms) {
        if (currentGroup.length + term.length + 1 <= limit) {
            currentGroup += (currentGroup ? separator : '') + term;
        } else {
            groups.push(currentGroup);
            currentGroup = term;
        }
    }

    if (currentGroup) {
        groups.push(currentGroup);
    }

    return groups;
}

export const translateObject = async (object: Generic, from: string, to: string) => {
    const asTranslations = convertObjectToTranslations(object);

    const asPlainText = asTranslations.map(translation => translation.value).join(separator);

    let totalResult = "";

    try {
        const cropped = cropText(asPlainText)

        const results = cropped.map(async group => {
            const translated = await translate(group, from, to, undefined, true);

            return translated?.translation ?? '';
        });

        const asArray = await Promise.all(results);

        totalResult = asArray.join('');
    }
    catch (e) {
        throw new CouldNotTranslateError(e as Error);
    }

    const resultAsArray = (totalResult).split(separator).map(text => text.trim());

    const asTranslationsAgain = applyTranslation(asTranslations, resultAsArray);

    return convertTranslationsToObject(asTranslationsAgain);
}
