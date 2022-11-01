import tpl from './user-profile.hbs';
import Block from '../../services/block';
import UserLayout from '../../layouts/user-layout/user-layout';
import UserForm from '../../modules/user-form/user-form';
import UserField from '../../components/user-field/user-field';
import Button from '../../components/button/button';
import TextInput from '../../components/text-input/text-input';
import validator from '../../utils/validator';
import { Route } from '../../constants';
import { userData } from './user.data';


const inputs = userData.map(({label, ...rest} ) => (
  new UserField({label, input: new TextInput(rest)})
));

const button = new Button({
  attrs: {
    class: 'button',
    type: 'submit',
  },
  value: 'Изменить данные',
});

const userForm = new UserForm({
  title: 'Алекс',
  avatar: 'img/avatar-default.png',
  avatarDescription: 'Аватар по умолчанию',
  link: {
    href: Route.PASSWORDFORM,
    text: 'Изменить пароль',
  },
  button,
  inputs,
  events: {
    submit: validator.handleSubmit,
  }
});

type UserProfileType = Record<string, any>;

class UserProfilePage extends Block<UserProfileType> {
  constructor(props: UserProfileType = {}) {
    props['userLayout'] = new UserLayout({
      form: userForm,
    });
    super('section', props);
    this.element?.classList.add('user-profile-page');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default UserProfilePage;
