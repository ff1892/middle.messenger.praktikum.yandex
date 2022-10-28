import tpl from './signup.hbs';
import { Route } from '../../constants';
import Block from '../../core/block';
import FormLayout from '../../layouts/form-layout/form-layout';
import Button from '../../components/button/button';
import Form from '../../modules/form/form';
import Field from '../../components/field/field';


const signupInputsData = [
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
];

const signupInputs = signupInputsData.map((inputData) => {
  const inputProps = { ...inputData };
  return new Field(inputProps);
})

const buttonProps = {
  attributes: {
    class: 'button',
    type: 'submit',
  },
  value: 'Зарегистрироваться',
}

const button = new Button(buttonProps);


const signupFormProps = {
  title: 'Регистрация',
  inputs: signupInputs,
  button: button,
  link: {
    href: Route.LOGIN,
    text: 'Есть аккаунт?',
  },
}

const signupForm = new Form(signupFormProps);

const formLayout = new FormLayout({
  layoutElement: signupForm,
});

type TSignupPageProps = {
};

class SignupPage extends Block<TSignupPageProps> {
  constructor(props: TSignupPageProps) {
    super('div', {...props, formLayout: formLayout});
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default SignupPage;
