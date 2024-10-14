export const replaceAll = (text: string, regex: RegExp, replaceText: string) => {
    const matches = Array.from(text.matchAll(regex));
    let replaced = text;

    matches.forEach((match) => {
        replaced = replaced.replace(match[0], replaceText);
    });

    return replaced;
}
