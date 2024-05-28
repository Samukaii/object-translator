import {kebabToSnake} from "../utils/kebab-to-snake.js";
import {Generic} from "../utils/stringify-object.js";
import {FileNotFoundError} from "../exceptions/file-not-found-error.js";
import {CouldNotFoundVariable} from "../exceptions/could-not-found-variable.js";
import fs from "fs";
import {applicationConfig} from "./application-config.js";
import {BadFormatFileError} from "../exceptions/bad-format-file-error.js";




const importVariable = (varName: string, path: string) => {
    let content = '';

    try {
        content = fs.readFileSync(path, 'utf8');
    }
    catch (e) {
        throw new FileNotFoundError(path);
    }


    let value = content.substring(content.indexOf(`{`), content.lastIndexOf('}') + 1);

    let variable: Generic = {};

    try {
        eval(`variable = ${value}`);
    }
    catch (e) {
        throw new BadFormatFileError(path);
    }

    return {
        [varName]: variable
    };
}

export const createPathResolver = async (fileName: string) => {
    const config = applicationConfig.get();

    let file = fileName;
    let parentPath = "";
    const suffix = config.translationSuffix ? '-' + config.translationSuffix : '';

    if (fileName.includes("/")) {
        const splinted = fileName.split("/");

        file = splinted.at(-1)!;
        parentPath = splinted.slice(0, splinted.length - 1).join("/");
    }

    const getFullPath = (language: string) => {
        const parentPathConcat = parentPath ? `${parentPath}/` : '';
        file = file.replace(suffix, "");

        return `${config.basePath}/${language}/${parentPathConcat}${file}${suffix}.ts`;
    }

    let result: Generic;
    const sourceLanguagePath = getFullPath(config.sourceLanguage.folderName);
    const varName = kebabToSnake(`${file}${suffix}`).toUpperCase();

    try {
        result = importVariable(varName, sourceLanguagePath);
    }
    catch (e) {
        throw e;
    }


    if(!result[varName])
        throw new CouldNotFoundVariable(varName, sourceLanguagePath);

    const byLanguage = (language: string) => {
        const sourceLanguagePath = getFullPath(language);
        return importVariable(varName, sourceLanguagePath);
    }


    return {
        getFullPath,
        varName,
        byLanguage,
        bySourceLanguage: () => byLanguage(config.sourceLanguage.folderName),
        content: result[varName]
    }
};
