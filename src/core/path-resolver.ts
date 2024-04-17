import config from "../config.json";
import {kebabToSnake} from "../utils/kebab-to-snake";
import {Generic} from "../utils/stringify-object";
import {FileNotFoundError} from "../exceptions/file-not-found-error";
import {CouldNotFoundVariable} from "../exceptions/could-not-found-variable";

const {sourceLanguage, basePath, translationSuffix} = config;


export const createPathResolver = async (fileName: string) => {
    let file = fileName;
    let parentPath = "";
    const suffix = translationSuffix ? '-' + translationSuffix : '';

    if (fileName.includes("/")) {
        const splinted = fileName.split("/");

        file = splinted.at(-1)!;
        parentPath = splinted.slice(0, splinted.length - 1).join("/");
    }

    const getFullPath = (language: string) => {
        const parentPathConcat = parentPath ? `${parentPath}/` : '';
        file = file.replace(suffix, "");

        return `${basePath}/${language}/${parentPathConcat}${file}${suffix}.ts`;
    }

    let result: Generic;
    const sourceLanguagePath = getFullPath(sourceLanguage.folderName);

    try {
        result = await import(sourceLanguagePath);
    }
    catch (e) {
        throw new FileNotFoundError(sourceLanguagePath);
    }

    const varName = kebabToSnake(`${file}${suffix}`).toUpperCase();

    if(!result[varName])
        throw new CouldNotFoundVariable(varName, sourceLanguagePath);


    return {
        getFullPath,
        varName,
        content: result[varName]
    }
};
