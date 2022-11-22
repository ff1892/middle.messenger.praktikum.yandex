import tpl from './chat-layout.hbs';
import { Block } from '../../services/block';

import { ChatHeader } from '../../modules/chat-header/chat-header';
import { ChatMessage } from '../../modules/chat-message/chat-message';
import { ChatConversation } from '../../modules/chat-conversation/chat-conversation';
import { connect } from '../../utils/connect';

class ChatLayoutWithStore extends Block {

  customize() {
    this.element?.classList.add('chat-current');
  }

  render() {
    return this.compile(tpl, this.props);
  }
};

const withId = connect((state) => {
  const chat = state.currentChat;
  return { currentId: chat?.id || null };
});

const ChatLayoutWithId = withId(ChatLayoutWithStore);

const ChatLayout = new ChatLayoutWithId('div', {
  header: ChatHeader,
  conversation: new ChatConversation(),
  message: new ChatMessage(),
});


export { ChatLayout };
