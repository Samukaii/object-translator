import fs from "fs";
import path from "node:path";
import {applicationConfig} from "./application-config.js";

export const getDirectories = () => {
    const {basePath, sourceLanguage} = applicationConfig.get();

    const dir = `${basePath}/${sourceLanguage.folderName}`;
    const files: string[] = [];

    const list = (currentDir: string) => {
        const items = fs.readdirSync(currentDir, { withFileTypes: true });

        for (const item of items) {
            const fullPath = path.join(currentDir, item.name);

            if (item.isDirectory()) {
                list(fullPath);
            } else {
                files.push(fullPath.replace(`${dir}/`, '').replace('-translate.ts', ''));
            }
        }
    }

    list(dir);
    return files;
}