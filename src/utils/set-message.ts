import { store } from '../services/store';
import { convertKeysToCamel } from './convert-keys';
import { isObject } from './is-object';

type Data = Record<string, any>;

export const setMessage = (data: Data): Data => {
  const isArray = Array.isArray(data);
  const messages = store.getState().messages;

  if (isArray && !data.length) {
    return [];
  }

  if (isArray && data[0].id === 1) {
    return data.map(convertKeysToCamel);
  }

  if (isArray && messages) {
    return [...data.map(convertKeysToCamel), ...messages];
  }

  if (isObject(data) && data.type === 'message' && messages) {
    return [convertKeysToCamel(data), ...messages];
  }

  return [null];
};

