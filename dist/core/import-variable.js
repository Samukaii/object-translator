import fs from "fs";
import { FileNotFoundError } from "../exceptions/file-not-found-error.js";
import { replaceAll } from "../utils/replace-all.js";
import { BadFormatFileError } from "../exceptions/bad-format-file-error.js";
export var importVariable = function (varName, path) {
    var _a;
    var content = '';
    try {
        content = fs.readFileSync(path, 'utf8');
    }
    catch (e) {
        throw new FileNotFoundError(path);
    }
    var withoutImports = replaceAll(content, /import\s*\{\s*.*}\s*from\s*["'].*["'];*/gm, '');
    var cleanText = replaceAll(withoutImports, /\.\.\..*,?/gm, '');
    var value = cleanText.substring(cleanText.indexOf("{"), cleanText.lastIndexOf('}') + 1);
    var variable = {};
    try {
        eval("variable = ".concat(value));
    }
    catch (e) {
        throw new BadFormatFileError(path);
    }
    return _a = {},
        _a[varName] = variable,
        _a;
};
//# sourceMappingURL=import-variable.js.map