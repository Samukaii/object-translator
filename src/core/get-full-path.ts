import {applicationConfig} from "./application-config.js";

export const getFullPath = (fileName: string, language: string) => {
    const config = applicationConfig.get();

    let file = fileName;
    let parentPath = "";

    if (fileName.includes("/")) {
        const splinted = fileName.split("/");

        file = splinted.at(-1)!;
        parentPath = splinted.slice(0, splinted.length - 1).join("/");
    }

    const suffix = config.translationSuffix ? '-' + config.translationSuffix : '';

    const parentPathConcat = parentPath ? `${parentPath}/` : '';
    file = file.replace(suffix, "");

    return `${config.basePath}/${language}/${parentPathConcat}${file}${suffix}.ts`;
}
