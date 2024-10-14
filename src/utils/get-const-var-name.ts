import {kebabToSnake} from "./kebab-to-snake.js";
import {applicationConfig} from "../core/application-config.js";

export const getConstVarName = (fileName: string) => {
    const config = applicationConfig.get();
    const file = fileName.split("/").at(-1)!;
    const suffix = config.translationSuffix ? '-' + config.translationSuffix : '';

    return `${kebabToSnake(`${file}${suffix}`).toUpperCase()}`;
}
