import { InputRegexp, ValidationMessage } from '../constants';
import { getFormData } from './get-formdata';

class Validator {

  constructor() {

    this._checkValue = this._checkValue.bind(this);
    this._checkValueRepeat = this._checkValueRepeat.bind(this);
    this._checkIsValid = this._checkIsValid.bind(this);
    this._getValidationMessage = this._getValidationMessage.bind(this);
    this._handleClass = this._handleClass.bind(this);
    this._setText = this._setText.bind(this);
    this._setError = this._setError.bind(this);
    this._removeError = this._removeError.bind(this);
    this._removeError = this._removeError.bind(this);
    this._validateInput = this._validateInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitAvatar = this.handleSubmitAvatar.bind(this);
    this.handleChangeAvatar = this.handleChangeAvatar.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  private _checkValue(value: string, regexp: RegExp) {
    return regexp.test(value);
  }

  private _checkValueRepeat(input: HTMLInputElement) {
    const parent = input.closest('form') as HTMLFormElement;
    const sibling = parent.querySelector('input[name="password"]') as HTMLInputElement;

    return input.value !== ''
      ? input.value === sibling.value
      : false;
  }

  private _checkIsValid(input: HTMLInputElement) {
    const inputName = input.name.toUpperCase();

    if (inputName === 'PASSWORDREPEAT') {
      return this._checkValueRepeat(input);
    }

    if (input.name && InputRegexp[inputName]) {
      return this._checkValue(
        input.value,
        InputRegexp[inputName],
      );
    }

    return input.validity.valid;
  }

  private _getValidationMessage(input: HTMLInputElement) {

    const inputName = input.name.toUpperCase();

    if (input.name && ValidationMessage[inputName]) {
      return ValidationMessage[inputName];
    }

    return 'Поле заполнено неправильно';
  }

  private _handleClass(
    method: 'ADD' | 'REMOVE',
    className: string,
    element: HTMLElement,
  ) {

    if (method === 'ADD') {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }

  private _setText(input: HTMLInputElement, text: string) {
    const container = input.closest('div')?.querySelector('span.error');
    if (container) {
      container.textContent = text;
      return;
    }
    throw new Error('Нет поля для вывода ошибки');
  }

  private _setError(input: HTMLInputElement) {
    this._handleClass('ADD', 'error', input);
    const text = this._getValidationMessage(input);
    this._setText(input, text);
  }

  private _removeError(input: HTMLInputElement) {
    this._handleClass('REMOVE', 'error', input);
    this._setText(input, '');
  }

  private _validateInput(input: HTMLInputElement) {

    if (input.type === 'file') {
      return;
    }

    if (input && !this._checkIsValid(input)) {
      this._setError(input);
    } else {
      this._removeError(input);
    }
  }

  private _disableButton(e: SubmitEvent) {
    const form = e.target as HTMLFormElement;
    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (!button) {
      return;
    }
    button.disabled = true;
  }

  private _enableButton(input: HTMLInputElement) {
    const form = input.closest('form');
    if (!form) {
      return;
    }
    const button = form.querySelector('button[type="submit"]') as HTMLButtonElement;
    if (!button) {
      return;
    }
    button.disabled = false;
  }

  public handleFocus(e: FocusEvent) {
    this._validateInput(e.target as HTMLInputElement);
  }

  public handleChange(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    this._removeError(input);
    this._enableButton(input);
  }

  public getFormData(e: SubmitEvent) {
    return getFormData(e);
  }

  public closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
      modal.remove();
    }
  }

  public handleSubmit(e: SubmitEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const inputs = form.querySelectorAll('input');

    inputs.forEach(this._validateInput);
    const isValidForm = [...inputs].every(this._checkIsValid);

    if (!isValidForm) {
      this._disableButton(e);
      return false;
    }

    this.closeModal();
    return true;
  }

  public handleSubmitAvatar(e: SubmitEvent) {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input')!;

    if (!input?.value) {
      this._setText(input, ValidationMessage.AVATAR);
      return false;
    }

    return true;
  }

  public handleChangeAvatar(e: FormDataEvent) {
    const input = e.target as HTMLInputElement;
    this._setText(input, '');
  }
}

const validator = new Validator();

export { validator };
