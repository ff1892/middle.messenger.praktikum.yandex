import tpl from './chat-conversation.hbs';
import { Block } from '../../services/block';
import { Message } from '../../components/message/message';
import { connect } from '../../utils/connect';
import { getTimeFromDate } from '../../utils/time';

class ChatConversationWithStore extends Block {

  customize() {
    this.element?.classList.add('chat-conversation');
  }

  render() {
    return this.compile(tpl, this.props);
  }

  scroll() {
    if (this.element) {
      this.element.scrollTop = this.element.scrollHeight;
    }
  }
}

const withMessages = connect((state) => {
  const data = state.messages;
  const user = state.currentUser;
  if (!data || !user) {
    return { messagesData: [] };
  }
  return {
    messages: data.map((message: Record<string, any>) => {
      return new Message({
        content: message.content,
        time: getTimeFromDate(new Date(message.time)),
        isMine: message.userId === user.id,
        author: `ID: ${message.userId}`,
      })
    }).reverse(),
  };
});

const ChatConversationWithMessages = withMessages(ChatConversationWithStore);

const ChatConversation = new ChatConversationWithMessages('div', { messages: [] });

export { ChatConversation };
