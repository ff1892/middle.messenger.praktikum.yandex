import tpl from './password-profile.hbs';
import { Block } from '../../services/block';
import { UserLayout } from '../../layouts/user-layout/user-layout';
import { UserForm } from '../../modules/user-form/user-form';
import { UserField } from '../../components/user-field/user-field';
import { Button } from '../../components/button/button';
import { TextInput } from '../../components/text-input/text-input';
import { validator } from '../../utils/validator';
import { Route } from '../../constants';
import { Link } from '../../components/link/link';
import { passwordFormHeader } from '../../modules/user-form-header/user-form-header';

const formFieldsData = [
  {
    label: 'Старый пароль',
    input: new TextInput({
      attrs: {
        name: 'oldPassword',
        type: 'password',
        value: '',
        placeholder: 'Ваш старый пароль',
      },
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  },
  {
    label: 'Новый пароль',
    input: new TextInput({
      attrs: {
        name: 'password',
        type: 'password',
        value: '',
        placeholder: 'Не менее шести символов',
      },
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  },
  {
    label: 'Новый пароль',
    input: new TextInput({
      attrs: {
        name: 'passwordRepeat',
        type: 'password',
        value: '',
        placeholder: 'Повторите новый пароль',
      },
      events: {
        focus: validator.handleFocus,
        blur: validator.handleFocus,
        input: validator.handleChange,
      },
    }),
  },
];

const inputs = formFieldsData.map((fieldData) => (
  new UserField(fieldData)
));

const button = new Button({
  attrs: {
    class: 'button',
    type: 'submit',
  },
  value: 'Изменить пароль',
});

const passwordForm = new UserForm({
  header: passwordFormHeader,
  link: new Link({
    text: 'Изменить данные профиля',
    attrs: {
      href: Route.USERFORM,
    },
  }),
  button,
  inputs,
  events: {
    submit: validator.handleSubmit,
  },
});

type PasswordProfileType = Record<string, any>;

class PasswordProfilePage extends Block<PasswordProfileType> {
  constructor(props: PasswordProfileType = {}) {
    props.userLayout = new UserLayout({
      form: passwordForm,
    });
    super('main', props);
    this.element?.classList.add('user-profile-page');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { PasswordProfilePage };
