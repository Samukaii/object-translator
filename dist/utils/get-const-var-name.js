import { kebabToSnake } from "./kebab-to-snake.js";
import { applicationConfig } from "../core/application-config.js";
export var getConstVarName = function (fileName) {
    var config = applicationConfig.get();
    var file = fileName.split("/").at(-1);
    var suffix = config.translationSuffix ? '-' + config.translationSuffix : '';
    return "".concat(kebabToSnake("".concat(file).concat(suffix)).toUpperCase());
};
//# sourceMappingURL=get-const-var-name.js.map