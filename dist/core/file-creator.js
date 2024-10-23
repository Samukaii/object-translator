import {stringifyObject} from "../utils/stringify-object.js";
import path from "node:path";
import fs from "node:fs";
import {CouldNotMoveOrRenameFileError} from "../exceptions/could-not-move-or-rename-file-error.js";

var stringfy = function (obj) { return stringifyObject(obj, {
    indent: "\t",
    singleQuotes: false
}); };
var create = function (obj, varName, fileName) {
    var fileContent = "export const ".concat(varName, " = ").concat(stringfy(obj), ";");
    var dirName = path.dirname(fileName);
    fs.mkdirSync(dirName, { recursive: true });
    fs.writeFileSync(fileName, fileContent, 'utf8');
};
var moveOrRename = function (sourceFile, targetFile) {
    var dirName = path.dirname(targetFile);
    fs.mkdirSync(dirName, { recursive: true });
    fs.rename(sourceFile, targetFile, function (error) {
        if (error)
            throw new CouldNotMoveOrRenameFileError(sourceFile, targetFile, error);
    });
};
export var fileCreator = {
    create: create,
    moveOrRename: moveOrRename
};
//# sourceMappingURL=file-creator.js.map