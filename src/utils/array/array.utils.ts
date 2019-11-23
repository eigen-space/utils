export class ArrayUtils {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static insert(col: any[], item: any, position: number): any[] {
        return [...col.slice(0, position), item, ...col.slice(position)];
    }
}
