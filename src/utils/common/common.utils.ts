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
}