import { LoginModel, SignupModel } from '../types/data-model';
import { Route } from '../constants';
import { BaseController } from './base-controller';
import { authAPI } from '../api/auth-api';
import { store } from '../services/store';
import { chatsController } from './chats-controller';

class AuthController extends BaseController {

  login(e: SubmitEvent, data: LoginModel) {
    this.showLoader();
    return authAPI.login(data)
      .then(() => {
        this.clearInputs(e);
        this.redirect(Route.CHAT);
        chatsController.getChats();
      })
      .catch(this.onError)
      .finally(this.hideLoader);
  }

  signup(e: SubmitEvent, data: SignupModel) {
    this.showLoader();
    return authAPI.signup(data)
      .then(() => {
        this.clearInputs(e);
        this.redirect(Route.CHAT);
        chatsController.getChats();
      })
      .catch(this.onError)
      .finally(this.hideLoader);
  }

  logout() {
    return authAPI.logout()
      .then(() => {
        this.redirect(Route.LOGIN);
        store.setState('currentChat', { id: null });
        store.setState('currentUser', { id: null });
      })
      .catch(this.onError);
  }

  checkUser() {
    return authAPI.getUser()
      .then((user) => {
        store.setState('currentUser', user);
      })
      .catch((error) => {
        this.onError(error);
        this.redirect(Route.LOGIN);
      });
  }

  checkHiddenAuth() {
    return authAPI.getUser()
      .then(() => {
        this.redirect(Route.CHAT);
      })
      .catch((error) => error);
  }
}

const authController = new AuthController();

export { authController };
