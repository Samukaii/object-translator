import loading from "loading-cli";
var instance;
export var loadingBar = function () {
    if (!instance)
        instance = loading("Creating translations...".blue);
    return instance;
};
//# sourceMappingURL=loading-bar.js.map