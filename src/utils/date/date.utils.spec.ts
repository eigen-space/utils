import { DateUtils } from './date.utils';

describe('DateUtils', () => {

    describe('getIsoDate', () => {

        it('should convert date to iso format', () => {
            const date = 'Wed May 05 2021 12:00:00 GMT+0300';
            expect(DateUtils.getIsoDate(date)).toEqual('2021-05-05T09:00:00.000Z');
        });

        it('should convert current date to iso format by default', () => {
            Date.now = jest.fn(() => 1620205200000);
            expect(DateUtils.getIsoDate()).toEqual('2021-05-05T09:00:00.000Z');
        });
    });
});