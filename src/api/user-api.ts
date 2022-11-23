import { BaseAPI } from './base-api';
import { ApiRoute } from '../constants';

class UserAPI extends BaseAPI {
  constructor() {
    super(ApiRoute.USER);
  }

  updateProfile(data: Record<string, any>) {
    return this.put(
      ApiRoute.USER_PROFILE,
      { json: true, data },
    );
  }

  updatePassword(data: Record<string, any>) {
    return this.put(
      ApiRoute.USER_PASSWORD,
      { json: true, notConvert: true, data },
    );
  }

  updateAvatar(data: FormData) {
    return this.put(
      ApiRoute.USER_AVATAR,
      {
        headers: {},
        notConvert: true,
        data,
      },
    );
  }

  searchUser(data: { login: string }) {
    return this.post(
      ApiRoute.USER_SEARCH,
      { json: true, data },
    )
  }
}

const userAPI = new UserAPI();

export { userAPI };
