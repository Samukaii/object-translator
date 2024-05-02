import {kebabToSnake} from "../utils/kebab-to-snake.js";
import {Generic} from "../utils/stringify-object.js";
import {FileNotFoundError} from "../exceptions/file-not-found-error.js";
import {CouldNotFoundVariable} from "../exceptions/could-not-found-variable.js";
import fs from "fs";
import {applicationConfig} from "./application-config.js";


const importVariable = (varName: string, path: string) => {
    const content = fs.readFileSync(path, 'utf8');

    const value = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);

    let variable: Generic = {};
    eval(`variable = ${value}`);

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
        throw new FileNotFoundError(sourceLanguagePath);
    }


    if(!result[varName])
        throw new CouldNotFoundVariable(varName, sourceLanguagePath);


    return {
        getFullPath,
        varName,
        content: result[varName]
    }
};
