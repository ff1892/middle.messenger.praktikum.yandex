import tpl from './chat.hbs';
import { Block } from '../../services/block';
import { ChatPanel } from '../../modules/chat-panel/chat-panel';
import { ChatPreview } from '../../modules/chat-preview/chat-preview';
import { ChatHeader } from '../../modules/chat-header/chat-header';
import { ChatMessage } from '../../modules/chat-message/chat-message';
import { ChatConversation } from '../../modules/chat-conversation/chat-conversation';
import { Avatar } from '../../components/avatar/avatar';
import { chatsController } from '../../controllers/chats-controller';


const avatar = new Avatar(({
  src: '/img/mock3.jpg',
  alt: 'Аватар чата',
}));

type ChatPageProps = Record<string, any>;

class ChatPage extends Block<ChatPageProps> {
  constructor(props: ChatPageProps = {}) {
    props.currentId = 1;
    props.panel = new ChatPanel();
    props.preview = ChatPreview;
    props.header = new ChatHeader({ avatar, title: 'Alex' });
    props.conversation = new ChatConversation();
    props.message = new ChatMessage();
    super('main', props);
    this.element?.classList.add('chat');
  }

  componentDidMount() {
    chatsController.getChats();
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { ChatPage };
