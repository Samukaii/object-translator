export interface ApplicatonConfig {
    basePath: string;
    translationSuffix: string;
    sourceLanguage: {
        label: string,
        value: string,
        folderName: string
    };
    languages: {
        label: string,
        value: string,
        folderName: string
    }[];
}
