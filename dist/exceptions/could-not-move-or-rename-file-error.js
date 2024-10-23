var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var CouldNotMoveOrRenameFileError = /** @class */ (function (_super) {
    __extends(CouldNotMoveOrRenameFileError, _super);
    function CouldNotMoveOrRenameFileError(sourceFile, targetFile, error) {
        return _super.call(this, "Some problem occurred while move or rename ".concat(sourceFile, " to ").concat(targetFile, ": \n ").concat(error.message)) || this;
    }
    return CouldNotMoveOrRenameFileError;
}(Error));
export { CouldNotMoveOrRenameFileError };
//# sourceMappingURL=could-not-move-or-rename-file-error.js.map