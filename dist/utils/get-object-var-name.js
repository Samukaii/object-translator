import { kebabToCamel } from "./kebab-to-camel.js";
export var getObjectVarName = function (fileName) {
    var file = fileName.split("/").at(-1);
    return kebabToCamel(file);
};
//# sourceMappingURL=get-object-var-name.js.map