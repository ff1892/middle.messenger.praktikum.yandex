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
  modalAvatar,
} from '../modal/modal';
import { connect } from '../../utils/connect';
import { Avatar } from '../../components/avatar/avatar';
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
})
// props.boxPopup = boxPopup;

class ChatHeaderWithStore extends Block {

  customize() {
    this.element?.classList.add('chat-header');
  }

  componentDidUpdate() {
    this.props.avatar = new Avatar({
      src: this.props.img,
      alt: `Аватар чата ${this.props.title}`,
    });
    return true;
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withCurrentChat = connect((state) => {
  const chat = {...state.currentChat };
  return {
    title: chat.title,
    img: chat.avatar,
  };
});

const ChatHeaderWithChat = withCurrentChat(ChatHeaderWithStore);

const ChatHeader = new ChatHeaderWithChat( 'div', {
  title: 'Чат',
  boxPopup,
  avatar: new Avatar({
    src:  '',
    alt: 'Аватар чата',
  }),
  buttonChange: new Button({
    attrs: {
      type: 'button',
      class: 'chat-header__avatar-change',
    },
    value: 'Поменять аватар',
    events: {
      click: modalAvatar.show.bind(modalAvatar),
    },
  }),
  }
)

export { ChatHeader };
