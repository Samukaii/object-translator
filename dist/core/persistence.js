import os from "node:os";
import fs from "node:fs";
var baseFolder = function () {
    return "".concat(os.homedir(), "/translator");
};
var save = function (path, content) {
    var dir = baseFolder();
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync("".concat(dir, "/").concat(path, ".json"), content);
};
var read = function (path) {
    var dir = baseFolder();
    fs.mkdirSync(dir, { recursive: true });
    var result;
    try {
        var file = fs.readFileSync("".concat(dir, "/").concat(path, ".json"), 'utf-8');
        result = JSON.parse(file);
    }
    catch (e) { }
    return result;
};
export var persistence = {
    save: save,
    read: read,
    baseFolder: baseFolder
};
//# sourceMappingURL=persistence.js.map