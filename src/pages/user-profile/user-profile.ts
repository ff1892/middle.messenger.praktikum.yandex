import tpl from './user-profile.hbs';
import Block from '../../core/block';
import UserLayout from '../../layouts/user-layout/user-layout';
import UserForm from '../../modules/user-form/user-form';
import UserField from '../../components/user-field/user-field';
import { userData } from './user.data';
import Button from '../../components/button/button';
import { Route } from '../../constants';


const inputs = userData.map((fieldData) => (
  new UserField(fieldData)
));

const button = new Button({
  attributes: {
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
  inputs
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
