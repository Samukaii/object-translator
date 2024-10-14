import { applicationConfig } from "./application-config.js";
export var getFullPath = function (fileName, language) {
    var config = applicationConfig.get();
    var file = fileName;
    var parentPath = "";
    if (fileName.includes("/")) {
        var splinted = fileName.split("/");
        file = splinted.at(-1);
        parentPath = splinted.slice(0, splinted.length - 1).join("/");
    }
    var suffix = config.translationSuffix ? '-' + config.translationSuffix : '';
    var parentPathConcat = parentPath ? "".concat(parentPath, "/") : '';
    file = file.replace(suffix, "");
    return "".concat(config.basePath, "/").concat(language, "/").concat(parentPathConcat).concat(file).concat(suffix, ".ts");
};
//# sourceMappingURL=get-full-path.js.map