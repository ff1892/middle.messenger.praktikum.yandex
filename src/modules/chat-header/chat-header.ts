import Block from '../../services/block';
import tpl from './chat-header.hbs';
import IconButton from '../../components/icon-button/icon-button';
import menuIcon from 'bundle-text:../../../static/icons/menu.svg';


const iconButton = new IconButton({
  type: 'button',
  icon: menuIcon,
});


type ChatHeaderProps = Record<string, any>;

class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps = {}) {
    props['menuButton'] = iconButton;
    super('div', props);
    this.element?.classList.add('chat-header');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default ChatHeader;
