import { BaseController } from './base-controller';
import { chatsAPI } from '../api/chats-api';
import { store } from '../services/store';
import { getCurrentChatById } from '../utils/get-current-chat';
import { Toast } from '../components/toast/toast';
import { validator } from '../utils/validator';
import { userController } from './user-controller';

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

  clearCurrentChat() {
    const state = store.getState();
    const newState = { ...state };
    delete newState.currentChat;
    store.setState('currentChat', {id: null});
  }

  deleteChat() {
    this.showLoader();
    const chatId = store.getState().currentChat.id;
    return chatsAPI.deleteChat({ chatId })
      .then((response) => {
        const toast = new Toast({ text: 'Чат удален 👍' });
        toast.show();
        this.getChats();
        this.clearCurrentChat();
        validator.closeModal();
        return response;
      })
      .catch(this.onError)
      .finally(this.hideLoader);
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

  createChat(e: SubmitEvent, title: string) {
    this.showLoader();

    return chatsAPI.createChat({ title })
      .then((res) => {
        const toast = new Toast({ text: 'Чат создан 👍' });
        toast.show();
        this.clearInputs(e);
        this.getChats();
        validator.closeModal();
        return res;
      })
      .catch(this.onError)
      .finally(this.hideLoader);
  }

  addUserToChat(e: SubmitEvent, login: string) {
    this.showLoader();

    return userController.getUserByLogin(login)
      .then((user) => {
        if (!user) {
          throw new Error();
        };
        const data = {
          users: [user.id],
          chatId: store.getState().currentChat.id,
        };
        return chatsAPI.addUser(data);
      })
      .then((response) => {
        const toast = new Toast({ text: `${login} добавлен в чат 👍` });
        toast.show();
        this.clearInputs(e);
        validator.closeModal();
        return response;
      })
      .catch((err) => {
        this.onError(err, 'Ошибка при добавлении пользователя');
      })
      .finally(this.hideLoader);
  }

  deleteUserFromChat(e: SubmitEvent, login: string) {
    this.showLoader();

    return userController.getUserByLogin(login)
      .then((user) => {
        if (!user) {
          throw new Error();
        };
        const data = {
          users: [user.id],
          chatId: store.getState().currentChat.id,
        };
        return chatsAPI.deleteUser(data);
      })
      .then((response) => {
        const toast = new Toast({ text: `${login} удалён из чата 👍` });
        toast.show();
        this.clearInputs(e);
        validator.closeModal();
        return response;
      })
      .catch((err) => {
        this.onError(err, 'Ошибка при удалении пользователя');
      })
      .finally(this.hideLoader);
  }
}

const chatsController = new ChatsController();

export { chatsController };
