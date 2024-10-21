import fs from "fs";
import {FileNotFoundError} from "../exceptions/file-not-found-error.js";
import {Generic} from "../utils/stringify-object.js";
import {BadFormatFileError} from "../exceptions/bad-format-file-error.js";
import {turnImportsIntoConstants} from "../utils/turn-imports-into-constants.js";

export const importVariable = (varName: string, path: string) => {
    let content = '';

    try {
        content = fs.readFileSync(path, 'utf8');
    } catch (e) {
        throw new FileNotFoundError(path);
    }

    const cleanText = turnImportsIntoConstants(content);

    const regex = new RegExp(`export const ${varName}\\s*=\\s*`);

    const variableDeclarationStart = cleanText.match(regex)?.[0] ?? '';

    let variable: Generic = {};

    try {
        const expression = cleanText.replace(variableDeclarationStart, 'variable = ');

        eval(expression);
    } catch (e) {
        throw new BadFormatFileError(path);
    }

    return {
        [varName]: variable
    };
}
