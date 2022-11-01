import queryStringify from '../utils/query-stringify';
import { ApiMethod } from '../constants';

type Options = Record<string, any>;

class HTTPTransport {

  get(url:string, options: Options = {}) {
    return this.request(
      url,
      { ...options, method: ApiMethod.GET },
      options.timeout,
    );
  }

  post(url: string, options: Options = {}) {
    return this.request(
      url,
      { ...options, method: ApiMethod.POST },
      options.timeout,
    );
  }

  put(url: string, options: Options = {}) {
    return this.request(
      url,
      { ...options, method: ApiMethod.PUT },
      options.timeout,
    );
  }

  delete(url:string, options: Options = {}) {
    return this.request(
      url,
      { ...options, method: ApiMethod.DELETE },
      options.timeout,
    );
  }

  request(
    url:string,
    options: Options = {},
    timeout = 5000,
  ) {

    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {

      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === ApiMethod.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  }
}

export default HTTPTransport;
