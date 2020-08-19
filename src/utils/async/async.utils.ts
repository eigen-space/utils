import Timer = NodeJS.Timer;
import { FunctionWithAnyArguments } from '../../@types/function';
import { Milliseconds } from '../../@types/units';

export class AsyncUtils {
    private static BATCH_SIZE = 10;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async executeByBatch<T>(asyncFn: Function, args: any[], batchSize = AsyncUtils.BATCH_SIZE): Promise<T[]> {
        const results: T[] = [];
        for (let i = 0; i < args.length; i += batchSize) {

            const batchRequest = [];
            for (let j = i; j < i + batchSize && j < args.length; ++j) {
                batchRequest.push(asyncFn(args[j]));
            }

            const batchResult = await Promise.all(batchRequest);
            results.push(...batchResult);
        }

        return results;
    }

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

    /**
     * Iterates through array asynchronous.
     *
     * @param array - the array of data we want to iterate
     * @param callback - function that will be invoked with each item of array
     */
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    static async asyncForEach(array: any[], callback: (item: any, index: number) => Promise<any>): Promise<void> {
        for (let index = 0; index < array.length; index++) {
            await callback(array[index], index);
        }
    }
}
