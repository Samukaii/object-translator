import fs from "fs";
import path from "node:path";
import { applicationConfig } from "./application-config.js";
export var getDirectories = function () {
    var _a = applicationConfig.get(), basePath = _a.basePath, sourceLanguage = _a.sourceLanguage;
    var dir = "".concat(basePath, "/").concat(sourceLanguage.folderName);
    var files = [];
    var list = function (currentDir) {
        var items = fs.readdirSync(currentDir, { withFileTypes: true });
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var fullPath = path.join(currentDir, item.name);
            if (item.isDirectory()) {
                list(fullPath);
            }
            else {
                files.push(fullPath.replace("".concat(dir, "/"), '').replace('-translate.ts', ''));
            }
        }
    };
    list(dir);
    return files;
};
//# sourceMappingURL=get-directories.js.map