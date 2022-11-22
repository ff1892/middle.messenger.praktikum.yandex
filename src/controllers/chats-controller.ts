import { BaseController } from './base-controller';
import { chatsAPI } from '../api/chats-api';
import { store } from '../services/store';
import { getCurrentChatById } from '../utils/get-current-chat';
import { Toast } from '../components/toast/toast';
import { validator } from '../utils/validator';

class ChatsController extends BaseController {

  getChats() {
    this.showLoader();

    return chatsAPI.getChats()
      .then((chats) => {
        store.setState('chatsList', chats);
      })
      .catch(this.onError)
      .finally(this.hideLoader);
  }

  getCurrentChat(id: number) {
    const chats = store.getState().chatsList;
    const currentChat = getCurrentChatById(id, chats);
    store.setState('currentChat', currentChat);
  }

  updateAvatar(data: FormData) {
    this.showLoader();

    return chatsAPI.updateAvatar(data)
      .then((chat) => {
        const toast = new Toast({ text: 'Аватар обновлён 👍' });
        toast.show();
        store.setState('currentChat', chat);
        this.getChats();
        validator.closeModal();
        return chat;
      })
      .catch(this.onError)
      .finally(this.hideLoader);
  }
}

const chatsController = new ChatsController();

export { chatsController };
