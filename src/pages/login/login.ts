import tpl from './login.hbs';
import { Route } from '../../constants';
import { Block } from '../../services/block';
import { FormLayout } from '../../layouts/form-layout/form-layout';
import { Button } from '../../components/button/button';
import { Form } from '../../modules/form/form';
import { Field } from '../../components/field/field';
import { TextInput } from '../../components/text-input/text-input';
import { Link } from '../../components/link/link';
import { validator } from '../../utils/validator';
import { authController } from '../../controllers/auth-controller';
import { LoginModel } from '../../types/data-model';

const handleSubmit = (e: SubmitEvent) => {
  const isValid = validator.handleSubmit(e);
  if (!isValid) {
    return;
  }
  const formData = validator.getFormData(e);
  authController.login(e, formData as LoginModel);
};

const loginInput = new TextInput({
  attrs: {
    name: 'login',
    type: 'text',
    placeholder: 'Логин',
    value: 'ff1892',
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
    value: 'Ff1892ff1892',
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

const link = new Link({
  text: 'Нет аккаунта?',
  attrs: {
    href: Route.SIGNUP,
  },
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
  link,
  events: {
    submit: handleSubmit,
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
