import Block from '../../core/block';
import tpl from './chat-preview.hbs';
import Preview from '../../components/preview/preview';
import Avatar from '../../components/avatar/avatar';
import checkIcon from 'bundle-text:../../../static/icons/check.svg';
import doubleheckIcon from 'bundle-text:../../../static/icons/double-check.svg';


type ChatPreviewProps = Record<string, any>

const preview = new Preview({
  avatar: new Avatar({ src: '/img/mock4.jpg', alt: 'Аватар чата', unreadCount: 15 }),
  title: 'Рабочий чат 🤯',
  text: 'Если оборачивать даты в простые блоки <div> или другие элементы, они будут восприниматься интерпретатором как простой текст',
  date: '2022-10-30',
  dateString: 'Вс',
  tickIcon: doubleheckIcon,
});

const preview2 = new Preview({
  avatar: new Avatar({ src: '/img/mock5.jpg', alt: 'Аватар чата'}),
  title: 'Rock-n-roll Kiiiiing',
  text: 'Прикольно!',
  date: '2022-10-12',
  dateString: '12 окт',
  tickIcon: checkIcon,
});

const previews = [preview, preview2];

class ChatPreview extends Block<ChatPreviewProps> {
  constructor(props: ChatPreviewProps = {}) {
    props['previews'] = previews;
    super('div', props);
    this.element?.classList.add('chat-preview');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default ChatPreview;
