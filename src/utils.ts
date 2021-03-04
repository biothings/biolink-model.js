export function underscore(input: string): string {
    if (typeof input === "string") {
        return input.replace(/ /g, '_');
    }
    return undefined;
}