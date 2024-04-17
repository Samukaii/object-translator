"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPathResolver = void 0;
const config_json_1 = __importDefault(require("../config.json"));
const kebab_to_snake_1 = require("../utils/kebab-to-snake");
const file_not_found_error_1 = require("../exceptions/file-not-found-error");
const could_not_found_variable_1 = require("../exceptions/could-not-found-variable");
const fs_1 = __importDefault(require("fs"));
const { sourceLanguage, basePath, translationSuffix } = config_json_1.default;
const importVariable = (varName, path) => {
    const content = fs_1.default.readFileSync(path, 'utf8');
    const value = content.substring(content.indexOf('{'), content.lastIndexOf('}') + 1);
    let variable = {};
    eval(`variable = ${value}`);
    return {
        [varName]: variable
    };
};
const createPathResolver = (fileName) => __awaiter(void 0, void 0, void 0, function* () {
    let file = fileName;
    let parentPath = "";
    const suffix = translationSuffix ? '-' + translationSuffix : '';
    if (fileName.includes("/")) {
        const splinted = fileName.split("/");
        file = splinted.at(-1);
        parentPath = splinted.slice(0, splinted.length - 1).join("/");
    }
    const getFullPath = (language) => {
        const parentPathConcat = parentPath ? `${parentPath}/` : '';
        file = file.replace(suffix, "");
        return `${basePath}/${language}/${parentPathConcat}${file}${suffix}.ts`;
    };
    let result;
    const sourceLanguagePath = getFullPath(sourceLanguage.folderName);
    const varName = (0, kebab_to_snake_1.kebabToSnake)(`${file}${suffix}`).toUpperCase();
    try {
        result = importVariable(varName, sourceLanguagePath);
    }
    catch (e) {
        throw new file_not_found_error_1.FileNotFoundError(sourceLanguagePath);
    }
    if (!result[varName])
        throw new could_not_found_variable_1.CouldNotFoundVariable(varName, sourceLanguagePath);
    return {
        getFullPath,
        varName,
        content: result[varName]
    };
});
exports.createPathResolver = createPathResolver;
//# sourceMappingURL=path-resolver.js.map