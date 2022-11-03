import tpl from './chat-conversation.hbs';
import { Block } from '../../services/block';
import { Message } from '../../components/message/message';
import { MessageImage } from '../../components/message-image/message-image';

const mockText = 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона.';

const message = new Message({
  content: mockText,
  time: '10:22',
});

const message2 = new Message({
  content: 'Круто!',
  time: '10:23',
  isMine: true,
  isRead: true,
});

const message3 = new MessageImage({
  content: {
    src: '/img/mock1.jpeg',
    desc: 'Kitten',
  },
  time: '10:25',
});

const message4 = new Message({
  content: 'Тоже неплохо...',
  time: '10:28',
  isMine: true,
});

const message5 = new MessageImage({
  content: {
    src: '/img/mock2.jpeg',
    desc: 'Bill',
  },
  time: '10:30',
  isMine: true,
});

const chatConversationProps = {
  messages: [message, message2, message3, message4, message5],
  date: '30 окт',
};

type ChatConversationProps = Record<string, any>

class ChatConversation extends Block<ChatConversationProps> {
  constructor(props: ChatConversationProps = {}) {
    props = chatConversationProps;
    super('div', props);
    this.element?.classList.add('chat-conversation');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { ChatConversation };
