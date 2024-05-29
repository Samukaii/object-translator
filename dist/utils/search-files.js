import { getDirectories } from "../core/get-directories.js";
export var searchFiles = function (search) {
    var directories = getDirectories();
    return directories.filter(function (directory) { var _a; return directory.toLowerCase().includes((_a = search === null || search === void 0 ? void 0 : search.toLowerCase()) !== null && _a !== void 0 ? _a : ""); });
};
//# sourceMappingURL=search-files.js.map