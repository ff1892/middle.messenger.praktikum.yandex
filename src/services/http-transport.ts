import { queryStringify } from '../utils/query-stringify';
import { ApiMethod } from '../constants';

type Options = Record<string, any>;
type HTTPMethod = (url: string, options?: Options) => Promise<XMLHttpRequest>;

class HTTPTransport {

  get: HTTPMethod = (url, options = {}) => {
    const getUrl = !!options.data ?
      url + queryStringify(options.data)
      : url;
    return this.request(getUrl, { ...options, method: ApiMethod.GET }, options.timeout)
  };

  post: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: ApiMethod.POST }, options.timeout)
  );

  put: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: ApiMethod.PUT }, options.timeout)
  );

  delete: HTTPMethod = (url, options = {}) => (
    this.request(url, { ...options, method: ApiMethod.DELETE }, options.timeout)
  );

  private request(url:string, options: Options = {}, timeout = 5000): Promise<XMLHttpRequest> {

    const {
      headers = {},
      method,
      data,
      json = false,
    } = options;

    return new Promise((resolve, reject) => {

      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const isGet = method === ApiMethod.GET;

      const xhr = new XMLHttpRequest();

      xhr.open(method, url);
      xhr.withCredentials = true;

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if(xhr.status < 300) {
          resolve(xhr)
        } else {
          reject(xhr);
        }
      };

      xhr.onabort = () => reject(xhr);
      xhr.onerror = () => reject(xhr);

      xhr.timeout = timeout;
      xhr.ontimeout = () => reject(xhr);

      if (isGet || !data) {
        xhr.send();
      } else if (json) {
        xhr.send(JSON.stringify(data));
      } else {
        xhr.send(data);
      }
    });
  }
}

const httpTransport = new HTTPTransport();

export { httpTransport };
