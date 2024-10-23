import {Generic, stringifyObject} from "../utils/stringify-object.js";
import path from "node:path";
import fs from "node:fs";
import {CouldNotMoveOrRenameFileError} from "../exceptions/could-not-move-or-rename-file-error.js";

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

const moveOrRename = (sourceFile: string, targetFile: string) => {
    const dirName = path.dirname(targetFile);

    fs.mkdirSync(dirName, {recursive: true});

    fs.rename(sourceFile, targetFile, (error) => {
        if(error)
            throw new CouldNotMoveOrRenameFileError(sourceFile, targetFile, error);
    });
}

export const fileCreator = {
    create,
    moveOrRename
};
