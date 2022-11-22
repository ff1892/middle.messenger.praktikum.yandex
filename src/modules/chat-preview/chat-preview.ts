import tpl from './chat-preview.hbs';
import { Block } from '../../services/block';
import { connect } from '../../utils/connect';
import { chatsController } from '../../controllers/chats-controller';

const handleChange = (e: InputEvent) => {
  const input = e.target as HTMLInputElement;
  const id = +input.value;
  chatsController.getCurrentChat(id);
}

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
  return { previewData: chats };
});

const ChatWithPreview = withChats(ChatPreviewWithStore);
const ChatPreview = new ChatWithPreview('form', { previews: []});

export { ChatPreview };
