import { LoginModel } from '../types/data-model';
import { Route } from '../constants';
import { BaseController } from './base-controller';
import { authAPI } from '../api/auth-api';
import { store } from '../services/store';

class AuthController extends BaseController {

  login(e: SubmitEvent, data: LoginModel) {
    this.showLoader();
    return authAPI.login(data)
      .then(() => {
        this.clearInputs(e);
        this.redirect(Route.CHAT);
      })
      .catch(this.onError)
      .finally(this.hideLoader);
  }

  checkUser() {
    return authAPI.getUser()
      .then((user) => {
        store.setState('currentUser', user );
      })
      .catch((error) => {
        this.onError(error);
        this.redirect(Route.LOGIN);
      })
  }

  checkHiddenAuth() {
    return authAPI.getUser()
      .then(() => {
        this.redirect(Route.CHAT);
      })
      .catch((error) => {
        this.onError(error);
      })
  }
}

const authController = new AuthController();

export { authController };