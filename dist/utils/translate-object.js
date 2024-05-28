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
import { convertObjectToTranslations } from "./convert-object-to-translations.js";
import { translate } from "bing-translate-api";
import { convertTranslationsToObject } from "./convert-translations-to-object.js";
import { CouldNotTranslateError } from "../exceptions/could-not-translate-error.js";
var applyTranslation = function (translations, values) {
    var copy = JSON.parse(JSON.stringify(translations));
    values.forEach(function (value, index) {
        if (copy[index])
            copy[index].value = value;
    });
    return copy;
};
var separator = ' # ';
var cropText = function (text, limit) {
    if (limit === void 0) { limit = 1000; }
    var terms = text.split(separator);
    var groups = [];
    var currentGroup = '';
    for (var _i = 0, terms_1 = terms; _i < terms_1.length; _i++) {
        var term = terms_1[_i];
        if (currentGroup.length + term.length + 1 <= limit) {
            currentGroup += (currentGroup ? separator : '') + term;
        }
        else {
            groups.push(currentGroup);
            currentGroup = term;
        }
    }
    if (currentGroup) {
        groups.push(currentGroup);
    }
    return groups;
};
export var translateObject = function (object, from, to) { return __awaiter(void 0, void 0, void 0, function () {
    var asTranslations, asPlainText, totalResult, cropped, results, asArray, e_1, resultAsArray, asTranslationsAgain;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                asTranslations = convertObjectToTranslations(object);
                asPlainText = asTranslations.map(function (translation) { return translation.value; }).join(separator);
                totalResult = "";
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                cropped = cropText(asPlainText);
                results = cropped.map(function (group) { return __awaiter(void 0, void 0, void 0, function () {
                    var translated;
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0: return [4 /*yield*/, translate(group, from, to, undefined, true)];
                            case 1:
                                translated = _b.sent();
                                return [2 /*return*/, (_a = translated === null || translated === void 0 ? void 0 : translated.translation) !== null && _a !== void 0 ? _a : ''];
                        }
                    });
                }); });
                return [4 /*yield*/, Promise.all(results)];
            case 2:
                asArray = _a.sent();
                totalResult = asArray.join('');
                return [3 /*break*/, 4];
            case 3:
                e_1 = _a.sent();
                throw new CouldNotTranslateError(e_1);
            case 4:
                resultAsArray = (totalResult).split(separator).map(function (text) { return text.trim(); });
                asTranslationsAgain = applyTranslation(asTranslations, resultAsArray);
                return [2 /*return*/, convertTranslationsToObject(asTranslationsAgain)];
        }
    });
}); };
//# sourceMappingURL=translate-object.js.map