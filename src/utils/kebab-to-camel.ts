export const kebabToCamel = (kebabCaseString: string): string => {
    const words = kebabCaseString.split('-');

    const camelWords = words.map((word, index) => {
        if (index === 0) {
            return word;
        } else {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    });

    return camelWords.join('');
}
