import Timer = NodeJS.Timer;
import { FunctionWithAnyArguments } from '../../@types/function';
import { Milliseconds } from '../../@types/units';

export class AsyncUtils {

    /**
     * Invoke Promise only after deadTime was end.
     *
     * @param inner - function that will be call after dead time
     * @param deadTime - milliseconds after which inner function called
     */
    static debounce<T>(inner: FunctionWithAnyArguments<Promise<T>>, deadTime: Milliseconds): () => Promise<T> {
        let timer: Timer;
        let resolver: (result: Promise<T>) => void;

        return function (...args): Promise<T> {
            clearTimeout(timer);
            timer = setTimeout(() => resolver(inner(...args)), deadTime);
            return new Promise(r => resolver = r);
        };
    }
}