import { AnyDictionary } from '@eigenspace/common-types';
import snakeCase from 'lodash.snakecase';
import camelCase from 'lodash.camelcase';
import kebabCase from 'lodash.kebabcase';

export class StringUtils {

    static convertFirstLetterToLowerCase(str: string): string {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    static convertFirstLetterToUpperCase(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static toSnakeCase(str: string): string {
        return snakeCase(str);
    }

    static toUpperSnakeCase(str: string): string {
        return StringUtils.toSnakeCase(str).toUpperCase();
    }

    static toCamelCase(str: string): string {
        return camelCase(str);
    }

    static toKebabCase(str: string): string {
        return kebabCase(str);
    }

    static toPascalCase(str: string): string {
        const strInCamelCase = StringUtils.toCamelCase(str);
        return StringUtils.convertFirstLetterToUpperCase(strInCamelCase);
    }

    static pointSeparatedToCamelCase(str: string): string {
        return str.replace(new RegExp('(\\.[a-zA-Z])', 'g'), StringUtils.uppercaseSecondLetter);
    }

    static camelCaseToSentence(str: string): string {
        if (typeof str as unknown !== 'string') {
            return str;
        }

        const hasNonLatinOrDigitChars = new RegExp('[^a-zA-Z0-9]+', 'g').test(str);
        if (hasNonLatinOrDigitChars) {
            return str;
        }

        if (!new RegExp('^[^a-z]*$', 'g').test(str)) {
            return str.replace(new RegExp('([A-Z])', 'g'), ($1) => ` ${$1.toLowerCase()}`);
        }

        return str;
    }

    static doTemplate(content: string, props: AnyDictionary): string {
        let result = content;
        Object.keys(props)
            .forEach(key => result = result.replace(new RegExp(`:${key}`, 'g'), props[key]));
        return result;
    }

    static insertSubStr(str: string, start: number, end: number, subStr?: string): string {
        if (start == null || start < 0 || end == null || subStr == null) {
            return str;
        }

        return (str || '').substr(0, start) + subStr + str.substr(end);
    }

    private static uppercaseSecondLetter(value: string): string {
        return value[1].toUpperCase();
    }
}
