import tpl from './avatar.hbs';
import { Block } from '../../services/block';
import { connect } from '../../utils/connect';
import { RESOURCES_URL } from '../../constants';

type AvatarProps = {
  src: string | null,
  alt: string,
  unreadCount?: number,
}

class Avatar extends Block<AvatarProps> {
  constructor(props: AvatarProps) {
    super('div', props);
    this.element?.classList.add('avatar');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

class AvatarWithStore extends Block {

  customize() {
    this.element?.classList.add('avatar');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withUser = connect((state) => {
  const user = { ...state.currentUser };
  const { avatar } = user;

  return avatar
    ? { src: RESOURCES_URL + avatar }
    : { src: null };
});

const withChat = connect((state) => {
  const chat = { ...state.currentChat };
  const { avatar } = chat;

  return avatar
    ? {
      src: RESOURCES_URL + avatar,
      alt: chat.title,
    }
    : { src: null };
});

const AvatarWithUser = withUser(AvatarWithStore);
const AvatarWithChat = withChat(AvatarWithStore);

export {
  Avatar,
  AvatarWithUser,
  AvatarWithChat,
};
