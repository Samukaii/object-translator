import {Generic, stringifyObject} from "../utils/stringify-object";
import path from "node:path";
import fs from "node:fs";

const stringfy = (obj: Generic) => stringifyObject(obj, {
    indent: "\t",
    singleQuotes: false
})

const create = (obj: Generic, varName: string, fileName: string) => {
    const fileContent = `export const ${varName} = ${stringfy(obj)};`;

    const dirName = path.dirname(fileName);

    fs.mkdirSync(dirName, {recursive: true});

    fs.writeFileSync(fileName, fileContent, 'utf8');
}

export const fileCreator = {
    create
};
