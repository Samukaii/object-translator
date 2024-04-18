export var convertTranslationsToObject = function (data) {
    var result = {};
    data.forEach(function (item) {
        var keys = item.path.split('.');
        var currentObj = result;
        keys.forEach(function (key, index) {
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
//# sourceMappingURL=convert-translations-to-object.js.map