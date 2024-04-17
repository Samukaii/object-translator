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
const app_1 = require("./app");
const minimist_1 = __importDefault(require("minimist"));
require("colors");
const exception_handler_1 = require("./exceptions/exception-handler");
const loading_bar_1 = require("./core/loading-bar");
const config_json_1 = __importDefault(require("./config.json"));
const figlet_1 = __importDefault(require("figlet"));
const commander_1 = require("commander");
const argHandler = (0, minimist_1.default)(process.argv.slice(2));
const program = new commander_1.Command();
const joinItems = (items) => {
    const last = items.pop();
    return `${items.join(", ")}${last ? ' and ' + last : ''}`;
};
const sourceLanguage = config_json_1.default.sourceLanguage.label;
const languages = joinItems(config_json_1.default.languages.map(language => language.label));
console.log(figlet_1.default.textSync("Translator").cyan);
program
    .version("1.0.0")
    .description("An utility cli to translating objects")
    .parse(process.argv);
const message = `Translating ${sourceLanguage} to ${languages}`.blue;
(0, loading_bar_1.loadingBar)().start(message);
const args = {
    file: argHandler._[0],
};
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!args.file)
        program.outputHelp();
    else
        yield (0, app_1.startApplication)(args);
});
bootstrap()
    .catch((error) => (0, exception_handler_1.exceptionHandler)(error))
    .finally(() => (0, loading_bar_1.loadingBar)().stop());
//# sourceMappingURL=index.js.map