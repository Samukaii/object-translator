import {Translation} from "../models/translation.js";

export const addItemToTranslations = (items: Translation[], newItem: Translation) => {
    const scores: { score: number, translation: Translation, index: number }[] = [];

    for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item.path === newItem.path) {
            scores.push({score: Infinity, index: i, translation: item});
            break;
        }


        let paths = newItem.path.split('.');
        let includes: boolean = false;

        while (paths.length !== 0 && !includes) {
            paths.pop();

            if (item.path.includes(paths.join('.')))
                includes = true;
        }

        if (!includes) continue;

        const score = paths.length;

        scores.push({score, translation: item, index: i});
    }

    const bestScore = scores.reduce((accumulator, current) =>
            current.score > accumulator.score ? current : accumulator,
        {score: -1, index: -1, translation: {} as Translation})

    if (bestScore.score === -1) return;

    if (bestScore.translation.path === newItem.path)
        items.splice(bestScore.index, 1, newItem);
    else items.splice(bestScore.index, 0, newItem);
};