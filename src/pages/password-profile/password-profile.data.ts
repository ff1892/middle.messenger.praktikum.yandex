export const passwordFormData = [
  {
    label: 'Старый пароль',
    attrs: {
      name: 'oldPassword',
      type: 'password',
      value: '',
      placeholder: 'Ваш старый пароль',
    },
  },
  {
    label: 'Новый пароль',
    attrs: {
      name: 'newPassword',
      type: 'password',
      value: '',
      placeholder: 'Не менее шести символов',
    },
  },
  {
    label: 'Новый пароль',
      attrs: {
        name: 'passwordRepeat',
        type: 'password',
        value: '',
        placeholder: 'Повторите новый пароль',
      },
  },
];
