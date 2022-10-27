import tpl from './login.hbs';
import { Route } from '../../constants';
import Block from '../../core/block';
import FormLayout from '../../layouts/form-layout/form-layout';
import Button from '../../components/button/button';
import Form from '../../modules/form/form';
import Field from '../../components/field/field';


const loginField = new Field({
  label: 'Логин',
  name: 'login',
  type: 'text',
  placeholder: 'MessengerCeo',
}).getContent()?.outerHTML;

const passwordField = new Field({
  label: 'Пароль',
  name: 'password',
  type: 'password',
  placeholder: '●●●●●',
}).getContent()?.outerHTML;

const buttonProps = {
  attributes: {
    class: 'button',
    type: 'submit',
  },
  value: 'Войти',
  withInternalId: true,
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
  withInternalId: true,
}

const loginForm = new Form(loginFormProps);

const formLayout = new FormLayout({
  layoutElement: loginForm,
  withInternalId: true,
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
