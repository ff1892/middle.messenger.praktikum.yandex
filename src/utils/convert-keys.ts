import { isObject } from './is-object';
import { ConvertMethod } from '../constants';

const convertToCamel = (str: string) => str.replace(/_\w{1}/g, (match) => match[1].toUpperCase());

const convertToSnake = (str: string) => str.replace(/[A-Z]{1}/g, (match) => `_${match.toLowerCase()}`);

const convertKeys = (method: ConvertMethod) => (
  (data: Record<string, any>) => {

    if (!isObject(data)) {
      return data;
    }

    const modified: Record<string, any> = {};

    Object.entries(data).forEach(([key, val]) => {
      let [newKey, newVal] = [key, val];

      if (isObject(val)) {
        newVal = convertKeys(method)(newVal);
      }

      newKey = method === ConvertMethod.TO_SNAKE_CASE
        ? convertToSnake(key)
        : convertToCamel(key);
      modified[newKey] = newVal;
    });

    return modified;
  }
);

const convertKeysToSnake = convertKeys(ConvertMethod.TO_SNAKE_CASE);
const convertKeysToCamel = convertKeys(ConvertMethod.TO_CAMEL_CASE);

export {
  convertKeysToSnake,
  convertKeysToCamel,
};
