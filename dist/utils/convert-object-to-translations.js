export var convertObjectToTranslations = function (object) {
    var result = [];
    function traverse(obj, path) {
        if (path === void 0) { path = ""; }
        for (var key in obj) {
            if (typeof obj[key] === 'object') {
                traverse(obj[key], path ? "".concat(path, ".").concat(key) : key);
            }
            else {
                result.push({ path: path ? "".concat(path, ".").concat(key) : key, value: obj[key] });
            }
        }
    }
    traverse(object);
    return result;
};
//# sourceMappingURL=convert-object-to-translations.js.map