import {loadingBar} from "../core/loading-bar.js";
import {fileCreator} from "../core/file-creator.js";
import {applicationConfig} from "../core/application-config.js";
import inquirer from "inquirer";
import {getFullPath} from "../core/get-full-path.js";
import {joinItems} from "../utils/join-items.js";
import {getObjectVarName} from "../utils/get-object-var-name.js";
import {getConstVarName} from "../utils/get-const-var-name.js";

const createFiles = async (file: string) => {
    const config = applicationConfig.get();

    const languages = joinItems(config.languages.map(language => language.label));

    const message = `Creating files for languages ${languages}`.blue;

    const loading = loadingBar();

    loading.start(message);

    for (let index = 0; index < config.languages.length; index++) {
        const language = config.languages[index];

        fileCreator.create(
            {[getObjectVarName(file)]: {}},
            getConstVarName(file),
            getFullPath(file, language.folderName)
        );

        loading.succeed(` Succesfully created ${language.label} file`.green);
    }

    console.log('\n');

    config.languages.forEach(language => {
        const languageLabel = `${language.label} translations`;
        const path = getFullPath(file, language.folderName);

        console.log(`${languageLabel.blue} => ${path.yellow}`);
    });

    loading.stop();
}

export const translationNew = async () => {
    const result = await inquirer.prompt([
        {
            type: "input",
            name: "path",
            message: "Choose a file path name (kebab-case)",
        },
    ]);

    await createFiles(result["path"])
};
