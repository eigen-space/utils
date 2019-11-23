import { ArrayUtils } from './array.utils';

describe('ArrayUtils', () => {

    describe('#insert', () => {
        const collection = [1, 2, 3, 4, 5, 6, 7, 8];

        it('should return new collection with inserted item in specified position', () => {
            expect(ArrayUtils.insert(collection, 88, 4)).toEqual([1, 2, 3, 4, 88, 5, 6, 7, 8]);
        });

        it('should return new collection with inserted item in the start if position is less than 0', () => {
            expect(ArrayUtils.insert(collection, 88, -21)).toEqual([88, 1, 2, 3, 4, 5, 6, 7, 8]);
        });

        it(`should return new collection with inserted item in the start if position 
        is greater than collection length`, () => {
            expect(ArrayUtils.insert(collection, 88, 21)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 88]);
        });
    });
});