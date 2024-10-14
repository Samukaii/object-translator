import fs from "fs";
import {FileNotFoundError} from "../exceptions/file-not-found-error.js";
import {replaceAll} from "../utils/replace-all.js";
import {Generic} from "../utils/stringify-object.js";
import {BadFormatFileError} from "../exceptions/bad-format-file-error.js";

export const importVariable = (varName: string, path: string) => {
    let content = '';

    try {
        content = fs.readFileSync(path, 'utf8');
    } catch (e) {
        throw new FileNotFoundError(path);
    }

    const withoutImports = replaceAll(content, /import\s*\{\s*.*}\s*from\s*["'].*["'];*/gm, '');
    const cleanText = replaceAll(withoutImports, /\.\.\..*,?/gm, '');

    let value = cleanText.substring(cleanText.indexOf(`{`), cleanText.lastIndexOf('}') + 1);

    let variable: Generic = {};

    try {
        eval(`variable = ${value}`);
    } catch (e) {
        throw new BadFormatFileError(path);
    }

    return {
        [varName]: variable
    };
}
