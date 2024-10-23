import {loadingBar} from "../core/loading-bar.js";
import {fileCreator} from "../core/file-creator.js";
import {applicationConfig} from "../core/application-config.js";
import inquirer from "inquirer";
import {getFullPath} from "../core/get-full-path.js";
import {joinItems} from "../utils/join-items.js";
import {getDirectories} from "../core/get-directories.js";

const moveOrRename = async (sourcePath: string, targetPath: string) => {
    const config = applicationConfig.get();

    const allLanguages = [
        ...config.languages,
        config.sourceLanguage
    ]

    const languages = joinItems(allLanguages.map(language => language.label));

    const message = `Moving or renaming files for ${languages}`.blue;

    const loading = loadingBar();

    loading.start(message);

    for (let index = 0; index < allLanguages.length; index++) {
        const language = allLanguages[index];

        fileCreator.moveOrRename(
            getFullPath(sourcePath, language.folderName),
            getFullPath(targetPath, language.folderName),
        );

        loading.succeed(` Succesfully moved or renamed ${language.label} file`.green);
    }

    console.log('\n');

    allLanguages.forEach(language => {
        const languageLabel = `${language.label} translations`;
        const path = getFullPath(targetPath, language.folderName);

        console.log(`${languageLabel.blue} => ${path.yellow}`);
    });

    loading.stop();
}

export const translationMove = async () => {
    const directories = getDirectories();

    const result = await inquirer.prompt([
        {
            type: "autocomplete",
            name: "source",
            message: "Choose a file path to move or rename",
            source: (_answers: any, input: string) => directories.filter(directory => {
                return directory.toLowerCase().includes(input?.toLowerCase() ?? "");
            }),
        },
        {
            type: "input",
            name: "target",
            message: "Choose a new path",
        },
    ]);


    await moveOrRename(result["source"], result['target'])
};
