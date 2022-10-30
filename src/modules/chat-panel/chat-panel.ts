import Block from '../../services/block';
import tpl from './chat-panel.hbs';
import SearchInput from '../../components/search-input/search-input';
import ButtonProfile from '../../components/button-profile/button-profile';

const profile = new ButtonProfile({
  src: '/img/mock6.jpg',
  alt: 'Ваш аватар',
  attributes: {
    type: 'button',
    role: 'button',
    title: 'Данные профиля | Создать чат',
    ['aria-label']: 'Данные профиля | Создать чат',
  },
});

const searchInput = new SearchInput();

type ChatPanelProps = Record<string, any>

class ChatPanel extends Block<ChatPanelProps> {
  constructor(props: ChatPanelProps = {}) {
    props['profile'] = profile;
    props['search'] = searchInput;
    super('div', props);
    this.element?.classList.add('chat-panel');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default ChatPanel;
