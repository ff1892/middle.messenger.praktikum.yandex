const baseIsEqual = (
  value: any,
  other: any,
  stack = new Map()
  ): boolean => {

  if (Object.is(value, other)) {
      return true;
  }
  if (value == null || other == null) {
      return false;
  }
  if (typeof value !== 'object' && typeof other !== 'object') {
      return false;
  }

  return isEqual(value, other, stack);
}


const isEqual = (
    value: Record<string, any>,
    other: Record<string, any>,
    stack = new Map()
  ): boolean => {

  if (stack.has(value)) {
    return stack.get(value) === other && stack.get(other) === value;
  }

  stack.set(value, other);
  stack.set(other, value);
  let result: boolean;

  const otherKeys = Object.keys(other);

  if (otherKeys.length !== Object.keys(value).length) {
        return false;
  }

  result = otherKeys.every((key) => {
    return baseIsEqual(value[key], other[key], stack);
  });

  stack.delete(value);
  stack.delete(other);

  return result;
}


export { isEqual };
