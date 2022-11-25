import { httpTransport } from '../services/http-transport';
import { HEADERS_DEFAULT, BASE_URL } from '../constants';
import { isObject } from '../utils/is-object';
import { convertKeysToCamel, convertKeysToSnake } from '../utils/convert-keys';

type OptionsType = Record<string, any>;
type MethodType = (url: string, options?: OptionsType) => Promise<XMLHttpRequest>;

abstract class BaseAPI {
  private _http: typeof httpTransport;
  private _baseApi = BASE_URL;
  private _parentUrl: string;

  constructor(url: string) {
    this._parentUrl = url;
    this._http = httpTransport;
  }

  private _setOptions(options?: OptionsType): OptionsType {
    const newOptions = options || {};
    newOptions.headers ??= HEADERS_DEFAULT;
    if (newOptions.data && !newOptions.notConvert) {
      newOptions.data = convertKeysToSnake(newOptions.data);
    }
    return newOptions;
  }

  private _getUrl(url: string) {
    return this._baseApi + this._parentUrl + url;
  }

  private _parseResponse(res: XMLHttpRequest) {
    const { response } = res;

    if (response === 'OK') {
      return { ok: true };
    }

    const parsed = JSON.parse(response);

    if (Array.isArray(parsed)) {
      return parsed.map(convertKeysToCamel);
    }

    if (isObject(parsed)) {
      return convertKeysToCamel(parsed);
    }

    return parsed;
  }

  get: MethodType = (url, options?) => this._http.get(
    this._getUrl(url),
    this._setOptions(options),
  )
    .then(this._parseResponse);

  post: MethodType = (url, options?) => this._http.post(
    this._getUrl(url),
    this._setOptions(options),
  )
    .then(this._parseResponse);

  put: MethodType = (url, options?) => this._http.put(
    this._getUrl(url),
    this._setOptions(options),
  )
    .then(this._parseResponse);

  delete: MethodType = (url, options?) => this._http.delete(
    this._getUrl(url),
    this._setOptions(options),
  )
    .then(this._parseResponse);
}

export { BaseAPI };
