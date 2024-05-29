import { persistence } from "./persistence.js";
import { NoConfigFoundError } from "../exceptions/no-config-found-error.js";
var savedConfig;
var save = function (config) {
    persistence.save('config', JSON.stringify(config, null, 2));
    savedConfig = persistence.read('config');
};
var get = function () {
    if (!savedConfig)
        savedConfig = persistence.read('config');
    if (!savedConfig) {
        throw new NoConfigFoundError();
    }
    return savedConfig;
};
var filePath = function () {
    return "".concat(persistence.baseFolder(), "/config.json");
};
export var applicationConfig = {
    save: save,
    get: get,
    filePath: filePath,
    exists: function () { return !!persistence.read('config'); }
};
//# sourceMappingURL=application-config.js.map