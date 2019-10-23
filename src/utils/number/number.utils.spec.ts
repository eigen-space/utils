import { NumberUtils } from './number.utils';

describe('NumberUtils', () => {

    describe('#NumberUtils.roundBySignificantDigits', () => {

        it('should return rounded numeric value that less than 1 to default 6 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(0.789)).toEqual(0.789);
            expect(NumberUtils.roundBySignificantDigits(0.0789)).toEqual(0.0789);
            expect(NumberUtils.roundBySignificantDigits(0.00789)).toEqual(0.00789);
            expect(NumberUtils.roundBySignificantDigits(0.000789)).toEqual(0.000789);
            expect(NumberUtils.roundBySignificantDigits(0.0000789)).toEqual(0.0000789);
            expect(NumberUtils.roundBySignificantDigits(0.00000789)).toEqual(0.00000789);
            expect(NumberUtils.roundBySignificantDigits(0.00001205)).toEqual(0.00001205);
            expect(NumberUtils.roundBySignificantDigits(0.0005423)).toEqual(0.0005423);
            expect(NumberUtils.roundBySignificantDigits(0.0005423123)).toEqual(0.000542312);
            expect(NumberUtils.roundBySignificantDigits(0.5423123)).toEqual(0.542312);
        });

        it('should return rounded numeric value that between -1 and 0 to default 6 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(-0.789)).toEqual(-0.789);
            expect(NumberUtils.roundBySignificantDigits(-0.0789)).toEqual(-0.0789);
            expect(NumberUtils.roundBySignificantDigits(-0.00789)).toEqual(-0.00789);
            expect(NumberUtils.roundBySignificantDigits(-0.000789)).toEqual(-0.000789);
            expect(NumberUtils.roundBySignificantDigits(-0.0000789)).toEqual(-0.0000789);
            expect(NumberUtils.roundBySignificantDigits(-0.00000789)).toEqual(-0.00000789);
            expect(NumberUtils.roundBySignificantDigits(-0.00001205)).toEqual(-0.00001205);
            expect(NumberUtils.roundBySignificantDigits(-0.0005423)).toEqual(-0.0005423);
            expect(NumberUtils.roundBySignificantDigits(-0.0005423123)).toEqual(-0.000542312);
            expect(NumberUtils.roundBySignificantDigits(-0.5423123)).toEqual(-0.542312);
        });

        it('should return rounded numeric value that bigger than 1 to default 6 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(9)).toEqual(9);
            expect(NumberUtils.roundBySignificantDigits(99)).toEqual(99);
            expect(NumberUtils.roundBySignificantDigits(999)).toEqual(999);
            expect(NumberUtils.roundBySignificantDigits(9999)).toEqual(9999);
            expect(NumberUtils.roundBySignificantDigits(99999)).toEqual(99999);
            expect(NumberUtils.roundBySignificantDigits(999999)).toEqual(999999);
            expect(NumberUtils.roundBySignificantDigits(9999999)).toEqual(10000000);
            expect(NumberUtils.roundBySignificantDigits(99999999)).toEqual(100000000);
            expect(NumberUtils.roundBySignificantDigits(999999999)).toEqual(1000000000);
        });

        it('should return rounded numeric value ' +
            'that whole number and less than 1 to default 6 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(-9)).toEqual(-9);
            expect(NumberUtils.roundBySignificantDigits(-99)).toEqual(-99);
            expect(NumberUtils.roundBySignificantDigits(-999)).toEqual(-999);
            expect(NumberUtils.roundBySignificantDigits(-9999)).toEqual(-9999);
            expect(NumberUtils.roundBySignificantDigits(-99999)).toEqual(-99999);
            expect(NumberUtils.roundBySignificantDigits(-999999)).toEqual(-999999);
            expect(NumberUtils.roundBySignificantDigits(-9999999)).toEqual(-10000000);
            expect(NumberUtils.roundBySignificantDigits(-99999999)).toEqual(-100000000);
            expect(NumberUtils.roundBySignificantDigits(-999999999)).toEqual(-1000000000);
        });

        it('should return rounded numeric float value that bigger than 1000 to default 6 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(8888.0789)).toEqual(8888.08);
            expect(NumberUtils.roundBySignificantDigits(88888.0789)).toEqual(88888.1);
            expect(NumberUtils.roundBySignificantDigits(888888.0789)).toEqual(888888);
            expect(NumberUtils.roundBySignificantDigits(8888888.0789)).toEqual(8888890);
            expect(NumberUtils.roundBySignificantDigits(88888888.0789)).toEqual(88888900);
            expect(NumberUtils.roundBySignificantDigits(888888888.0789)).toEqual(888889000);
        });

        it('should return rounded numeric value that between 1 and 1000 to default 6 significant digits', () => {
            expect(NumberUtils.roundBySignificantDigits(8.0789)).toEqual(8.0789);
            expect(NumberUtils.roundBySignificantDigits(88.0789)).toEqual(88.0789);
            expect(NumberUtils.roundBySignificantDigits(888.0789)).toEqual(888.079);
            expect(NumberUtils.roundBySignificantDigits(888.00789)).toEqual(888.008);
            expect(NumberUtils.roundBySignificantDigits(9.8763254)).toEqual(9.87633);
            expect(NumberUtils.roundBySignificantDigits(98.763254)).toEqual(98.7633);
            expect(NumberUtils.roundBySignificantDigits(987.65324)).toEqual(987.653);
            expect(NumberUtils.roundBySignificantDigits(-12.345789)).toEqual(-12.3458);
            expect(NumberUtils.roundBySignificantDigits(-5.1654615)).toEqual(-5.16546);
            expect(NumberUtils.roundBySignificantDigits(-561.81344)).toEqual(-561.813);
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