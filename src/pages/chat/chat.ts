import tpl from './chat.hbs';
import { Block } from '../../services/block';
import { ChatPanel } from '../../modules/chat-panel/chat-panel';
import { ChatPreview } from '../../modules/chat-preview/chat-preview';
import { chatsController } from '../../controllers/chats-controller';
import { ChatLayout } from '../../layouts/chat-layout/chat-layout';

type ChatPageProps = Record<string, any>;

class ChatPage extends Block<ChatPageProps> {
  constructor(props: ChatPageProps = {}) {
    props.panel = new ChatPanel();
    props.preview = ChatPreview;
    props.currentChat = ChatLayout;
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
