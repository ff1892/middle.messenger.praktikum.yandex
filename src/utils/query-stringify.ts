const queryStringify = (data: Record<any, any>): string => {

  if (typeof data !== 'object') {
    return '';
  }

  return `?${Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`;
};

export { queryStringify };
