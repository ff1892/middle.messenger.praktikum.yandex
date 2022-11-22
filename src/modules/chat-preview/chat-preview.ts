import tpl from './chat-preview.hbs';
import { Block } from '../../services/block';
import { Preview } from '../../components/preview/preview';
import { Avatar } from '../../components/avatar/avatar';
import { connect } from '../../utils/connect';
import { chatsController } from '../../controllers/chats-controller';
import { store } from '../../services/store';

const handleChange = (id: number) => {
  chatsController.getCurrentChat(id);
}

class ChatPreviewWithStore extends Block {

  customize() {
    this.element?.classList.add('chat-preview');
  }

  componentDidUpdate() {

    const previews = this.props.dataChats.map(( chat: Record<string,any>) => (
      new Preview ({
        attrs: {
          ['data-id']: chat.id,
        },
        avatar: new Avatar({
          src: chat.avatar,
          alt: `Аватар чата: ${ chat.title }`,
          unreadCount: chat.unreadCount,
        }),
        title: chat.title,
        text: chat.lastMessage?.content || '',
        date: chat.lastMessage?.date || null,
        dateString: '12 окт',
        events: {
          input: () => handleChange(chat.id),
        },
      })
    ));

    this.props.previews = previews;
    console.log(this.props.previews);

    return true;
  }

  render() {
    return this.compile(tpl, this.props);
  }
}


const withChats = connect((state) => {
  const chats = state.chatsList;
  return { dataChats: chats };
});

const ChatWithPreview = withChats(ChatPreviewWithStore);
const ChatPreview = new ChatWithPreview('div', { previews: []});

export { ChatPreview };
