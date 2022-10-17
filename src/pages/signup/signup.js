import tpl from './signup.hbs';
import { Route } from '../../constants';
import formTpl from '../../modules/form/form.hbs';
import formLayoutTpl from '../../layouts/form-layout/form-layout.hbs';


const formData = {
  title: 'Регистрация',
  inputs: [
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      placeholder: 'MessengerCeo',
    },
    {
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      placeholder: 'Александр'
    },
    {
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      placeholder: 'Александров',
    },
    {
      label: 'Почта',
      name: 'email',
      type: 'text',
      placeholder: 'messengerceo@yandex.ru'
    },
    {
      label: 'Телефон',
      name: 'phone',
      type: 'text',
      placeholder: '+7 (555) 555 55 55',
    },
    {
      label: 'Пароль',
      name: 'password',
      type: 'password',
      placeholder: '●●●●●'
    },
    {
      label: 'Повторите пароль',
      name: 'password',
      type: 'password_repeat',
      placeholder: '●●●●●'
    }
  ],
  submit: {
    type: 'submit',
    text: 'Зарегистрироваться',
  },
  link: {
    href: Route.LOGIN,
    text: 'Есть аккаунт?',
  },
};

const layoutElement = formTpl(formData);
const formLayout = formLayoutTpl({ layoutElement });


const signupPage = tpl({formLayout});


export default signupPage;
