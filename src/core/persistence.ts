import os from "node:os";
import fs from "node:fs";

const baseFolder = () => {
    return `${os.homedir()}/translator`;
}

const save = (path: string, content: string) => {
    const dir = baseFolder();

    fs.mkdirSync(dir, {recursive: true});

    fs.writeFileSync(`${dir}/${path}.json`, content);
};

const read = <T>(path: string) => {
    const dir = baseFolder();

    fs.mkdirSync(dir, {recursive: true});

    let result: T | undefined;

    try {
        const file = fs.readFileSync(`${dir}/${path}.json`, 'utf-8');

        result = JSON.parse(file) as T;
    }
    catch (e) {}

    return result;
};


export const persistence = {
    save,
    read,
    baseFolder
}