import { IsoDateTimeString } from '@eigenspace/common-types';

export class DateUtils {

    static getIsoDate(dateStr?: string): IsoDateTimeString {
        const date = dateStr || Date.now();
        return new Date(date).toISOString();
    }
}