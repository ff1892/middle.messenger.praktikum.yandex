import { TextInput } from '../../components/text-input/text-input';
import { validator } from '../../utils/validator';

const signupInputs = [
  {
    label: 'Логин',
    input: {
      attrs: {
        name: 'login',
        type: 'text',
        placeholder: 'ivan',
      },
    },
  },
  {
    label: 'Имя',
    input: {
      attrs: {
        name: 'firstName',
        type: 'text',
        placeholder: 'Иван',
      },
    },
  },
  {
    label: 'Фамилия',
    input: {
      attrs: {
        name: 'secondName',
        type: 'text',
        placeholder: 'Иванов',
      },
    },
  },
  {
    label: 'Почта',
    input: {
      attrs: {
        name: 'email',
        type: 'text',
        placeholder: 'ivan@yandex.ru',
      },
    },
  },
  {
    label: 'Телефон',
    input: {
      attrs: {
        name: 'phone',
        type: 'text',
        placeholder: '+75554443322',
      },
    },
  },
  {
    label: 'Пароль',
    input: {
      attrs: {
        name: 'password',
        type: 'password',
        placeholder: '●●●●●',
      },
    },
  },
  {
    label: 'Повторите пароль',
    input: {
      attrs: {
        name: 'passwordRepeat',
        type: 'password',
        placeholder: '●●●●●',
      },
    },
  },
];

const signupInputsData = signupInputs.map((i) => (
  {
    label: i.label,
    input: new TextInput({
      attrs: i.input.attrs,
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  }
))

export { signupInputsData };
