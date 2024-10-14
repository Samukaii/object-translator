export var replaceAll = function (text, regex, replaceText) {
    var matches = Array.from(text.matchAll(regex));
    var replaced = text;
    matches.forEach(function (match) {
        replaced = replaced.replace(match[0], replaceText);
    });
    return replaced;
};
//# sourceMappingURL=replace-all.js.map