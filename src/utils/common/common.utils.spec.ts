import { CommonUtils } from './common.utils';
import { AnyDictionary } from '@eigenspace/common-types';

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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const copy = CommonUtils.deepCopy(origin as any);
            expect(copy).toBe(origin);
        });
    });

    describe('#getNotInvokable', () => {
        let props: AnyDictionary;

        beforeEach(() => {
            // noinspection JSUnusedGlobalSymbols
            props = {
                onSuccess: () => {
                },
                onError: () => {
                }
            };
        });

        it('should return the same as passed if input data is not valid', () => {
            expect(CommonUtils.getNotInvokable(null)).toEqual(null);
        });

        it('should return empty object if all properties are functions', () => {
            expect(CommonUtils.getNotInvokable(props)).toEqual({});
        });

        it('should return filtered not-functional properties', () => {
            const dataProps = {
                data: { value: 12 },
                isFullWidth: false,
                rows: 3,
                title: 'BMW'
            };
            props = { ...props, ...dataProps };
            expect(CommonUtils.getNotInvokable(props)).toEqual(dataProps);
        });
    });
});