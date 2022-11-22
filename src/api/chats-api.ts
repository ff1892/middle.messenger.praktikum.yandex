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
}

const chatsAPI = new ChatsAPI();

export { chatsAPI };
