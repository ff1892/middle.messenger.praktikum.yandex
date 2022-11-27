/* eslint-disable no-console */
import iconAttach from 'bundle-text:../../../static/icons/attach.svg';
import iconSend from 'bundle-text:../../../static/icons/message.svg';
import iconPhoto from 'bundle-text:../../../static/icons/photo.svg';
import iconSticker from 'bundle-text:../../../static/icons/smile.svg';
import tpl from './chat-message.hbs';
import { Block } from '../../services/block';
import { IconButton } from '../../components/icon-button/icon-button';
import { MessageField } from '../../components/message-field/message-field';
import { validator } from '../../utils/validator';
import { BoxPopup } from '../../components/box-popup/box-popup';
import { PopupLink } from '../../components/popup-link/popup-link';
import { Popup } from '../../components/popup/popup';
import { messageController } from '../../controllers/message-controller';

const handleSubmit = (e: SubmitEvent) => {
  const isValid = validator.handleSubmit(e);
  if (!isValid) {
    return;
  }
  const form = <HTMLFormElement>e.target;
  const input = form.querySelector('input[name="message"]') as HTMLInputElement;
  const message = input.value;
  messageController.sendMessage(message);
  input.value = '';
};

const filePopupLink = new PopupLink({
  icon: iconPhoto,
  text: 'Фото/видео',
  attrs: {
    type: 'button',
    role: 'button',
  },
  events: {
    click: () => console.log('Add photo'),
  },
});

const stickerPopupLink = new PopupLink({
  icon: iconSticker,
  text: 'Стикер',
  attrs: {
    type: 'button',
    role: 'button',
  },
  events: {
    click: () => console.log('Add sticker'),
  },
});

const popup = new Popup({
  items: [filePopupLink, stickerPopupLink],
});

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
    input: validator.handleChange,
  },
});

const boxPopup = new BoxPopup({
  attrs: {
    class: 'message-form__button',
  },
  wrapperClass: 'message-form__popup',
  iconButton: attachButton,
  popup,
  events: {
    mouseenter: popup.showParent.bind(popup),
    mouseleave: popup.hideParent.bind(popup),
  },
});

type ChatMessageProps = {
  attachButton: IconButton,
  sendButton: IconButton,
  messageField: MessageField,
  boxPopup: BoxPopup,
  events: {
    submit: (e: SubmitEvent) => void,
  },
} | {};

export const chatMessageProps = {
  attachButton,
  sendButton,
  messageField,
  boxPopup,
  events: {
    submit: handleSubmit,
  },
};

class ChatMessage extends Block<ChatMessageProps> {
  constructor(props: ChatMessageProps = {}) {
    props = chatMessageProps;
    super('form', props);
    this.element?.classList.add('message-form');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { ChatMessage };
