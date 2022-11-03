import tpl from './signup.hbs';
import { Block } from '../../services/block';
import { FormLayout } from '../../layouts/form-layout/form-layout';
import { Button } from '../../components/button/button';
import { Form } from '../../modules/form/form';
import { Field } from '../../components/field/field';
import { TextInput } from '../../components/text-input/text-input';
import { Route } from '../../constants';
import { validator } from '../../utils/validator';

const signupInputsData = [
  {
    label: 'Логин',
    input: new TextInput({
      attrs: {
        name: 'login',
        type: 'text',
        placeholder: 'MessengerCeo',
      },
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  },
  {
    label: 'Имя',
    input: new TextInput({
      attrs: {
        name: 'first_name',
        type: 'text',
        placeholder: 'Александр',
      },
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  },
  {
    label: 'Фамилия',
    input: new TextInput({
      attrs: {
        name: 'second_name',
        type: 'text',
        placeholder: 'Александров',
      },
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  },
  {
    label: 'Почта',
    input: new TextInput({
      attrs: {
        name: 'email',
        type: 'text',
        placeholder: 'messengerceo@yandex.ru',
      },
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  },
  {
    label: 'Телефон',
    input: new TextInput({
      attrs: {
        name: 'phone',
        type: 'text',
        placeholder: '+75555555555',
      },
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  },
  {
    label: 'Пароль',
    input: new TextInput({
      attrs: {
        name: 'password',
        type: 'password',
        placeholder: '●●●●●',
      },
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  },
  {
    label: 'Повторите пароль',
    input: new TextInput({
      attrs: {
        name: 'password_repeat',
        type: 'password',
        placeholder: '●●●●●',
      },
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  },
];

const signupInputs = signupInputsData.map((inputData) => {
  const inputProps = { ...inputData };
  return new Field(inputProps);
});

const buttonProps = {
  attrs: {
    class: 'button',
    type: 'submit',
  },
  value: 'Зарегистрироваться',
};

const button = new Button(buttonProps);

const signupFormProps = {
  title: 'Регистрация',
  inputs: signupInputs,
  button,
  link: {
    href: Route.LOGIN,
    text: 'Есть аккаунт?',
  },
  events: {
    submit: validator.handleSubmit,
  },
};

const signupForm = new Form(signupFormProps);

const formLayout = new FormLayout({
  layoutElement: signupForm,
});

type SignupPageProps = Record<string, any>;

class SignupPage extends Block<SignupPageProps> {
  constructor(props: SignupPageProps = {}) {
    super('div', { ...props, formLayout });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { SignupPage };
