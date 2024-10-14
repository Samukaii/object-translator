export var joinItems = function (items) {
    var last = items.pop();
    return "".concat(items.join(", ")).concat(last ? ' and ' + last : '');
};
//# sourceMappingURL=join-items.js.map