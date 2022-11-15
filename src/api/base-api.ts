import { httpTransport } from '../services/http-transport';
import { HEADERS_DEFAULT, BASE_URL } from '../constants';

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
    return newOptions.headers ?
      newOptions
      : { ...newOptions, headers: HEADERS_DEFAULT }
  }

  private _getUrl(url: string) {
    return this._baseApi + this._parentUrl + url;
  }

  get: MethodType = (url, options?) => {
    return this._http.get(
      this._getUrl(url),
      this._setOptions(options),
    )
  }

  post: MethodType = (url, options?) => {
    return this._http.post(
      this._getUrl(url),
      this._setOptions(options),
    )
  }
}

export { BaseAPI };
