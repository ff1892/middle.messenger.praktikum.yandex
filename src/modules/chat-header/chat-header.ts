import menuIcon from '../../../static/icons/menu.svg';
import deleteUserIcon from '../../../static/icons/delete-user.svg';
import deleteChatIcon from '../../../static/icons/delete-chat.svg';
import addUserIcon from '../../../static/icons/add-user.svg';
import tpl from './chat-header.hbs';
import { Block } from '../../services/block';
import { IconButton } from '../../components/icon-button/icon-button';
import { Popup } from '../../components/popup/popup';
import { PopupLink } from '../../components/popup-link/popup-link';
import { BoxPopup } from '../../components/box-popup/box-popup';
import {
  modalAddUser,
  modalDeleteUser,
  modalConfirm,
  modalAvatarChat,
} from '../modal/modal';
import { connect } from '../../utils/connect';
import { AvatarWithChat } from '../../components/avatar/avatar';
import { Button } from '../../components/button/button';

const addUserLink = new PopupLink({
  icon: addUserIcon,
  text: 'Добавить пользователя',
  attrs: {
    type: 'button',
    role: 'button',
  },
  events: {
    click: () => modalAddUser.show(),
  },
});

const deleteUserLink = new PopupLink({
  secondary: true,
  icon: deleteUserIcon,
  text: 'Удалить пользователя',
  attrs: {
    type: 'button',
    role: 'button',
  },
  events: {
    click: () => modalDeleteUser.show(),
  },
});

const deleteChatLink = new PopupLink({
  secondary: true,
  icon: deleteChatIcon,
  text: 'Удалить чат',
  attrs: {
    type: 'button',
    role: 'button',
  },
  events: {
    click: () => modalConfirm.show(),
  },
});

const popup = new Popup({
  items: [
    addUserLink,
    deleteUserLink,
    deleteChatLink,
  ],
});

const iconButton = new IconButton({
  type: 'button',
  icon: menuIcon,
});

const boxPopup = new BoxPopup({
  attrs: {
    class: 'chat-header__button',
  },
  wrapperClass: 'chat-header__popup visually-hidden',
  iconButton,
  popup,
  events: {
    mouseenter: popup.showParent.bind(popup),
    mouseleave: popup.hideParent.bind(popup),
  },
});

const avatar = new AvatarWithChat('div', {});

class ChatHeaderWithStore extends Block {

  customize() {
    this.element?.classList.add('chat-header');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withCurrentChat = connect((state) => {
  const chat = { ...state.currentChat };
  return {
    title: chat.title,
    img: chat.avatar,
  };
});

const ChatHeaderWithChat = withCurrentChat(ChatHeaderWithStore);

const ChatHeader = new ChatHeaderWithChat('div', {
  title: 'Чат',
  boxPopup,
  avatar,
  buttonChange: new Button({
    attrs: {
      type: 'button',
      class: 'chat-header__avatar-change',
    },
    value: 'Поменять аватар',
    events: {
      click: modalAvatarChat.show.bind(modalAvatarChat),
    },
  }),
});

export { ChatHeader };
