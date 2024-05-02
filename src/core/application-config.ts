import {ApplicatonConfig} from "../models/applicaton-config.js";
import {persistence} from "./persistence.js";
import {NoConfigFoundError} from "../exceptions/no-config-found-error.js";

let savedConfig: ApplicatonConfig | undefined;

const save = (config: ApplicatonConfig) => {
    persistence.save('config', JSON.stringify(config, null, 2));
    savedConfig = persistence.read<ApplicatonConfig>('config')!;
}

const get = () => {
    if(!savedConfig) savedConfig = persistence.read<ApplicatonConfig>('config');

    if(!savedConfig) {
        throw new NoConfigFoundError();
    }

    return savedConfig;
}

const filePath = () => {
    return `${persistence.baseFolder()}/config.json`;
};

export const applicationConfig = {
    save,
    get,
    filePath
}
