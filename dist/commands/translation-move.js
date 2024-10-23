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
import {loadingBar} from "../core/loading-bar.js";
import {fileCreator} from "../core/file-creator.js";
import {applicationConfig} from "../core/application-config.js";
import inquirer from "inquirer";
import {getFullPath} from "../core/get-full-path.js";
import {joinItems} from "../utils/join-items.js";
import {getDirectories} from "../core/get-directories.js";

var moveOrRename = function (sourcePath, targetPath) { return __awaiter(void 0, void 0, void 0, function () {
    var config, allLanguages, languages, message, loading, index, language;
    return __generator(this, function (_a) {
        config = applicationConfig.get();
        allLanguages = __spreadArray(__spreadArray([], config.languages, true), [
            config.sourceLanguage
        ], false);
        languages = joinItems(allLanguages.map(function (language) { return language.label; }));
        message = "Moving or renaming files for ".concat(languages).blue;
        loading = loadingBar();
        loading.start(message);
        for (index = 0; index < allLanguages.length; index++) {
            language = allLanguages[index];
            fileCreator.moveOrRename(getFullPath(sourcePath, language.folderName), getFullPath(targetPath, language.folderName));
            loading.succeed(" Succesfully moved or renamed ".concat(language.label, " file").green);
        }
        console.log('\n');
        allLanguages.forEach(function (language) {
            var languageLabel = "".concat(language.label, " translations");
            var path = getFullPath(targetPath, language.folderName);
            console.log("".concat(languageLabel.blue, " => ").concat(path.yellow));
        });
        loading.stop();
        return [2 /*return*/];
    });
}); };
export var translationMove = function () { return __awaiter(void 0, void 0, void 0, function () {
    var directories, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                directories = getDirectories();
                return [4 /*yield*/, inquirer.prompt([
                        {
                            type: "autocomplete",
                            name: "source",
                            message: "Choose a file path to move or rename",
                            source: function (_answers, input) { return directories.filter(function (directory) {
                                var _a;
                                return directory.toLowerCase().includes((_a = input === null || input === void 0 ? void 0 : input.toLowerCase()) !== null && _a !== void 0 ? _a : "");
                            }); },
                        },
                        {
                            type: "input",
                            name: "target",
                            message: "Choose a new path",
                        },
                    ])];
            case 1:
                result = _a.sent();
                return [4 /*yield*/, moveOrRename(result["source"], result['target'])];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=translation-move.js.map