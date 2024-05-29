import {getDirectories} from "../core/get-directories.js";

export const searchFiles = (search: string) => {
    const directories = getDirectories();

    return directories.filter(directory => directory.toLowerCase().includes(search?.toLowerCase() ?? ""));
}