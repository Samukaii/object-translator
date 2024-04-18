import { stringifyObject } from "../utils/stringify-object.js";
import path from "node:path";
import fs from "node:fs";
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
export var fileCreator = {
    create: create
};
//# sourceMappingURL=file-creator.js.map