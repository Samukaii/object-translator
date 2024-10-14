import {Generic} from "../utils/stringify-object.js";
import {CouldNotFoundVariable} from "../exceptions/could-not-found-variable.js";
import {applicationConfig} from "./application-config.js";
import {importVariable} from "./import-variable.js";
import {getFullPath} from "./get-full-path.js";
import {getConstVarName} from "../utils/get-const-var-name.js";

export const createPathResolver = async (fileName: string) => {
    const config = applicationConfig.get();

    let file = fileName;

    let result: Generic;
    const sourceLanguagePath = getFullPath(file, config.sourceLanguage.folderName);
    const varName = getConstVarName(file);

    try {
        result = importVariable(varName, sourceLanguagePath);
    }
    catch (e) {
        throw e;
    }

    if(!result[varName])
        throw new CouldNotFoundVariable(varName, sourceLanguagePath);

    const byLanguage = (language: string) => {
        const sourceLanguagePath = getFullPath(fileName, language);
        return importVariable(varName, sourceLanguagePath);
    }

    return {
        getFullPath: (language: string) => getFullPath(fileName, language),
        varName,
        byLanguage,
        bySourceLanguage: () => byLanguage(config.sourceLanguage.folderName),
        content: result[varName]
    }
};
