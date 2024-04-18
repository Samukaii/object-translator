import {Generic} from "./stringify-object.js";
import {Translation} from "../models/translation.js";

export const convertTranslationsToObject = (data: Translation[]): Generic => {
    const result: Generic = {};

    data.forEach(item => {
        const keys = item.path.split('.');
        let currentObj = result;

        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                currentObj[key] = item.value;
            } else {
                currentObj[key] = currentObj[key] || {};
                currentObj = currentObj[key];
            }
        });
    });

    return result;
};