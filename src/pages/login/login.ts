import tpl from './login.hbs';
import { Route } from '../../constants';
import { Block } from '../../services/block';
import { FormLayout } from '../../layouts/form-layout/form-layout';
import { Button } from '../../components/button/button';
import { Form } from '../../modules/form/form';
import { Field } from '../../components/field/field';
import { TextInput } from '../../components/text-input/text-input';
import { validator } from '../../utils/validator';
import { Link } from '../../components/link/link';
import { router } from '../../services/router';


const loginInput = new TextInput({
    attrs: {
      name: 'login',
      type: 'text',
      placeholder: 'Your login',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
});

const passwordInput = new TextInput({
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
});


const loginField = new Field({
  label: 'Логин',
  input: loginInput,
});

const passwordField = new Field({
  label: 'Пароль',
  input: passwordInput,
});

const button = new Button({
  attrs: {
    class: 'button',
    type: 'submit',
  },
  value: 'Войти',
});

const loginForm = new Form({
  title: 'Вход',
  inputs: [loginField, passwordField],
  button,
  link: new Link({
    text: 'Нет аккаунта?',
    attrs: {
      href: Route.SIGNUP,
    },
  }),
  events: {
    submit: validator.handleSubmit,
  },
});

const formLayout = new FormLayout({
  layoutElement: loginForm,
});

class LoginPage extends Block<{}> {
  constructor(props = {}) {
    super('main', { ...props, formLayout });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { LoginPage };
