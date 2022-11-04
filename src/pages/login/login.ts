import tpl from './login.hbs';
import { Route } from '../../constants';
import { Block } from '../../services/block';
import { FormLayout } from '../../layouts/form-layout/form-layout';
import { Button } from '../../components/button/button';
import { Form } from '../../modules/form/form';
import { Field } from '../../components/field/field';
import { TextInput } from '../../components/text-input/text-input';
import { validator } from '../../utils/validator';

const loginField = new Field({
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
});

const passwordField = new Field({
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
});

const buttonProps = {
  attrs: {
    class: 'button',
    type: 'submit',
  },
  value: 'Войти',
};

const button = new Button(buttonProps);

const loginFormProps = {
  title: 'Вход',
  inputs: [loginField, passwordField],
  button,
  link: {
    href: Route.SIGNUP,
    text: 'Нет аккаунта?',
  },
  events: {
    submit: validator.handleSubmit,
  },
};

const loginForm = new Form(loginFormProps);

const formLayout = new FormLayout({
  layoutElement: loginForm,
});

type TLoginPageProps = Record<string, any>;

class LoginPage extends Block<TLoginPageProps> {
  constructor(props: TLoginPageProps = {}) {
    super('main', { ...props, formLayout });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { LoginPage };
