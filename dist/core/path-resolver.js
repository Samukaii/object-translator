"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const { sourceLanguage, basePath, translationSuffix } = config_json_1.default;
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
    try {
        result = yield Promise.resolve(`${sourceLanguagePath}`).then(s => __importStar(require(s)));
    }
    catch (e) {
        throw new file_not_found_error_1.FileNotFoundError(sourceLanguagePath);
    }
    const varName = (0, kebab_to_snake_1.kebabToSnake)(`${file}${suffix}`).toUpperCase();
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