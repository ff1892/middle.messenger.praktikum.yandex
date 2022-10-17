import tpl from './password-profile.hbs';
import userLayoutTpl from '../../layouts/user-layout/user-layout.hbs';
import iconArrow from 'bundle-text:../../../static/icons/back-arrow.svg';
import userFormTpl from '../../modules/user-form/user-form.hbs';
import { Route } from '../../constants';

const formData = {
  title: 'Алекс',
  avatar: 'img/avatar-default.png',
  inputs: [
    {
      label: 'Старый пароль',
      name: 'old_password',
      type: 'password',
      value: '',
      placeholder: 'Ваш старый пароль',
    },
    {
      label: 'Новый пароль',
      name: 'new_password',
      type: 'password',
      value: '',
      placeholder: 'Не менее шести символов',
    },
    {
      label: 'Новый пароль',
      name: 'new_password_repeat',
      type: 'password',
      value: '',
      placeholder: 'Повторите новый пароль',
    }
  ],
  change: {
    type: 'button',
    text: 'Изменить пароль',
  },
  submit: {
    type: 'submit',
    text: 'Сохранить данные',
  },
  link: {
    href: Route.USERFORM,
    text: 'Изменить данные профиля',
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
