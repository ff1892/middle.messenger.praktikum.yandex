import menuIcon from 'bundle-text:../../../static/icons/menu.svg';
import addUserIcon from 'bundle-text:../../../static/icons/add-user.svg';
import deleteUserIcon from 'bundle-text:../../../static/icons/delete-user.svg';
import deleteChatIcon from 'bundle-text:../../../static/icons/delete-chat.svg';
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
} from '../modal/modal';

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
})

type ChatHeaderProps = Record<string, any>;

class ChatHeader extends Block<ChatHeaderProps> {
  constructor(props: ChatHeaderProps = {}) {
    props.boxPopup = boxPopup;
    super('div', props);
    this.element?.classList.add('chat-header');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { ChatHeader };
