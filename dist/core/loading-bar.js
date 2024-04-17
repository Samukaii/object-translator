"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadingBar = void 0;
const loading_cli_1 = __importDefault(require("loading-cli"));
let instance;
const loadingBar = () => {
    if (!instance)
        instance = (0, loading_cli_1.default)("Creating translations...".blue);
    return instance;
};
exports.loadingBar = loadingBar;
//# sourceMappingURL=loading-bar.js.map