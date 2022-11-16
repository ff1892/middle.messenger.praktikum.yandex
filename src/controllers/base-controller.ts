import { Toast } from '../components/toast/toast';
import { Route } from '../constants';
import { router } from '../services/router';
import { loader } from '../components/loader/loader';

abstract class BaseController {

  protected onError(error: XMLHttpRequest) {

    if (!error.response) {
      return router.go(Route.ERROR);
    }

    const { reason } = JSON.parse(error.response);
    const toast = new Toast({ text: reason, isError: true });
    toast.show();
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
    inputs.forEach((input) => input.value = '');
  }

  protected redirect(path: string) {
    router.go(path);
  }
}

export { BaseController };
