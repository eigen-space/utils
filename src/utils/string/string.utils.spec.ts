import { StringUtils } from './string.utils';

describe('StringUtils', () => {

    describe('#convertFirstLetterToLowerCase', () => {

        it('should convert first letter to lower case', () => {
            expect(StringUtils.convertFirstLetterToLowerCase('SortingRule')).toEqual('sortingRule');
        });
    });

    describe('#convertFirstLetterToUpperCase', () => {

        it('should convert first letter to upper case', () => {
            expect(StringUtils.convertFirstLetterToUpperCase('sortingRule')).toEqual('SortingRule');
        });
    });

    describe('#camelCaseToUnderscore', () => {

        it('should convert to underscore', () => {
            expect(StringUtils.camelCaseToUnderscore('sortingRuleProgress')).toEqual('sorting_rule_progress');
        });

        it('should stay uppercase as uppercase', () => {
            expect(StringUtils.camelCaseToUnderscore('WINTER')).toEqual('WINTER');
        });

        // TODO: A little bit strange spec. If we really need such stuff for some concrete purpose, for instance,
        // IDS, so we should consider to create separate special method
        it('should return input value back if it contains no-latin or digits character', () => {
            expect(StringUtils.camelCaseToUnderscore('back2universe')).toEqual('back2universe');
            expect(StringUtils.camelCaseToUnderscore('названиеМетодаMethod')).toEqual('названиеМетодаMethod');
        });

        it('should return the same value if there are only 1 word', () => {
            expect(StringUtils.camelCaseToUnderscore('name')).toEqual('name');
        });
    });

    describe('#camelCaseToUpperUnderscore', () => {

        it('should convert to upper underscore', () => {
            expect(StringUtils.camelCaseToUpperUnderscore('sortingRuleProgress')).toEqual('SORTING_RULE_PROGRESS');
            expect(StringUtils.camelCaseToUpperUnderscore('name')).toEqual('NAME');
        });
    });

    describe('#camelCaseToSentence', () => {

        it('should convert camel case to sentence', () => {
            expect(StringUtils.camelCaseToSentence('sortingRuleProgress')).toEqual('sorting rule progress');
        });
    });

    describe('#doTemplate', () => {

        it('should replace all template keys', () => {
            const string = ':key :actual is :key :expected';
            const props = { key: 'number', actual: '10', expected: '20' };

            expect(StringUtils.doTemplate(string, props)).toEqual('number 10 is number 20');
        });
    });

    describe('#underscoreToCamelCase', () => {

        it('should convert upper case underscore string to lower camel case', () => {
            expect(StringUtils.underscoreToCamelCase('ATTRIBUTE_ENTITY_PROP')).toEqual('attributeEntityProp');
        });

        it('should convert to lower case one upper case word', () => {
            expect(StringUtils.underscoreToCamelCase('ATTRIBUTE')).toEqual('attribute');
        });

        it('should not convert to lower case one upper case word if we disable it', () => {
            expect(StringUtils.underscoreToCamelCase('PLAN', false)).toEqual('PLAN');
        });

        it('should return empty string if input is empty (null, undefined, empty string)', () => {
            expect(StringUtils.underscoreToCamelCase(null as unknown as string)).toEqual('');
            expect(StringUtils.underscoreToCamelCase(undefined as unknown as string)).toEqual('');
            expect(StringUtils.underscoreToCamelCase('')).toEqual('');
        });

        it('should return input string as is if it does not contain underscore', () => {
            expect(StringUtils.underscoreToCamelCase('emergencyFields')).toEqual('emergencyFields');
        });
    });

    describe('#kebabCaseToCamelCase', () => {

        it('should convert kebab case string to lower camel case', () => {
            expect(StringUtils.kebabCaseToCamelCase('attribute-entity-prop')).toEqual('attributeEntityProp');
        });

        it('should convert upper kebab case string to lower camel case', () => {
            expect(StringUtils.kebabCaseToCamelCase('ATTRIBUTE-ENTITY-PROP')).toEqual('attributeEntityProp');
        });

        it('should convert to lower case one upper case word', () => {
            expect(StringUtils.kebabCaseToCamelCase('ATTRIBUTE')).toEqual('attribute');
        });

        it('should not convert to lower case one upper case word if we disable it', () => {
            expect(StringUtils.kebabCaseToCamelCase('PLAN', false)).toEqual('PLAN');
        });

        it('should return empty string if input is empty (null, undefined, empty string)', () => {
            expect(StringUtils.kebabCaseToCamelCase(null as unknown as string)).toEqual('');
            expect(StringUtils.kebabCaseToCamelCase(undefined as unknown as string)).toEqual('');
            expect(StringUtils.kebabCaseToCamelCase('')).toEqual('');
        });

        it('should return input string as is if it does not contain kebabCaseToCamelCase', () => {
            expect(StringUtils.kebabCaseToCamelCase('emergencyFields')).toEqual('emergencyFields');
        });
    });

    describe('#pointSeparatedToCamelCase', () => {

        it('should convert point separated string to camel case', () => {
            const field = 'generate.facilityInfo.name';
            expect(StringUtils.pointSeparatedToCamelCase(field)).toEqual('generateFacilityInfoName');
        });

        it('should convert point separated string to camel case', () => {
            expect(StringUtils.pointSeparatedToCamelCase('Schedule.Site')).toEqual('ScheduleSite');
        });
    });

    describe('#toKebabCase', () => {

        it('should convert upper snake case to kebab case', () => {
            expect(StringUtils.underscoreToKebabCase('PLANE_CURRENT_TYPE')).toEqual('plane-current-type');
        });

        it('should return empty string if input is empty (null, undefined, empty string)', () => {
            expect(StringUtils.underscoreToKebabCase(null as unknown as string)).toEqual('');
            expect(StringUtils.underscoreToKebabCase(undefined as unknown as string)).toEqual('');
            expect(StringUtils.underscoreToKebabCase('')).toEqual('');
        });
    });

    describe('#underscoreToPascalCase', () => {

        it('should convert one-word string to pascal case', () => {
            expect(StringUtils.underscoreToPascalCase('simple')).toEqual('Simple');
        });

        it('should convert to pascal case from underscore', () => {
            expect(StringUtils.underscoreToPascalCase('simple_word')).toEqual('SimpleWord');
        });

        it('should return empty string if input is empty (null, undefined, empty string)', () => {
            expect(StringUtils.underscoreToPascalCase(null as unknown as string)).toEqual('');
            expect(StringUtils.underscoreToPascalCase(undefined as unknown as string)).toEqual('');
            expect(StringUtils.underscoreToPascalCase('')).toEqual('');
        });
    });

    describe('#insertSubStr', () => {

        describe('should return input string as is', () => {

            it('if incorrect index', () => {
                expect(StringUtils.insertSubStr('entryStr', -5, 0, 'newStr')).toEqual('entryStr');

            });

            it('if sub string is undefined', () => {
                expect(StringUtils.insertSubStr('entryStr', 2, 3)).toEqual('entryStr');
            });
        });

        it('should return sub string if empty input string', () => {
            expect(StringUtils.insertSubStr('', 4, 5, 'newStr' )).toEqual('newStr');
        });

        it('should return correct string', () => {
            expect(StringUtils.insertSubStr('entryStr', 5, 5, 'New')).toEqual('entryNewStr');
            expect(StringUtils.insertSubStr('entryStr', 5, 7, 'New')).toEqual('entryNewr');
        });
    });
});
