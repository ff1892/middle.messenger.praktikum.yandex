import { Toast } from '../components/toast/toast';
import { Route } from '../constants';
import { router } from '../services/router';
import { loader } from '../components/loader/loader';

abstract class BaseController {

  protected onError(error: XMLHttpRequest, message?: string) {

    if (!error.response && !message) {
      return router.go(Route.ERROR);
    }

    let reason = '';

    if (!message) {
      const response = JSON.parse(error.response);
      reason = response.reason;
    }

    const toast = new Toast({ text: message || reason, isError: true });
    toast.show();

    return this;
  }

  protected showLoader() {
    loader.show();
  }

  protected hideLoader() {
    loader.hide();
  }

  protected clearInputs(e: SubmitEvent) {
    const form = e.target as HTMLFormElement;
    const inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = '';
    });
  }

  protected redirect(path: string) {
    router.go(path);
  }
}

export { BaseController };
