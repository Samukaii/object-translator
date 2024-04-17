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
Object.defineProperty(exports, "__esModule", { value: true });
exports.translateObject = void 0;
const convert_object_to_translations_1 = require("./convert-object-to-translations");
const bing_translate_api_1 = require("bing-translate-api");
const convert_translations_to_object_1 = require("./convert-translations-to-object");
const could_not_translate_error_1 = require("../exceptions/could-not-translate-error");
const applyTranslation = (translations, values) => {
    const copy = JSON.parse(JSON.stringify(translations));
    values.forEach((value, index) => {
        if (copy[index])
            copy[index].value = value;
    });
    return copy;
};
const translateObject = (object, from, to) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const asTranslations = (0, convert_object_to_translations_1.convertObjectToTranslations)(object);
    const asPlainText = asTranslations.map(translation => translation.value).join(";");
    let result;
    try {
        result = yield (0, bing_translate_api_1.translate)(asPlainText, from, to);
    }
    catch (e) {
        throw new could_not_translate_error_1.CouldNotTranslateError(e);
    }
    const resultAsArray = ((_a = result === null || result === void 0 ? void 0 : result.translation) !== null && _a !== void 0 ? _a : "").split(";").map(text => text.trim());
    const asTranslationsAgain = applyTranslation(asTranslations, resultAsArray);
    return (0, convert_translations_to_object_1.convertTranslationsToObject)(asTranslationsAgain);
});
exports.translateObject = translateObject;
//# sourceMappingURL=translate-object.js.map