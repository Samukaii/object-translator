export var kebabToCamel = function (kebabCaseString) {
    var words = kebabCaseString.split('-');
    var camelWords = words.map(function (word, index) {
        if (index === 0) {
            return word;
        }
        else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    });
    return camelWords.join('');
};
//# sourceMappingURL=kebab-to-camel.js.map