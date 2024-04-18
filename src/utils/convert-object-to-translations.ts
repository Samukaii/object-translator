import {Generic} from "./stringify-object.js";
import {Translation} from "../models/translation.js";

export const convertObjectToTranslations = (object: Generic): Translation[] => {
    const result: Translation[] = [];

    function traverse(obj: Generic, path = "") {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                traverse(obj[key], path ? `${path}.${key}` : key);
            } else {
                result.push({path: path ? `${path}.${key}` : key, value: obj[key]});
            }
        }
    }

    traverse(object);

    return result;
};