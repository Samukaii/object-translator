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
var BadFormatFileError = /** @class */ (function (_super) {
    __extends(BadFormatFileError, _super);
    function BadFormatFileError(path) {
        return _super.call(this, "The structure of file \"".concat(path, "\" is not an acceptable format wich usually can cause bad ") +
            "parsing issues") || this;
    }
    return BadFormatFileError;
}(Error));
export { BadFormatFileError };
//# sourceMappingURL=bad-format-file-error.js.map