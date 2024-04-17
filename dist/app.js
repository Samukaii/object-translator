#! /usr/bin/env node
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
exports.startApplication = void 0;
const translate_object_1 = require("./utils/translate-object");
const config_json_1 = __importDefault(require("./config.json"));
const file_creator_1 = require("./core/file-creator");
const path_resolver_1 = require("./core/path-resolver");
require("colors");
const loading_bar_1 = require("./core/loading-bar");
const startApplication = (args) => __awaiter(void 0, void 0, void 0, function* () {
    const { file } = args;
    const loading = (0, loading_bar_1.loadingBar)();
    const resolver = yield (0, path_resolver_1.createPathResolver)(file);
    const { sourceLanguage } = config_json_1.default;
    loading.start();
    for (let index = 0; index < config_json_1.default.languages.length; index++) {
        const language = config_json_1.default.languages[index];
        if (language.folderName === sourceLanguage.folderName)
            continue;
        const translated = yield (0, translate_object_1.translateObject)(resolver.content, sourceLanguage.value, language.value);
        file_creator_1.fileCreator.create(translated, resolver.varName, resolver.getFullPath(language.folderName));
        loading.succeed(` Succesfully created ${language.label} translations`.green);
    }
    console.log('\n');
    config_json_1.default.languages.forEach(language => {
        const languageLabel = `${language.label} translations`;
        const path = resolver.getFullPath(language.folderName);
        console.log(`${languageLabel.blue} => ${path.yellow}`);
    });
});
exports.startApplication = startApplication;
//# sourceMappingURL=app.js.map