import { InputRegexp, ValidationMessage } from '../constants';
import getFormData from './get-formdata';

class Validator {

  constructor() {

    this._checkValue = this._checkValue.bind(this);
    this._checkValueRepeat = this._checkValueRepeat.bind(this);
    this._checkIsValid = this._checkIsValid.bind(this);
    this._getValidationMessage = this._getValidationMessage.bind(this);
    this._handleClass = this._handleClass.bind(this);
    this._setError = this._setError.bind(this);
    this._removeError = this._removeError.bind(this);
    this._removeError = this._removeError.bind(this);
    this._validateInput = this._validateInput.bind(this);
    this.handleFocus = this.handleFocus.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  private _checkValue (value: string, regexp: RegExp) {
    return regexp.test(value);
  };

  private _checkValueRepeat(input: HTMLInputElement) {
    const parent = input.closest('form') as HTMLFormElement;
    const sibling = parent.querySelector('input[name="password"]') as HTMLInputElement;

    return input.value !== '' ?
      input.value === sibling.value
      : false;
  }

  private _checkIsValid (input: HTMLInputElement) {
    const inputName = input.name.toUpperCase();

    if (inputName === 'PASSWORD_REPEAT') {
      return this._checkValueRepeat(input);
    }

    if (input.name && InputRegexp[inputName]) {
      return this._checkValue(
        input.value,
        InputRegexp[inputName]
      );
    }

    return input.validity.valid;
  }

  private _getValidationMessage (input: HTMLInputElement) {

    const inputName = input.name.toUpperCase();

    if (input.name && ValidationMessage[inputName]) {
      return ValidationMessage[inputName];
    }

    return 'Поле заполнено неправильно';
  }

  private _handleClass (
    method: 'ADD' | 'REMOVE',
    className: string,
    element: HTMLElement ) {

    method === 'ADD' ?
      element.classList.add(className)
      : element.classList.remove(className);
  }

  private _setError (input: HTMLInputElement) {
    this._handleClass('ADD', 'error', input);

    input.closest('div')!
      .querySelector('span.error')!
      .textContent = this._getValidationMessage(input);
  }

  private _removeError (input: HTMLInputElement) {
    this._handleClass('REMOVE', 'error', input);

    input.closest('div')!
      .querySelector('span.error')!
      .textContent = '';
  }


  private _validateInput (input: HTMLInputElement) {

    if (input.type === 'file') {
      return;
    }

    input && !this._checkIsValid(input) ?
      this._setError(input)
      : this._removeError(input);
  }

  public handleFocus (evt: FocusEvent) {
    this._validateInput(evt.target as HTMLInputElement);
  }

  public handleChange (evt: KeyboardEvent) {
    this._removeError(evt.target as HTMLInputElement);
  }

  public handleSubmit (evt: SubmitEvent) {
    getFormData(evt);

    const form = evt.target as HTMLFormElement;
    const inputs = form.querySelectorAll('input')

    inputs.forEach(this._validateInput);
    const isValidForm = [...inputs].every(this._checkIsValid);

    isValidForm ?
      console.log('Все поля валидны')
      : console.log('Какие-то поля невалидны');
  }
}

const validator = new Validator();

export default validator;
