import { ConvertMethod } from '../constants';

const convertToCamel = (str: string) => {
  return str.replace(/_\w{1}/g, (match) => {
    return match[1].toUpperCase();
  })
}

const convertToSnake = (str: string) => {
  return str.replace(/[A-Z]{1}/g, (match) => {
    return '_' + match.toLowerCase();
  })
}

const convertKeys = (method: ConvertMethod) => (
  (obj: Record<string, any>) => {

    const modified: Record<string, any> = {};

    Object.entries(obj).forEach(([key, val]) => {
      const newKey =
        method === ConvertMethod.TO_SNAKE_CASE ?
          convertToSnake(key)
          : convertToCamel(key);
      modified[newKey] = val;
    });

    return modified;
  }
);

const convertKeysToSnake = convertKeys(ConvertMethod.TO_SNAKE_CASE);
const convertKeysToCamel = convertKeys(ConvertMethod.TO_CAMEL_CASE);


export {
  convertKeysToSnake,
  convertKeysToCamel
};
