import tpl from './avatar.hbs';
import { Block } from '../../services/block';

type AvatarProps = {
  src: string,
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

export { Avatar };
