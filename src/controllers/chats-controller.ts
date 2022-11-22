import { BaseController } from './base-controller';
import { chatsAPI } from '../api/chats-api';
import { store } from '../services/store';
import { getCurrentChatById } from '../utils/get-current-chat';

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
}

const chatsController = new ChatsController();

export { chatsController };
