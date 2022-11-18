import tpl from './user-form-header.hbs';
import { Block } from '../../services/block';
import { Button } from '../../components/button/button';
import { modalAvatar } from '../modal/modal';

type UserFormHeaderType = {
  avatar: string,
  avatarDescription: string,
  title: string,
  buttonChange: Button,
};

class UserFormHeader extends Block<UserFormHeaderType> {
  constructor(props: UserFormHeaderType) {
    super('div', props);
    this.element?.classList.add('user-form__header');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const userFormHeader = new UserFormHeader({
  title: 'Misha',
  avatar: 'img/avatar-default.png',
  avatarDescription: 'Аватар по умолчанию',
  buttonChange: new Button({
    attrs: {
      type: 'button',
      class: 'user-form__avatar-change',
    },
    value: 'Поменять аватар',
    events: {
      click: modalAvatar.show.bind(modalAvatar),
    },
  }),
});

const passwordFormHeader = new UserFormHeader({
  title: 'Misha',
  avatar: 'img/avatar-default.png',
  avatarDescription: 'Аватар по умолчанию',
  buttonChange: new Button({
    attrs: {
      type: 'button',
      class: 'user-form__avatar-change',
    },
    value: 'Поменять аватар',
    events: {
      click: modalAvatar.show.bind(modalAvatar),
    },
  }),
})

export {
  UserFormHeader,
  userFormHeader,
  passwordFormHeader,
};
