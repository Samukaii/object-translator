"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertTranslationsToObject = void 0;
const convertTranslationsToObject = (data) => {
    const result = {};
    data.forEach(item => {
        const keys = item.path.split('.');
        let currentObj = result;
        keys.forEach((key, index) => {
            if (index === keys.length - 1) {
                currentObj[key] = item.value;
            }
            else {
                currentObj[key] = currentObj[key] || {};
                currentObj = currentObj[key];
            }
        });
    });
    return result;
};
exports.convertTranslationsToObject = convertTranslationsToObject;
//# sourceMappingURL=convert-translations-to-object.js.map