import { validator } from '../../utils/validator';

export const userData = [
  {
    label: 'Почта',
    value: '',
    attrs: {
      name: 'email',
      type: 'text',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
  {
    label: 'Логин',
    value: '',
    attrs: {
      name: 'login',
      type: 'text',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
  {
    value: '',
    label: 'Имя',
    attrs: {
      name: 'firstName',
      type: 'text',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
  {
    value: '',
    label: 'Фамилия',
    attrs: {
      name: 'secondName',
      type: 'text',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
  {
    value: '',
    label: 'Имя в чате',
    attrs: {
      name: 'displayName',
      type: 'text',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
  {
    value: '',
    label: 'Телефон',
    attrs: {
      name: 'phone',
      type: 'text',
    },
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  },
];
