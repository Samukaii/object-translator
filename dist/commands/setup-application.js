var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import inquirer from 'inquirer';
import { allLanguages } from "../static/all-languages.js";
import fs from "node:fs";
import path from "node:path";
import { loadingBar } from "../core/loading-bar.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';
var __dirname = dirname(fileURLToPath(import.meta.url));
var getLanguageInfo = function (language) {
    var _a = language.split('-'), label = _a[0], value = _a[1];
    var withoutParentesis = value
        .replace('(', '')
        .replace(')', '');
    return {
        label: label.trim(),
        value: withoutParentesis.trim()
    };
};
var askDefaultConfig = function () {
    return inquirer.prompt([
        {
            type: 'input',
            name: 'basePath',
            message: "What path do you want to find/generate translations?",
            default: process.cwd()
        },
        {
            type: 'input',
            name: 'translationSuffix',
            message: "Do you want to use a suffix to find/generate translations?",
            default: 'translate'
        },
        {
            type: 'list',
            name: 'sourceLanguage',
            pageSize: 25,
            message: 'What will be your main language?',
            filter: function (input) { return getLanguageInfo(input); },
            choices: allLanguages.map(function (input) { return "".concat(input.label, " - (").concat(input.value, ")"); })
        },
        {
            type: 'checkbox',
            name: 'languages',
            pageSize: 25,
            message: 'Wich languages do you want to translate?',
            filter: function (input) { return input.map(getLanguageInfo); },
            choices: function (answers) { return allLanguages
                .filter(function (language) { return language.value !== answers.sourceLanguage.value; })
                .map(function (input) { return "".concat(input.label, " - (").concat(input.value, ")"); }); },
            validate: function (input) { return !input.length ? "You must select at least one language" : true; }
        },
    ]);
};
var askFolderNames = function (languages) { return __awaiter(void 0, void 0, void 0, function () {
    var folders;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, inquirer.prompt(languages.map(function (language) {
                    return {
                        type: "input",
                        name: language.value,
                        message: "Choose a folder for ".concat(language.label),
                        default: language.value
                    };
                }))];
            case 1:
                folders = _a.sent();
                return [2 /*return*/, languages.map(function (language) { return (__assign(__assign({}, language), { folderName: folders[language.value] })); })];
        }
    });
}); };
var saveConfig = function (config) {
    loadingBar().start();
    var fullPath = path.resolve(__dirname, '../config.json');
    var content = JSON.stringify(config, null, 2);
    fs.writeFileSync(fullPath, content);
    console.log('');
    loadingBar().succeed(' Configurations updated succesfully!'.green);
    console.log("File: ".concat(fullPath).yellow);
    console.log('');
};
export var setupApplication = function () { return __awaiter(void 0, void 0, void 0, function () {
    var basicConfig, languages, fullConfig;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, askDefaultConfig()];
            case 1:
                basicConfig = _a.sent();
                return [4 /*yield*/, askFolderNames(__spreadArray([
                        basicConfig.sourceLanguage
                    ], basicConfig.languages, true))];
            case 2:
                languages = _a.sent();
                fullConfig = __assign(__assign({}, basicConfig), { sourceLanguage: languages[0], languages: languages.slice(1) });
                saveConfig(fullConfig);
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=setup-application.js.map