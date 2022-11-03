import menuIcon from 'bundle-text:../../../static/icons/menu.svg';
import tpl from './chat-header.hbs';
import { Block } from '../../services/block';
import { IconButton } from '../../components/icon-button/icon-button';

const iconButton = new IconButton({
  type: 'button',
  icon: menuIcon,
});

type ChatHeaderProps = Record<string, any>;

class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps = {}) {
    props.menuButton = iconButton;
    super('div', props);
    this.element?.classList.add('chat-header');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { ChatHeader };
