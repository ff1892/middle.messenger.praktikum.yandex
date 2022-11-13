import { isObject } from './is-object';

type Indexed<T = any> = {
  [key in string]: T;
};

const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  const stack = new Set();

  Object.keys(rhs).forEach((key) => {
    let finalVal = rhs[key];

    if (!stack.has(finalVal)) {
      stack.add(finalVal);
      if (isObject(lhs[key] as Indexed) && isObject(rhs[key] as Indexed)) {
        finalVal = merge(lhs[key] as Indexed, rhs[key] as Indexed);
      }
      lhs[key] = finalVal;
      stack.delete(finalVal);
    }

  });

  return lhs;
};

const setObject = (
  object: Indexed | unknown,
  path: string,
  value: unknown,
): Indexed | unknown => {

  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object as Indexed, result);
};

export { setObject };
