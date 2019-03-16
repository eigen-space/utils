import { Dictionary } from '../../common/types/dictionary';
import Milliseconds = jest.Milliseconds;
import Timer = NodeJS.Timer;
import { FunctionWithAnyArguments } from '../../@types/function';

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
    static deepCopy(obj: Dictionary): Dictionary {
        return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
    }

    /**
     * Invoke method only if it have been invoked more than dead time.
     *
     * @param method - function that will be call after dead time
     * @param deadTime - milliseconds after which method function called
     */
    static debounce(method: FunctionWithAnyArguments, deadTime: Milliseconds): FunctionWithAnyArguments {
        let timer: Timer;
        return function (...args): void {
            clearTimeout(timer);
            timer = setTimeout(() => method(...args), deadTime);
        };
    }

    /**
     * Returns the new object without the functions.
     *
     * The target use case:
     * In React we need to pass properties to styled component (e.g. div) for
     * apply some style depended on properties. Props may contain the handlers
     * like: onValueChange and it will be rendered as <div onValueChange={...}/>.
     * React will tell us about it with error: Unknown event handler property.
     *
     * @param props
     */
    static getNotInvokable(props: Dictionary): Dictionary {
        if (!props) {
            return props;
        }

        return Object.keys(props)
            .reduce((result, key) => {
                const isFunction = typeof props[key] === 'function';
                return isFunction ? result : { ...result, [key]: props[key] };
            }, {});
    }
}