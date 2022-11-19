import tpl from './chat-panel.hbs';
import { Block } from '../../services/block';
import { SearchInput } from '../../components/search-input/search-input';
import { ButtonProfile } from '../../components/button-profile/button-profile';
import { getFormData } from '../../utils/get-formdata';
import { Popup } from '../../components/popup/popup';
import { PopupLink } from '../../components/popup-link/popup-link';
import { Route } from '../../constants';
import { router } from '../../services/router';
import iconProfile from 'bundle-text:../../../static/icons/profile.svg';
import newChat from 'bundle-text:../../../static/icons/new-chat.svg';
import { modalAddChat } from '../modal/modal';

const profileLink = new PopupLink({
  icon: iconProfile,
  text: 'Перейти в профиль',
  attrs: {
    href: Route.USERFORM,
  },
  events: {
    click: () => router.go(Route.USERFORM),
  }
})

const newChatBtn = new PopupLink({
  icon: newChat,
  text: 'Новый чат',
  attrs: {
    type: 'button',
    role: 'button',
  },
  events: {
    click: () => modalAddChat.show(),
  }
})

const popup = new Popup({
  items: [profileLink, newChatBtn],
});

const profile = new ButtonProfile({
  src: '/img/mock6.jpg',
  alt: 'Ваш аватар',
  attrs: {
    type: 'button',
    role: 'button',
    title: 'Данные профиля | Создать чат',
    'aria-label': 'Данные профиля | Создать чат',
  },
  popup,
  events: {
    mouseenter: popup.showParent.bind(popup),
    mouseleave: popup.hideParent.bind(popup),
  }
});

const searchInput = new SearchInput({
  events: {
    submit: getFormData,
  },
});

type ChatPanelProps = Record<string, any>

class ChatPanel extends Block<ChatPanelProps> {
  constructor(props: ChatPanelProps = {}) {
    props.profile = profile;
    props.search = searchInput;
    super('div', props);
    this.element?.classList.add('chat-panel');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { ChatPanel };
