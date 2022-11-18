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
    if (newOptions.data) {
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

    if(isObject(parsed)) {
      return convertKeysToCamel(parsed);
    }

    if(Array.isArray(parsed)) {
      return parsed.map(convertKeysToCamel);
    }

    return parsed;
  };

  get: MethodType = (url, options?) => {
    return this._http.get(
      this._getUrl(url),
      this._setOptions(options),
    )
    .then(this._parseResponse);
  }

  post: MethodType = (url, options?) => {
    return this._http.post(
      this._getUrl(url),
      this._setOptions(options),
    )
    .then(this._parseResponse);
  }
}

export { BaseAPI };
