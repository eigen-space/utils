import { AnyDictionary } from '@eigenspace/common-types';

export class CommonUtils {

    /**
     * Generate an unique number.
     */
    static generateUniqueId(): number {
        return Date.now() + Math.random();
    }

    /**
     * Makes silly copy of object, so we loose type of object and it is nested objects.
     *
     * @param obj Object to copy.
     * @returns Deep copy of object without any origin types.
     */
    static deepCopy(obj: AnyDictionary): AnyDictionary {
        return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
    }

    /**
     * Returns the new object without functions.
     *
     * The target use case:
     * In React we need to pass properties to styled component (e.g. div) for
     * apply some style depended on properties. Props may contain the handlers
     * like: onValueChange and it will be rendered as <div onValueChange={...}/>.
     * React will tell us about it with error: Unknown event handler property.
     *
     * @param props
     */
    static getNotInvokable<T = AnyDictionary>(props: T): T {
        if (!props) {
            return props;
        }

        return Object.keys(props)
            .reduce((result: T, key: string) => {
                // @ts-ignore
                const isFunction = typeof props[key] === 'function';
                // @ts-ignore
                return isFunction ? result : { ...result, [key]: props[key] };
            }, {} as T);
    }
}