import tpl from './user-profile.hbs';
import userLayoutTpl from '../../layouts/user-layout/user-layout.hbs';
import iconArrow from 'bundle-text:../../../static/icons/back-arrow.svg';
import userFormTpl from '../../modules/user-form/user-form.hbs';
import { Route } from '../../constants';

const formData = {
  title: 'Алекс',
  avatar: 'img/avatar-default.png',
  inputs: [
    {
      label: 'Почта',
      name: 'email',
      type: 'text',
      value: 'pochta@yandex.ru',
    },
    {
      label: 'Логин',
      name: 'login',
      type: 'text',
      value: 'MessengerCeo',
    },
    {
      label: 'Имя',
      name: 'first_name',
      type: 'text',
      value: 'Александр',
    },
    {
      label: 'Фамилия',
      name: 'second_name',
      type: 'text',
      value: 'Александров',
    },
    {
      label: 'Имя в чате',
      name: 'display_name',
      type: 'text',
      value: 'Алекс',
    },
    {
      label: 'Телефон',
      name: 'phone',
      type: 'text',
      value: '+7 (555) 555 55 55',
    },
  ],
  change: {
    type: 'button',
    text: 'Изменить данные',
  },
  submit: {
    type: 'submit',
    text: 'Сохранить данные',
  },
  link: {
    href: Route.PASSWORDFORM,
    text: 'Изменить пароль',
  },
};

const userForm = userFormTpl(formData);

const layoutData = {
  icon: iconArrow,
  form: userForm,
}

const userLayout = userLayoutTpl(layoutData);
const userProfilePage = tpl({userLayout});

export default userProfilePage;
