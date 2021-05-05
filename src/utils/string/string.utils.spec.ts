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

    describe('#toSnakeCase', () => {

        it('should convert camel case to snake case', () => {
            expect(StringUtils.toSnakeCase('sortingRuleProgress')).toEqual('sorting_rule_progress');
        });

        it('should convert kebab case to snake case', () => {
            expect(StringUtils.toSnakeCase('sorting-Rule-Progress')).toEqual('sorting_rule_progress');
        });

        it('should return the same value if there are only 1 word', () => {
            expect(StringUtils.toSnakeCase('name')).toEqual('name');
        });
    });

    describe('#toUpperSnakeCase', () => {

        it('should convert camel case to upper underscore', () => {
            expect(StringUtils.toUpperSnakeCase('sortingRuleProgress')).toEqual('SORTING_RULE_PROGRESS');
        });

        it('should convert kebab case to upper underscore', () => {
            expect(StringUtils.toUpperSnakeCase('sorting-Rule-Progress')).toEqual('SORTING_RULE_PROGRESS');
        });
    });

    describe('#toCamelCase', () => {

        it('should convert upper case underscore string to lower camel case', () => {
            expect(StringUtils.toCamelCase('ATTRIBUTE_ENTITY_PROP')).toEqual('attributeEntityProp');
        });

        it('should convert to lower case one upper case word', () => {
            expect(StringUtils.toCamelCase('ATTRIBUTE')).toEqual('attribute');
        });

        it('should convert kebab case string to lower camel case', () => {
            expect(StringUtils.toCamelCase('attribute-entity-prop')).toEqual('attributeEntityProp');
        });

        it('should convert upper kebab case string to lower camel case', () => {
            expect(StringUtils.toCamelCase('ATTRIBUTE-ENTITY-PROP')).toEqual('attributeEntityProp');
        });

        it('should convert to lower case one upper case word', () => {
            expect(StringUtils.toCamelCase('ATTRIBUTE')).toEqual('attribute');
        });
    });

    describe('#toKebabCase', () => {

        it('should convert upper snake case to kebab case', () => {
            expect(StringUtils.toKebabCase('PLANE_CURRENT_TYPE')).toEqual('plane-current-type');
        });

        it('should convert camel snake case to kebab case', () => {
            expect(StringUtils.toKebabCase('planeCurrentType')).toEqual('plane-current-type');
        });
    });

    describe('#toPascalCase', () => {

        it('should convert one-word string to pascal case', () => {
            expect(StringUtils.toPascalCase('simple')).toEqual('Simple');
        });

        it('should convert to pascal case from underscore', () => {
            expect(StringUtils.toPascalCase('simple_word')).toEqual('SimpleWord');
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

    describe('#pointSeparatedToCamelCase', () => {

        it('should convert point separated string to camel case', () => {
            const field = 'generate.facilityInfo.name';
            expect(StringUtils.pointSeparatedToCamelCase(field)).toEqual('generateFacilityInfoName');
        });

        it('should convert point separated string to camel case', () => {
            expect(StringUtils.pointSeparatedToCamelCase('Schedule.Site')).toEqual('ScheduleSite');
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
