import { validator } from '../../utils/validator';

export const userData = [
  {
    label: 'Почта',
    attrs: {
      name: 'email',
      type: 'text',
      value: 'pochta@yandex.ru',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
  {
    label: 'Логин',
    attrs: {
      name: 'login',
      type: 'text',
      value: 'MessengerCeo',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
  {
    label: 'Имя',
    attrs: {
      name: 'firstName',
      type: 'text',
      value: 'Александр',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
  {
    label: 'Фамилия',
    attrs: {
      name: 'secondName',
      type: 'text',
      value: 'Александров',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
  {
    label: 'Имя в чате',
    attrs: {
      name: 'displayName',
      type: 'text',
      value: 'Алекс',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
  {
    label: 'Телефон',
    attrs: {
      name: 'phone',
      type: 'text',
      value: '+75555555555',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
];
