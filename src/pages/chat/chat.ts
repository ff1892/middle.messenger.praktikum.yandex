import tpl from './chat.hbs';
import Block from '../../services/block';
import ChatPanel from '../../modules/chat-panel/chat-panel';
import ChatPreview from '../../modules/chat-preview/chat-preview';
import ChatHeader from '../../modules/chat-header/chat-header';
import ChatMessage from '../../modules/chat-message/chat-message';
import ChatConversation from '../../modules/chat-conversation/chat-conversation';

import Avatar from '../../components/avatar/avatar';

const avatar = new Avatar(({
  src: '/img/mock3.jpg',
  alt: 'Аватар чата',
}));

type ChatPageProps = Record<string, any>;

class ChatPage extends Block<ChatPageProps> {
  constructor(props: ChatPageProps = {}) {
    props.panel = new ChatPanel();
    props.preview = new ChatPreview();
    props.header = new ChatHeader({ avatar, title: 'Алексей Петрович' });
    props.conversation = new ChatConversation();
    props.message = new ChatMessage();
    super('div', props);
    this.element?.classList.add('chat');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default ChatPage;
