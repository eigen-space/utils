import { AsyncUtils } from './async.utils';
import { performance } from 'perf_hooks';

describe('AsyncUtils', () => {

    describe('debounce', () => {
        const debounceTime = 100;

        it('should do request after bounce time is over', done => {
            const request = jest.fn();
            const debouncedFunc: (arg: string) => void = AsyncUtils.debounce(request, debounceTime);
            debouncedFunc('1');
            debouncedFunc('2');

            const timeoutTime = 100;
            setTimeout(() => {
                expect(request).toHaveBeenCalledTimes(1);
                expect(request).toHaveBeenCalledWith('2');
                done();
            }, timeoutTime);

            expect(request).not.toBeCalled();
        });

        it('should do request after bounce time is over after last request', done => {
            expect.hasAssertions();
            const request = jest.fn();
            const debouncedFunc: (arg: string) => void = AsyncUtils.debounce(request, debounceTime);
            debouncedFunc('1');
            debouncedFunc('2');

            const timeoutTime = 200;
            setTimeout(() => {
                debouncedFunc('3');
                debouncedFunc('4');

                expect(request).toHaveBeenCalledTimes(1);
                expect(request).toHaveBeenCalledWith('2');
                done();
            }, timeoutTime);
        });
    });

    describe('#executeByBatch', () => {
        const args = [150, 200, 100, 40, 30];

        function someAsyncService(ms: number): Promise<number> {
            return new Promise(resolve => setTimeout(() => resolve(ms), ms));
        }

        it('should do async requests by batch and return result in the correct order', async () => {
            const result = await AsyncUtils.executeByBatch<number>(someAsyncService, args, 2);
            expect(result).toEqual(args);
        });

        it('should do nothing in no arguments in array is specified', async () => {
            const result = await AsyncUtils.executeByBatch<number>(someAsyncService, [], 3);
            expect(result).toEqual([]);
        });

        it('should do batch request faster than request in sequence', async () => {
            const startSequenceTime = performance.now();
            await AsyncUtils.executeByBatch<number>(someAsyncService, [], 1);
            const endSequenceTime = performance.now();
            const sequenceTime = endSequenceTime - startSequenceTime;

            const startBatchTime = performance.now();
            await AsyncUtils.executeByBatch<number>(someAsyncService, [], 3);
            const endBatchTime = performance.now();
            const batchTime = endBatchTime - startBatchTime;

            expect(batchTime).toBeLessThan(sequenceTime);
        });
    });
});
