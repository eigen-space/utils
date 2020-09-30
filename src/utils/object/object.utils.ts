/**
 * Contains utility methods to process objects.
 * It is used to avoid extending of object prototype.
 */
import { AnyDictionary, Dictionary } from '@eigenspace/common-types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DataType = any;

export class ObjectUtils {
    /**
     * Makes deep merge of specified objects.
     * It adds new properties from objectToMerge to baseObject,
     * replaces values of existing properties of baseObject.
     *
     * @param baseObject Base object. It is not changed by this method.
     * @param objectToMerge Object to merge.
     * @returns New result object.
     */
    static deepMerge(baseObject: AnyDictionary, objectToMerge: AnyDictionary): AnyDictionary {
        if (typeof objectToMerge !== 'object' || objectToMerge instanceof Array || !objectToMerge || !baseObject) {
            return objectToMerge;
        }

        const resultObject = ObjectUtils.deepCopy(baseObject);
        Object.keys(objectToMerge)
            .forEach(key => {
                resultObject[key] = ObjectUtils.deepMerge(resultObject[key], objectToMerge[key]);
            });

        return resultObject;
    }

    /**
     * Copies data from object `dataSource` to object `sample`,
     * i.e. object `sample` is a structure that should be field with data
     * from data source.
     * If key exists in sample object and data source, value from data source
     * is copied to result object.
     * If key exists only in sample object, value of sample object is overwritten
     * with empty value (undefined).
     * If key exists only in data source, it does not matter and it is ignored.
     *
     * @param sample Defines structure of result object.
     * @param dataSource Defines data of result object.
     * @returns Object that has structure of sample and data of data source.
     */
    // Be careful with null, it is treated as type 'object'
    static deepFill(sample: AnyDictionary, dataSource: AnyDictionary): AnyDictionary {
        const isDataSourcePrimitive = typeof dataSource !== 'object';
        const isSamplePrimitive = typeof sample !== 'object';

        if (isDataSourcePrimitive || dataSource == null || isSamplePrimitive || sample == null) {
            return dataSource;
        }

        const resultObject = ObjectUtils.deepCopy(sample);
        Object.keys(sample)
            .forEach(key => {
                if (resultObject[key] instanceof Array) {
                    const itemTemplate = resultObject[key][0];
                    resultObject[key] = dataSource[key] && dataSource[key].map((item: AnyDictionary) =>
                        ObjectUtils.deepFill(itemTemplate, item)
                    );
                    return;
                }

                resultObject[key] = ObjectUtils.deepFill(resultObject[key], dataSource[key]);
            });

        return resultObject;
    }

    /**
     * Makes silly copy of object, so we loose type of object and it is nested objects.
     *
     * @param obj Object to copy.
     * @param obj Object to copy.
     * @returns Deep copy of object without any origin types.
     */
    // TODO: type mess, here should be any type
    static deepCopy(obj: unknown): AnyDictionary {
        return typeof obj === 'object' ? JSON.parse(JSON.stringify(obj)) : obj;
    }

    static createObjectByPropertyString(objectProperty: String, value: unknown): AnyDictionary {
        const properties = objectProperty.split('.');
        let createdObject = { [properties.pop() as string]: value };

        while (properties.length) {
            createdObject = { [properties.pop() as string]: createdObject };
        }

        return createdObject;
    }

    static flatMatch(item: Dictionary<string>, rules: Dictionary<string>): boolean {
        const isObject = typeof item === 'object';
        return isObject ? Object.keys(rules).every(property => item[property] === rules[property]) : false;
    }

    static flatFilter(list: Dictionary<string>[], rules: Dictionary<string>): Dictionary<string>[] {
        const verifiedList = list || [];
        const verifiedRules = rules || {};
        const keys = Object.keys(verifiedRules);

        if (!keys.length) {
            return verifiedList;
        }

        return verifiedList.filter(item => ObjectUtils.flatMatch(item, verifiedRules));
    }

    /**
     * Recursively converts each field of object into desired convection.
     * Applies replacer function to each field of passed object.
     *
     * @param data Object.
     * @param replacer Function to convert string.
     * @returns Object with replaced fields.
     */
    static convertObjectKeys(data: DataType, replacer: (key: string) => string): DataType {
        if (!Boolean(data) || typeof data !== 'object' || !Object.keys(data).length) {
            return data;
        }

        const isArray = Array.isArray(data);
        const processedData = isArray ? [] : {} as AnyDictionary;

        Object.keys(data)
            .forEach(key => {
                if (isArray) {
                    processedData[key] = this.convertObjectKeys(data[key], replacer);
                    return;
                }

                processedData[replacer(key)] = this.convertObjectKeys(data[key], replacer);
            });

        return processedData;
    }
}
