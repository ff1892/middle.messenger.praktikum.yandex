import { BaseAPI } from './base-api';
import { ApiRoute } from '../constants';

class ChatsAPI extends BaseAPI {
  constructor() {
    super(ApiRoute.CHATS);
  }

  getChats() {
    return this.get(
      ApiRoute.CHATS_GET,
    );
  }

  createChat(data: { title: string }) {
    return this.post(
      ApiRoute.CHATS_CREATE,
      { json: true, data },
    );
  }

  deleteChat(data: { chatId: number }) {
    return this.delete(
      ApiRoute.CHATS_DELETE,
      {
        json: true,
        notConvert: true,
        data
      },
    );
  }

  updateAvatar(data: FormData) {
    return this.put(
      ApiRoute.CHATS_AVATAR,
      {
        headers: {},
        notConvert: true,
        data,
      },
    );
  }

  addUser(data: { users: number[], chatId: number }) {
    return this.put(
      ApiRoute.CHATS_ADD_USER,
      {
        json: true,
        notConvert: true,
        data
      },
    );
  }

  deleteUser(data: { users: number[], chatId: number }) {
    return this.delete(
      ApiRoute.CHATS_DELETE_USER,
      {
        json: true,
        notConvert: true,
        data
      },
    );
  }

  getToken(chatId: number) {
    return this.post(
      `${ApiRoute.CHATS_TOKEN}/${chatId}`,
      { json: true },
    )
  }
}

const chatsAPI = new ChatsAPI();

export { chatsAPI };
