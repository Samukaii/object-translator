export var turnImportsIntoConstants = function (text, value) {
    if (value === void 0) { value = '{}'; }
    var regex = /import\s*\{\s*(.*)}\s*from\s*["'].*["'];*/gm;
    var matches = Array.from(text.matchAll(regex));
    var replaced = text;
    matches.forEach(function (match) {
        replaced = replaced.replace(match[0], "const ".concat(match[1], " = ").concat(value));
    });
    return replaced;
};
//# sourceMappingURL=turn-imports-into-constants.js.map