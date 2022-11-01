import Block from '../../services/block';
import tpl from './chat-message.hbs';
import IconButton from '../../components/icon-button/icon-button';
import MessageField from '../../components/message-field/message-field';
import iconAttach from 'bundle-text:../../../static/icons/attach.svg';
import iconSend from 'bundle-text:../../../static/icons/message.svg';
import getFormData from '../../utils/get-formdata';
import validator from '../../utils/validator';

const attachButton = new IconButton({
  attrs: {
    type: 'button',
  },
  icon: iconAttach,
  primary: true,
});

const sendButton = new IconButton({
  attrs: {
    type: 'submit',
  },
  icon: iconSend,
  primary: true,
});

const messageField = new MessageField({
  events: {
    focus: validator.handleFocus,
    blur: validator.handleFocus,
    input: validator.handleChange,
  }
});

type ChatMessageProps = {
  attachButton: IconButton,
  sendButton: IconButton,
  messageField: MessageField,
  events: {
    submit: (evt: SubmitEvent) => void,
  },
};

const cchatMessageProps = {
  attachButton: attachButton,
  sendButton: sendButton,
  messageField: messageField,
  events: {
    submit: validator.handleSubmit,
  },
}

class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps) {
    props = cchatMessageProps;
    super('form', props);
    this.element?.classList.add('message-form');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default ChatMessage;
