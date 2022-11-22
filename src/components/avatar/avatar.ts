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

const withPicture = connect((state) => {
  const user = {...state.currentUser };
  const avatar = user.avatar;

  return avatar ?
    { src: RESOURCES_URL + avatar }
    : { src: null };
});

const AvatarWithUser = withPicture(AvatarWithStore);

export {
  Avatar,
  AvatarWithUser,
};
