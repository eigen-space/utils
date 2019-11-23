import { ObjectUtils } from './object.utils';
import { Dictionary } from '@eigenspace/common-types';

describe('ObjectUtils', () => {

    describe('#deepMerge', () => {

        it('should merge top level of properties', () => {
            const object1 = { field1: 'someValue1', field3: 'someValueA' };
            const object2 = { field2: 'someValue2', field3: 'someValueB' };

            const resultObject = ObjectUtils.deepMerge(object1, object2);

            expect(resultObject.field1).toEqual('someValue1');
            expect(resultObject.field2).toEqual('someValue2');
            expect(resultObject.field3).toEqual('someValueB');
        });

        it('should merge top level of properties if they are arrays', () => {
            const object1 = {
                field1: 'someValue1', errors: ['error1', 'error2', 'error3', 'error4']
            };
            const object2 = {
                errors: ['error1', 'error2']
            };

            const resultObject = ObjectUtils.deepMerge(object1, object2);

            expect(resultObject.field1).toEqual('someValue1');
            expect(resultObject.errors).toEqual(['error1', 'error2']);
        });

        it('should merge nested level of properties', () => {
            const object1 = {
                field1: {
                    nestedField1: 'someValue1',
                    nestedField3: { nestedField1: 'someValueA', nestedField2: 'someValueC' }
                }
            };
            const object2 = {
                field1: {
                    nestedField2: 'someValue2',
                    nestedField3: { nestedField1: 'someValueB' }
                }
            };

            const resultObject = ObjectUtils.deepMerge(object1, object2);

            expect(resultObject.field1.nestedField1).toEqual('someValue1');
            expect(resultObject.field1.nestedField2).toEqual('someValue2');
            expect(resultObject.field1.nestedField3.nestedField1).toEqual('someValueB');
            expect(resultObject.field1.nestedField3.nestedField2).toEqual('someValueC');
        });

        it('should merge nested level of properties if there is no root property in origin object', () => {
            const object1 = {
                field1: {
                    nestedField1: 'someValue1',
                    nestedField3: { nestedField1: 'someValueA' }
                }
            };
            const object2 = {
                field2: {
                    nestedField2: 'someValue2',
                    nestedField3: { nestedField1: 'someValueB' }
                }
            };

            const resultObject = ObjectUtils.deepMerge(object1, object2);

            expect(resultObject.field1.nestedField1).toEqual('someValue1');
            expect(resultObject.field1.nestedField3.nestedField1).toEqual('someValueA');
            expect(resultObject.field2.nestedField2).toEqual('someValue2');
            expect(resultObject.field2.nestedField3.nestedField1).toEqual('someValueB');
        });

        it('should replace array property with primitive type during merge', () => {
            const object1 = {
                field1: [
                    'someValue1',
                    'someValue2'
                ]
            };
            const object2 = {
                field1: [
                    'someValue1',
                    'someValue3'
                ]
            };

            const resultObject = ObjectUtils.deepMerge(object1, object2);

            expect(resultObject.field1.length).toEqual(2);
            expect(resultObject.field1[0]).toEqual('someValue1');
            expect(resultObject.field1[1]).toEqual('someValue3');
        });

        it('should replace array property with objects during merge', () => {
            const object1 = { field1: [{ field2: 'someValue2' }] };
            const object2 = { field1: [{ field3: 'someValue3' }] };

            const resultObject = ObjectUtils.deepMerge(object1, object2);

            expect(resultObject.field1.length).toEqual(1);
            expect(resultObject.field1[0].field3).toEqual('someValue3');
        });

        it('should use falsy values of origin object if another object does not contain such fields', () => {
            const object1 = {
                field1: 0,
                field2: false,
                field3: '',
                field4: null,
                field5: undefined
            };
            const object2 = {};

            const resultObject = ObjectUtils.deepMerge(object1, object2);

            expect(resultObject.field1).toEqual(0);
            expect(resultObject.field2).toEqual(false);
            expect(resultObject.field3).toEqual('');
            expect(resultObject.field4).toBeNull();
            expect(resultObject.field5).toBeUndefined();
        });

        it('should use falsy values of another object', () => {
            const object1 = {
                field1: 1,
                field2: true,
                field3: 'value',
                field4: {},
                field5: {}
            };
            const object2 = {
                field1: 0,
                field2: false,
                field3: '',
                field4: null,
                field5: undefined
            };

            const resultObject = ObjectUtils.deepMerge(object1, object2);

            expect(resultObject.field1).toEqual(0);
            expect(resultObject.field2).toEqual(false);
            expect(resultObject.field3).toEqual('');
            expect(resultObject.field4).toBeNull();
            expect(resultObject.field5).toBeUndefined();
        });
    });

    describe('#deepFill', () => {

        it('should fill top level of properties', () => {
            const sample = { field1: 'someValue1', field3: 'someValueA' };
            const dataSource = { field2: 'someValue2', field3: 'someValueB' };

            const resultObject = ObjectUtils.deepFill(sample, dataSource);

            expect(resultObject.hasOwnProperty('field1')).toBeTruthy();
            expect(resultObject.field1).toBeUndefined();
            expect(resultObject.hasOwnProperty('field2')).toBeFalsy();
            expect(resultObject.field3).toEqual('someValueB');
        });

        it('should fill nested level of properties', () => {
            const sample = {
                field1: {
                    nestedField1: 'someValue1',
                    nestedField3: { nestedField1: 'someValueA' }
                }
            };
            const dataSource = {
                field1: {
                    nestedField2: 'someValue2',
                    nestedField3: { nestedField1: 'someValueB' }
                }
            };

            const resultObject = ObjectUtils.deepFill(sample, dataSource);

            expect(resultObject.field1.hasOwnProperty('nestedField1')).toBeTruthy();
            expect(resultObject.field1.nestedField1).toBeUndefined();
            expect(resultObject.field1.hasOwnProperty('nestedField2')).toBeFalsy();
            expect(resultObject.field1.nestedField3.nestedField1).toEqual('someValueB');
        });

        it('should reset properties if there is no root property in origin object', () => {
            const sample = {
                field1: {
                    nestedField1: 'someValue1',
                    nestedField3: { nestedField1: 'someValueA' }
                }
            };
            const dataSource = {
                field2: {
                    nestedField2: 'someValue2',
                    nestedField3: { nestedField1: 'someValueB' }
                }
            };

            const resultObject = ObjectUtils.deepFill(sample, dataSource);

            expect(resultObject.hasOwnProperty('field1')).toBeTruthy();
            expect(resultObject.field1).toBeUndefined();
            expect(resultObject.hasOwnProperty('field2')).toBeFalsy();
        });

        it('should replace array property of primitives during filling', () => {
            const sample = {
                field1: [
                    'someValue1',
                    'someValue2'
                ]
            };
            const dataSource = {
                field1: [
                    'someValue1',
                    'someValue3'
                ]
            };

            const resultObject = ObjectUtils.deepFill(sample, dataSource);

            expect(resultObject.field1.length).toEqual(2);
            expect(resultObject.field1[0]).toEqual('someValue1');
            expect(resultObject.field1[1]).toEqual('someValue3');
        });

        it('should replace array property of objects during filling', () => {
            const sample = { field1: [{ field1: 'someValue1', field2: 'someValue2' }] };
            const dataSource = {
                field1: [
                    { field1: 'newSomeValue1.1', field3: 'newSomeValue1.3' },
                    { field1: 'newSomeValue2.1', field2: 'newSomeValue2.2' }
                ]
            };

            const resultObject = ObjectUtils.deepFill(sample, dataSource);

            expect(resultObject.field1).toEqual([
                { field1: 'newSomeValue1.1', field2: undefined },
                { field1: 'newSomeValue2.1', field2: 'newSomeValue2.2' }
            ]);
        });

        it('should replace value of sample object with null value from data source object', () => {
            const sample = { field1: 'someValue1' };
            const dataSource = { field1: null };

            const resultObject = ObjectUtils.deepFill(sample, dataSource);

            expect(resultObject.field1).toBeNull();
        });

        it('should replace value of sample object with undefined value from data source object', () => {
            const sample = { field1: 'someValue1' };
            const dataSource = { field1: undefined };

            const resultObject = ObjectUtils.deepFill(sample, dataSource);

            expect(resultObject.field1).toBeUndefined();
        });

        it('should replace value of sample object with falsy value from data source object', () => {
            const sample = { field1: 'someValue1', field2: 1, field3: true };
            const dataSource = { field1: '', field2: 0, field3: false };

            const resultObject = ObjectUtils.deepFill(sample, dataSource);

            expect(resultObject.field1).toEqual('');
            expect(resultObject.field2).toEqual(0);
            expect(resultObject.field3).toEqual(false);
        });

        it('should replace primitive value of sample with object field of data source', () => {
            const sample = { field1: 'someValue1' };
            const dataSource = {
                field1: { nestedField: 'someValue' }
            };

            const resultObject = ObjectUtils.deepFill(sample, dataSource);

            expect(resultObject.field1).toEqual(dataSource.field1);
        });
    });

    describe('#deepCopy', () => {

        it('should create new object by a given object', () => {
            const origin = { field: 'value' };

            const copy = ObjectUtils.deepCopy(origin);

            expect(copy).not.toBe(origin);
            expect(copy).toEqual(origin);
        });

        it('should create new objects through all hierarchy levels of a given object, i.e. deep copy', () => {
            const originNestedObj = { nestedField: 'nestedValue' };
            const origin = { field: 'value', nested: originNestedObj };

            const copy = ObjectUtils.deepCopy(origin);

            expect(copy.nested).not.toBe(originNestedObj);
            expect(copy.nested).toEqual(originNestedObj);
        });

        it('should treat array as object and create its copy', () => {
            const origin = [{ field: 'value' }];

            const copy = ObjectUtils.deepCopy(origin);

            expect(copy).not.toBe(origin);
            expect(copy).toEqual(origin);
        });

        it('should do nothing if input parameter is not an object', () => {
            const origin = 'some value';
            const copy = ObjectUtils.deepCopy(origin);
            expect(copy).toBe(origin);
        });
    });

    describe('#createObjectByPropertyString', () => {

        it('should create object with value', () => {
            const object = ObjectUtils.createObjectByPropertyString('property', 5);
            expect(object).toEqual({ property: 5 });
        });

        it('should create object with nested structure with value', () => {
            const object = ObjectUtils.createObjectByPropertyString('property.nestedProperty', [1, 2]);
            expect(object.property).toEqual({ nestedProperty: [1, 2] });
        });

        it('should create object with long nested structure with value', () => {
            const object = ObjectUtils.createObjectByPropertyString('a.b.c.d.e.f', 1);

            const expectedObject = {
                a: {
                    b: {
                        c: {
                            d: {
                                e: { f: 1 }
                            }
                        }
                    }
                }
            };
            expect(object).toEqual(expectedObject);
        });
    });

    describe('#match', () => {
        const item = {
            id: 'route.stop-1234051',
            entityType: 'Route.Stop',
            type: 'BACKWARDS'
        };

        it('should return true if rules are empty', () => {
            expect(ObjectUtils.flatMatch(item, {})).toBeTruthy();
        });

        it('should return true if item is match rules', () => {
            expect(ObjectUtils.flatMatch(item, { entityType: 'Route.Stop', type: 'BACKWARDS' })).toBeTruthy();
        });

        it('should return false if we test nested fields', () => {
            const nestedItem = {
                nestedField: { value: 'nestedValue' }
            } as unknown as Dictionary<string>;
            const nestedRules = {
                nestedField: { value: 'nestedValue' }
            } as unknown as Dictionary<string>;

            expect(ObjectUtils.flatMatch(nestedItem, nestedRules)).toBeFalsy();
        });

        it('should return false if item is not match rules', () => {
            expect(ObjectUtils.flatMatch(item, { entityType: 'Route.Trip', type: 'BACKWARDS' })).toBeFalsy();
        });

        it('should return false if at least one property is undefined', () => {
            expect(ObjectUtils.flatMatch(item, { entityType: 'Route.Trip', state: 'warning' })).toBeFalsy();
        });

        it('should return false if there is empty object on input', () => {
            expect(ObjectUtils.flatMatch({}, { entityType: 'Route.Trip', state: 'warning' })).toBeFalsy();
        });
    });

    describe('#filter', () => {
        const list = [
            { key: 'stop01', state: 'ACTIVE', type: 'FORWARD' },
            { key: 'stop02', state: 'ACTIVE', type: 'BACKWARD' },
            { key: 'stop03', state: 'ACTIVE', type: 'FORWARD' },
            { key: 'stop04', state: 'ACTIVE', type: 'BREAK' },
            { key: 'stop05', state: 'DISABLED', type: 'FORWARD' },
            { key: 'stop06', state: 'DISABLED', type: 'BACKWARD' }
        ];

        it('should return empty result if there is no list', () => {
            expect(ObjectUtils.flatFilter([], {})).toEqual([]);
        });

        it('should do not iterate through items and return the same list if there is no filter object', () => {
            expect(ObjectUtils.flatFilter(list, undefined as unknown as Dictionary<string>)).toBe(list);
            expect(ObjectUtils.flatFilter(list, null as unknown as Dictionary<string>)).toBe(list);
            expect(ObjectUtils.flatFilter(list, {})).toBe(list);
        });

        it('should filter list by specified filter object by one field', () => {
            expect(ObjectUtils.flatFilter(list, { type: 'FORWARD' })).toEqual([
                { key: 'stop01', state: 'ACTIVE', type: 'FORWARD' },
                { key: 'stop03', state: 'ACTIVE', type: 'FORWARD' },
                { key: 'stop05', state: 'DISABLED', type: 'FORWARD' }
            ]);
        });

        it('should filter list by specified filter object by multiple fields', () => {
            expect(ObjectUtils.flatFilter(list, { type: 'FORWARD', state: 'ACTIVE' })).toEqual([
                { key: 'stop01', state: 'ACTIVE', type: 'FORWARD' },
                { key: 'stop03', state: 'ACTIVE', type: 'FORWARD' }
            ]);
        });

        it('should return empty array if we filter with nested rules', () => {
            const nestedList = [
                {
                    field: {
                        nestedField: { type: 'type1', state: 'ACTIVE' }
                    }
                },
                {
                    field: {
                        nestedField: { type: 'type1', state: 'DISABLED' }
                    }
                },
                {
                    field: {
                        nestedField: { type: 'type2', state: 'ACTIVE' }
                    }
                }
            ] as unknown as Dictionary<string>[];
            const nestedRules = {
                field:
                    {
                        nestedField: { type: 'type1' }
                    }
            } as unknown as Dictionary<string>;

            expect(ObjectUtils.flatFilter(nestedList, nestedRules)).toEqual([]);
        });
    });
});