import tpl from './chat-preview.hbs';
import { Block } from '../../services/block/block';
import { connect } from '../../utils/connect';
import { chatsController } from '../../controllers/chats-controller';
import { RESOURCES_URL } from '../../constants';
import { cutString } from '../../utils/cut-string';

const handleChange = (e: InputEvent) => {
  const input = e.target as HTMLInputElement;
  const id = +input.value;
  chatsController.getCurrentChat(id);
};

class ChatPreviewWithStore extends Block {

  customize() {
    this.element?.classList.add('chat-preview');
  }

  componentDidUpdate() {
    this.props.events = {
      change: handleChange,
    };
    return true;
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withChats = connect((state) => {
  const chats = state.chatsList;
  if (chats && chats.length) {
    const modified = chats.map((chat: Record<string, any>) => {
      const avatarSrc = chat.avatar ? RESOURCES_URL + chat.avatar : '';
      if (chat.lastMessage && chat.lastMessage.content) {
        chat.lastMessage.content = cutString(75, chat.lastMessage.content);
      }
      return { ...chat, avatar: avatarSrc };
    });
    return { previewData: modified };
  }

  return { previewData: [] };
});

const ChatWithPreview = withChats(ChatPreviewWithStore);
const ChatPreview = new ChatWithPreview('form', { previews: [] });

export { ChatPreview };
