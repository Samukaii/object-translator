export const turnImportsIntoConstants = (text: string, value = '{}') => {
    const regex = /import\s*\{\s*(.*)}\s*from\s*["'].*["'];*/gm;

    const matches = Array.from(text.matchAll(regex));
    let replaced = text;

    matches.forEach((match) => {
        replaced = replaced.replace(match[0], `const ${match[1]} = ${value}`);
    });

    return replaced;
}
