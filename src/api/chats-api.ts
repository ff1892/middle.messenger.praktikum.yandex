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
}

const chatsAPI = new ChatsAPI();

export { chatsAPI };
