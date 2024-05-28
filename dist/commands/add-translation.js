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
import { patchTranslations } from "../core/patch-translations.js";
import { getDirectories } from "../core/get-directories.js";
import { createPathResolver } from "../core/path-resolver.js";
import { convertObjectToTranslations } from "../utils/convert-object-to-translations.js";
var TranslationActions;
(function (TranslationActions) {
    TranslationActions[TranslationActions["FINISH"] = 1] = "FINISH";
    TranslationActions[TranslationActions["CONTINUE"] = 2] = "CONTINUE";
    TranslationActions[TranslationActions["CANCEL"] = 3] = "CANCEL";
    TranslationActions[TranslationActions["CHOOSE_PATH"] = 4] = "CHOOSE_PATH";
})(TranslationActions || (TranslationActions = {}));
var filePath;
var allTranslations = [];
var chooseFile = function () { return __awaiter(void 0, void 0, void 0, function () {
    var directories, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                directories = getDirectories();
                return [4 /*yield*/, inquirer.prompt([
                        {
                            type: "autocomplete",
                            name: "path",
                            message: "Choose a file path to translate",
                            source: function (_answers, input) { return directories.filter(function (directory) {
                                var _a;
                                return directory.toLowerCase().includes((_a = input === null || input === void 0 ? void 0 : input.toLowerCase()) !== null && _a !== void 0 ? _a : "");
                            }); },
                        },
                    ])];
            case 1:
                result = _a.sent();
                filePath = result['path'];
                return [2 /*return*/];
        }
    });
}); };
var add = function () { return __awaiter(void 0, void 0, void 0, function () {
    var resolver, object, translations, asks, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!filePath) return [3 /*break*/, 2];
                return [4 /*yield*/, chooseFile()];
            case 1:
                _a.sent();
                _a.label = 2;
            case 2: return [4 /*yield*/, createPathResolver(filePath)];
            case 3:
                resolver = _a.sent();
                object = resolver.bySourceLanguage();
                translations = convertObjectToTranslations(object[resolver.varName]).map(function (translation) {
                    return translation.path;
                });
                asks = inquirer.prompt([
                    {
                        type: "autocomplete",
                        name: "translationPath",
                        message: "Choose a file path to translate",
                        source: function (_answers, input) {
                            var filtered = translations.filter(function (directory) {
                                var _a;
                                return directory.toLowerCase().includes((_a = input === null || input === void 0 ? void 0 : input.toLowerCase()) !== null && _a !== void 0 ? _a : "");
                            });
                            return __spreadArray([
                                input !== null && input !== void 0 ? input : ''
                            ], filtered, true);
                        },
                    },
                    {
                        type: "input",
                        name: "translation",
                        message: "What is the translation? (in source language)"
                    }
                ]);
                return [4 /*yield*/, asks];
            case 4:
                result = _a.sent();
                allTranslations.unshift({
                    path: result.translationPath,
                    value: result.translation,
                });
                return [2 /*return*/];
        }
    });
}); };
var finish = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, patchTranslations(filePath, allTranslations)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
var chooseAction = function () { return __awaiter(void 0, void 0, void 0, function () {
    var asks, action, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, inquirer.prompt([
                    {
                        type: "list",
                        name: "action",
                        message: "What do you want to do?",
                        choices: [
                            {
                                value: TranslationActions.FINISH,
                                name: "Finalizar"
                            },
                            {
                                value: TranslationActions.CONTINUE,
                                name: "Prosseguir"
                            },
                            {
                                value: TranslationActions.CANCEL,
                                name: "Cancelar"
                            },
                            {
                                value: TranslationActions.CHOOSE_PATH,
                                name: "Escolher outro arquivo"
                            }
                        ]
                    },
                ])];
            case 1:
                asks = _b.sent();
                action = asks['action'];
                _a = action;
                switch (_a) {
                    case TranslationActions.FINISH: return [3 /*break*/, 2];
                    case TranslationActions.CANCEL: return [3 /*break*/, 3];
                    case TranslationActions.CONTINUE: return [3 /*break*/, 4];
                    case TranslationActions.CHOOSE_PATH: return [3 /*break*/, 7];
                }
                return [3 /*break*/, 10];
            case 2:
                finish();
                return [3 /*break*/, 10];
            case 3: return [3 /*break*/, 10];
            case 4: return [4 /*yield*/, add()];
            case 5:
                _b.sent();
                return [4 /*yield*/, chooseAction()];
            case 6:
                _b.sent();
                return [3 /*break*/, 10];
            case 7: return [4 /*yield*/, chooseFile()];
            case 8:
                _b.sent();
                return [4 /*yield*/, chooseAction()];
            case 9:
                _b.sent();
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
export var addTranslation = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, chooseFile()];
            case 1:
                _a.sent();
                return [4 /*yield*/, add()];
            case 2:
                _a.sent();
                return [4 /*yield*/, chooseAction()];
            case 3:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=add-translation.js.map