import { MainPage } from './pages/main/main';
import { LoginPage } from './pages/login/login';
import { SignupPage } from './pages/signup/signup';
import { ErrorPage } from './pages/error/error';
import { NotFoundPage } from './pages/not-found/not-found';
import { UserProfilePage } from './pages/user-profile/user-profile';
import { PasswordProfilePage } from './pages/password-profile/password-profile';
import { ChatPage } from './pages/chat/chat';
import { Route } from './constants';
import { router } from './services/router';
import { Block } from './services/block';

import { authAPI } from './api/auth-api';
import { MOCK_DATA } from './mock';


const onDomLoaded = () => {
  router
  .use(Route.MAIN, MainPage as typeof Block)
  .use(Route.LOGIN, LoginPage as typeof Block)
  .use(Route.SIGNUP, SignupPage as typeof Block)
  .use(Route.CHAT, ChatPage as typeof Block)
  .use(Route.USERFORM, UserProfilePage as typeof Block)
  .use(Route.PASSWORDFORM, PasswordProfilePage as typeof Block)
  .use(Route.NOTFOUND, NotFoundPage as typeof Block)
  .use(Route.ERROR, ErrorPage as typeof Block)
  .start();
};

document.addEventListener('DOMContentLoaded', onDomLoaded);

// authAPI.logout();
// authAPI.login(MOCK_DATA.login);
authAPI.getUser();
