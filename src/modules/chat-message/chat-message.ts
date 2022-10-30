import Block from '../../core/block';
import tpl from './chat-message.hbs';
import IconButton from '../../components/icon-button/icon-button';
import MessageField from '../../components/message-field/message-field';
import iconAttach from 'bundle-text:../../../static/icons/attach.svg';
import iconSend from 'bundle-text:../../../static/icons/message.svg';

const attachButton = new IconButton({
  attributes: {
    type: 'button',
  },
  icon: iconAttach,
  primary: true,
});

const sendButton = new IconButton({
  attributes: {
    type: 'submit',
  },
  icon: iconSend,
  primary: true,
});

const messageField = new MessageField();

type ChatMessageProps = Record<string, any>

class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps = {}) {
    props['attachButton'] = attachButton;
    props['sendButton'] = sendButton;
    props['messageField'] = messageField;
    super('div', props);
    this.element?.classList.add('chat-message');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default ChatMessage;
