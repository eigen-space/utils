import { URL } from 'url';
import { Url } from '@eigenspace/common-types';

export class UrlUtils {

    static parse(url: Url): URL {
        return new URL(url);
    }
}