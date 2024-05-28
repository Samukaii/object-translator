export var addItemToTranslations = function (items, newItem) {
    var scores = [];
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (item.path === newItem.path) {
            scores.push({ score: Infinity, index: i, translation: item });
            break;
        }
        var paths = newItem.path.split('.');
        var includes = false;
        while (paths.length !== 0 && !includes) {
            paths.pop();
            if (item.path.includes(paths.join('.')))
                includes = true;
        }
        if (!includes)
            continue;
        var score = paths.length;
        scores.push({ score: score, translation: item, index: i });
    }
    var bestScore = scores.reduce(function (accumulator, current) {
        return current.score > accumulator.score ? current : accumulator;
    }, { score: -1, index: -1, translation: {} });
    if (bestScore.score === -1)
        return;
    if (bestScore.translation.path === newItem.path)
        items.splice(bestScore.index, 1, newItem);
    else
        items.splice(bestScore.index, 0, newItem);
};
//# sourceMappingURL=add-item-to-translations.js.map