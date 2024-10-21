import fs from "fs";
import { FileNotFoundError } from "../exceptions/file-not-found-error.js";
import { BadFormatFileError } from "../exceptions/bad-format-file-error.js";
import { turnImportsIntoConstants } from "../utils/turn-imports-into-constants.js";
export var importVariable = function (varName, path) {
    var _a;
    var _b, _c;
    var content = '';
    try {
        content = fs.readFileSync(path, 'utf8');
    }
    catch (e) {
        throw new FileNotFoundError(path);
    }
    var cleanText = turnImportsIntoConstants(content);
    var regex = new RegExp("export const ".concat(varName, "\\s*=\\s*"));
    var variableDeclarationStart = (_c = (_b = cleanText.match(regex)) === null || _b === void 0 ? void 0 : _b[0]) !== null && _c !== void 0 ? _c : '';
    var variable = {};
    try {
        var expression = cleanText.replace(variableDeclarationStart, 'variable = ');
        eval(expression);
    }
    catch (e) {
        throw new BadFormatFileError(path);
    }
    return _a = {},
        _a[varName] = variable,
        _a;
};
//# sourceMappingURL=import-variable.js.map