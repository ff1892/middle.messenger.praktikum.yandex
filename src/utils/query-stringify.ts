const queryStringify = (data: Record<any, any>) => {

  if (typeof data !== "object") {
    return '';
  }

  return '?' + Object.entries(data)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');
}

export default queryStringify;
