import { CommonUtils } from './common.utils';

describe('CommonUtils', () => {

    describe('#generateUniqueId', () => {

        it('should generate unique numbers', () => {
            const numberA = CommonUtils.generateUniqueId();
            const numberB = CommonUtils.generateUniqueId();

            expect(numberA).not.toBe(numberB);
        });

        it('should generate the number', () => {
            const number = CommonUtils.generateUniqueId();
            expect(typeof number).toBe('number');
        });
    });

    describe('#deepCopy', () => {

        it('should create new object by a given object', () => {
            const origin = { field: 'value' };

            const copy = CommonUtils.deepCopy(origin);

            expect(copy).not.toBe(origin);
            expect(copy).toEqual(origin);
        });

        it('should create new objects through all hierarchy levels of a given object, i.e. deep copy', () => {
            const originNestedObj = { nestedField: 'nestedValue' };
            const origin = { field: 'value', nested: originNestedObj };

            const copy = CommonUtils.deepCopy(origin);

            expect(copy.nested).not.toBe(originNestedObj);
            expect(copy.nested).toEqual(originNestedObj);
        });

        it('should treat array as object and create its copy', () => {
            const origin = [{ field: 'value' }];

            const copy = CommonUtils.deepCopy(origin);

            expect(copy).not.toBe(origin);
            expect(copy).toEqual(origin);
        });

        it('should do nothing if input parameter is not an object', () => {
            const origin = 'some value';
            // tslint:disable-next-line:no-any
            const copy = CommonUtils.deepCopy(origin as any);
            expect(copy).toBe(origin);
        });
    });

    describe('#debounce', () => {
        const debounceTime = 100;

        it('should call function after bounce time is over', done => {
            const request = jest.fn();
            const debouncedFunc: (arg: string) => void = CommonUtils.debounce(request, debounceTime);
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

        it('should call function after bounce time is over after call', done => {
            expect.hasAssertions();
            const request = jest.fn();
            const debouncedFunc: (arg: string) => void = CommonUtils.debounce(request, debounceTime);
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