import tpl from './login.hbs';
import { Route } from '../../constants';
import Block from '../../services/block';
import FormLayout from '../../layouts/form-layout/form-layout';
import Button from '../../components/button/button';
import Form from '../../modules/form/form';
import Field from '../../components/field/field';
import getFormData from '../../utils/get-formdata';


const loginField = new Field({
  label: 'Логин',
  name: 'login',
  type: 'text',
  placeholder: 'MessengerCeo',
});

const passwordField = new Field({
  label: 'Пароль',
  name: 'password',
  type: 'password',
  placeholder: '●●●●●',
});

const buttonProps = {
  attributes: {
    class: 'button',
    type: 'submit',
  },
  value: 'Войти',
}

const button = new Button(buttonProps);

const loginFormProps = {
  title: 'Вход',
  inputs: [loginField, passwordField],
  button: button,
  link: {
    href: Route.SIGNUP,
    text: 'Нет аккаунта?',
  },
  events: {
    submit: getFormData,
  }
}

const loginForm = new Form(loginFormProps);

const formLayout = new FormLayout({
  layoutElement: loginForm,
});

type TLoginPageProps = {
};

class LoginPage extends Block<TLoginPageProps> {
  constructor(props: TLoginPageProps) {
    super('div', {...props, formLayout: formLayout});
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default LoginPage;