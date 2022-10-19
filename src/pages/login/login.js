import tpl from './login.hbs';
import { Route } from '../../constants';
import formTpl from '../../modules/form/form.hbs';
import formLayoutTpl from '../../layouts/form-layout/form-layout.hbs';


const formData = {
  title: 'Вход',
  inputs: [
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      placeholder: 'MessengerCeo',
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      placeholder: '●●●●●'
    }
  ],
  submit: {
    type: 'submit',
    text: 'Войти',
  },
  link: {
    href: Route.SIGNUP,
    text: 'Нет аккаунта?',
  },
};

const layoutElement = formTpl(formData);
const formLayout = formLayoutTpl({ layoutElement });


const loginPage = tpl({formLayout});


export default loginPage;
