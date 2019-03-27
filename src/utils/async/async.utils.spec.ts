import { AsyncUtils } from './async.utils';

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
});
