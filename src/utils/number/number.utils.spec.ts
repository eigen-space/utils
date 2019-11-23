import { NumberUtils } from './number.utils';

describe('NumberUtils', () => {

    describe('#roundBySignificantDigits', () => {

        it('should return rounded numeric value that less than 1 to default 3 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(0.789)).toEqual(0.789);
            expect(NumberUtils.roundBySignificantDigits(0.0789)).toEqual(0.0789);
            expect(NumberUtils.roundBySignificantDigits(0.00789)).toEqual(0.00789);
            expect(NumberUtils.roundBySignificantDigits(0.000789)).toEqual(0.000789);
            expect(NumberUtils.roundBySignificantDigits(0.0000789)).toEqual(0.0000789);
            expect(NumberUtils.roundBySignificantDigits(0.00000789)).toEqual(0.00000789);
            expect(NumberUtils.roundBySignificantDigits(0.00001205)).toEqual(0.0000121);
            expect(NumberUtils.roundBySignificantDigits(0.0005423)).toEqual(0.000542);
        });

        it('should return rounded numeric value that between -1 and 0 to default 3 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(-0.789)).toEqual(-0.789);
            expect(NumberUtils.roundBySignificantDigits(-0.0789)).toEqual(-0.0789);
            expect(NumberUtils.roundBySignificantDigits(-0.00789)).toEqual(-0.00789);
            expect(NumberUtils.roundBySignificantDigits(-0.000789)).toEqual(-0.000789);
            expect(NumberUtils.roundBySignificantDigits(-0.00000789)).toEqual(-0.00000789);
            expect(NumberUtils.roundBySignificantDigits(-0.0000789)).toEqual(-0.0000789);
            expect(NumberUtils.roundBySignificantDigits(-0.00001205)).toEqual(-0.000012);
            expect(NumberUtils.roundBySignificantDigits(-0.0005423)).toEqual(-0.000542);
        });

        it('should return 0 if value less than minimum value', () => {
            expect(NumberUtils.roundBySignificantDigits(-0.000000999)).toEqual(0);
            expect(NumberUtils.roundBySignificantDigits(0.000000999)).toEqual(0);
        });

        it('should return rounded numeric value that bigger than 1 to default 3 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(9)).toEqual(9);
            expect(NumberUtils.roundBySignificantDigits(99)).toEqual(99);
            expect(NumberUtils.roundBySignificantDigits(999)).toEqual(999);
            expect(NumberUtils.roundBySignificantDigits(9999)).toEqual(10000);
            expect(NumberUtils.roundBySignificantDigits(999999999)).toEqual(1000000000);
        });

        it('should return rounded numeric value ' +
            'that whole number and less than 1 to default 3 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(-9)).toEqual(-9);
            expect(NumberUtils.roundBySignificantDigits(-99)).toEqual(-99);
            expect(NumberUtils.roundBySignificantDigits(-999)).toEqual(-999);
            expect(NumberUtils.roundBySignificantDigits(-9999)).toEqual(-10000);
            expect(NumberUtils.roundBySignificantDigits(-999999999)).toEqual(-1000000000);
        });

        it('should return rounded numeric float value that bigger than 1000 to default 3 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(8888.0789)).toEqual(8890);
            expect(NumberUtils.roundBySignificantDigits(88888.0789)).toEqual(88900);
            expect(NumberUtils.roundBySignificantDigits(888888.0789)).toEqual(889000);
            expect(NumberUtils.roundBySignificantDigits(8888888.0789)).toEqual(8890000);
            expect(NumberUtils.roundBySignificantDigits(88888888.0789)).toEqual(88900000);
            expect(NumberUtils.roundBySignificantDigits(888888888.0789)).toEqual(889000000);
        });

        it('should return rounded numeric value that between 1 and 1000 to default 3 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(8.0789)).toEqual(8.08);
            expect(NumberUtils.roundBySignificantDigits(88.0789)).toEqual(88.1);
            expect(NumberUtils.roundBySignificantDigits(888.0789)).toEqual(888);
            expect(NumberUtils.roundBySignificantDigits(9.87654)).toEqual(9.88);
            expect(NumberUtils.roundBySignificantDigits(98.7654)).toEqual(98.8);
            expect(NumberUtils.roundBySignificantDigits(987.654)).toEqual(988);
            expect(NumberUtils.roundBySignificantDigits(-12.345789)).toEqual(-12.3);
            expect(NumberUtils.roundBySignificantDigits(-5.1654615)).toEqual(-5.17);
            expect(NumberUtils.roundBySignificantDigits(-561.814)).toEqual(-562);
        });

        it('should do nothing if there is not valid value', () => {
            expect(NumberUtils.roundBySignificantDigits('')).toEqual('');
            expect(NumberUtils.roundBySignificantDigits('-')).toEqual('-');
            // @ts-ignore
            expect(isNaN(NumberUtils.roundBySignificantDigits(NaN))).toBeTruthy();
            // @ts-ignore
            expect(NumberUtils.roundBySignificantDigits(null)).toEqual(null);
            // @ts-ignore
            expect(NumberUtils.roundBySignificantDigits(undefined)).toEqual(undefined);
        });

        it('should return 0 if input value is 0', () => {
            expect(NumberUtils.roundBySignificantDigits(0)).toEqual(0);
        });
    });
});