import { BaseAPI } from './base-api';
import { ApiRoute } from '../constants';
import { LoginModel, SignupModel } from '../types/data-model';

class AuthAPI extends BaseAPI {
  constructor() {
    super(ApiRoute.AUTH);
  }

  signup(data: SignupModel) {
    return this.post(
      ApiRoute.AUTH_SIGNUP,
      { json: true, data },
    )
  }

  login(data: LoginModel) {
    return this.post(
      ApiRoute.AUTH_LOGIN,
      { json: true, data },
    );
  }

  logout() {
    return this.post(ApiRoute.AUTH_LOGOUT);
  }

  getUser() {
    return this.get(ApiRoute.AUTH_USER);
  }
}

const authAPI = new AuthAPI();

export { authAPI };
