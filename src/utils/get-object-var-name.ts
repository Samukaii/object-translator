import {kebabToCamel} from "./kebab-to-camel.js";

export const getObjectVarName = (fileName: string) => {
    const file = fileName.split("/").at(-1)!;
    
    return kebabToCamel(file);
}
