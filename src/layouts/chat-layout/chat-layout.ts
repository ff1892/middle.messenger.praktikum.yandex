import tpl from './chat-layout.hbs';
import { Block } from '../../services/block/block';

import { ChatHeader } from '../../modules/chat-header/chat-header';
import { ChatMessage } from '../../modules/chat-message/chat-message';
import { ChatConversation } from '../../modules/chat-conversation/chat-conversation';
import { connect } from '../../utils/connect';
import { store } from '../../services/store';
import { chatsController } from '../../controllers/chats-controller';
import { messageController } from '../../controllers/message-controller';

class ChatLayoutWithStore extends Block {

  customize() {
    this.element?.classList.add('chat-current');
  }

  componentDidUpdate() {
    const chatId = store.getState().currentChat.id;
    const userId = store.getState().currentUser.id;
    store.setState('messages', []);
    messageController.drop();
    if (chatId && userId) {
      chatsController.getToken(chatId)
        // @ts-ignore
        .then(({ token }) => {
          messageController.init({
            chatId, userId, token,
          });
        });
    }

    return true;
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withId = connect((state) => {
  const chat = state.currentChat;
  return { currentId: chat?.id || null };
});

const ChatLayoutWithId = withId(ChatLayoutWithStore);

const ChatLayout = new ChatLayoutWithId('div', {
  header: ChatHeader,
  conversation: ChatConversation,
  message: new ChatMessage(),
});

export { ChatLayout };
