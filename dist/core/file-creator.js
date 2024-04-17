"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileCreator = void 0;
const stringify_object_1 = require("../utils/stringify-object");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const stringfy = (obj) => (0, stringify_object_1.stringifyObject)(obj, {
    indent: "\t",
    singleQuotes: false
});
const create = (obj, varName, fileName) => {
    const fileContent = `export const ${varName} = ${stringfy(obj)};`;
    const dirName = node_path_1.default.dirname(fileName);
    node_fs_1.default.mkdirSync(dirName, { recursive: true });
    node_fs_1.default.writeFileSync(fileName, fileContent, 'utf8');
};
exports.fileCreator = {
    create
};
//# sourceMappingURL=file-creator.js.map