export class StringUtils {

    static convertFirstLetterToLowerCase(str: string): string {
        return str.charAt(0).toLowerCase() + str.slice(1);
    }

    static convertFirstLetterToUpperCase(str: string): string {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    static camelCaseToUnderscore(str: string): string {
        if (typeof str as unknown !== 'string') {
            return str;
        }

        // Do nothing for non latin or digit characters
        const hasNonLatinOrDigitChars = new RegExp('[^a-zA-Z0-9]+', 'g').test(str);
        if (hasNonLatinOrDigitChars) {
            return str;
        }

        if (!(new RegExp('^[^a-z]*$', 'g')).test(str)) {
            return str.replace(new RegExp('([A-Z])', 'g'), ($1) => `_${$1.toLowerCase()}`);
        }
        return str;
    }

    static camelCaseToUpperUnderscore(str: string): string {
        return StringUtils.camelCaseToUnderscore(str).toUpperCase();
    }

    static underscoreToCamelCase(str: string, shouldConvertUpperCase = true): string {
        const safeStr = str || '';

        const isSnakeCase = safeStr.includes('_');
        const shouldConvert = isSnakeCase || shouldConvertUpperCase && new RegExp('^[A-Z0-9]+$', 'g').test(safeStr);
        return shouldConvert ? safeStr.toLocaleLowerCase()
            .replace(new RegExp('_[a-z]', 'g'), StringUtils.uppercaseSecondLetter) : safeStr;
    }

    static pointSeparatedToCamelCase(str: string): string {
        return str.replace(new RegExp('(\\.[a-zA-Z])', 'g'), StringUtils.uppercaseSecondLetter);
    }

    static underscoreToKebabCase(str: string): string {
        return (str || '').toLowerCase().replace(new RegExp('_', 'g'), '-');
    }

    static underscoreToPascalCase(str: string): string {
        const strInCamelCase = StringUtils.underscoreToCamelCase(str);
        return StringUtils.convertFirstLetterToUpperCase(strInCamelCase);
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
