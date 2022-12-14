type Indexed<T = any> = {
  [key in string]: T;
};

const isObject = (value:Indexed | unknown) => {
  const type = typeof value;
  return value !== null && (type === 'object' || type === 'function');
};

export { isObject };
