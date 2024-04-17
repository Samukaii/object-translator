"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertObjectToTranslations = void 0;
const convertObjectToTranslations = (object) => {
    const result = [];
    function traverse(obj, path = "") {
        for (const key in obj) {
            if (typeof obj[key] === 'object') {
                traverse(obj[key], path ? `${path}.${key}` : key);
            }
            else {
                result.push({ path: path ? `${path}.${key}` : key, value: obj[key] });
            }
        }
    }
    traverse(object);
    return result;
};
exports.convertObjectToTranslations = convertObjectToTranslations;
//# sourceMappingURL=convert-object-to-translations.js.map