export const joinItems = (items: string[]) => {
    const last = items.pop();

    return `${items.join(", ")}${last ? ' and ' + last : ''}`;
}
