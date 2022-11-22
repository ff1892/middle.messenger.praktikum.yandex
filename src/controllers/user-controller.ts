import { BaseController } from './base-controller';
import { userAPI } from '../api/user-api';
import { store } from '../services/store';
import { Toast } from '../components/toast/toast';
import { validator } from '../utils/validator';

class UserController extends BaseController {

  updateProfile(data: Record<string, any>) {
    this.showLoader();

    return userAPI.updateProfile(data)
      .then((user) => {
        store.setState('currentUser', user);
        const toast = new Toast({ text: 'Профиль обновлён 👍' })
        toast.show();
      })
      .catch(this.onError)
      .finally(this.hideLoader);
  }

  updatePassword(e: SubmitEvent,data: Record<string, any>) {
    this.showLoader();

    return userAPI.updatePassword(data)
      .then(() => {
        this.clearInputs(e);
        const toast = new Toast({ text: 'Пароль обновлён 👍' });
        toast.show();
      })
      .catch(this.onError)
      .finally(this.hideLoader);
  }

  updateAvatar(data: FormData) {
    this.showLoader();

    return userAPI.updateAvatar(data)
      .then((user) => {
        const toast = new Toast({ text: 'Аватар обновлён 👍' });
        toast.show();
        store.setState('currentUser', user);
        validator.closeModal();
        return user;
      })
      .catch(this.onError)
      .finally(this.hideLoader);
  }
}

const userController = new UserController();

export { userController };