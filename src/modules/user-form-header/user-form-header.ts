import tpl from './user-form-header.hbs';
import { Block } from '../../services/block';
import { Button } from '../../components/button/button';
import { modalAvatarUser } from '../modal/modal';
import { connect } from '../../utils/connect';
import { RESOURCES_URL } from '../../constants';

class UserFormHeaderBase extends Block {

  customize() {
    this.element?.classList.add('user-form__header');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withUser = connect((state) => {
  const user = { ...state.currentUser };
  return {
    title: user.firstName,
    avatar: user.avatar ? RESOURCES_URL + user.avatar : user.avatar,
  };
});

const UserFormHeader = withUser(UserFormHeaderBase);

const userFormHeader = new UserFormHeader('div', {
  title: '',
  avatar: null,
  buttonChange: new Button({
    attrs: {
      type: 'button',
      class: 'user-form__avatar-change',
    },
    value: 'Поменять аватар',
    events: {
      click: modalAvatarUser.show.bind(modalAvatarUser),
    },
  }),
});

const passwordFormHeader = new UserFormHeader('div', {
  title: '',
  avatar: null,
  avatarDescription: 'Аватар по умолчанию',
  buttonChange: new Button({
    attrs: {
      type: 'button',
      class: 'user-form__avatar-change',
    },
    value: 'Поменять аватар',
    events: {
      click: modalAvatarUser.show.bind(modalAvatarUser),
    },
  }),
});

export {
  UserFormHeader,
  userFormHeader,
  passwordFormHeader,
};
