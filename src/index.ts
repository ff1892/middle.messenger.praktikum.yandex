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
import { authController } from './controllers/auth-controller';
import './style.scss';

const onDomLoaded = () => {
  router
    .openPaths(Route.LOGIN, Route.SIGNUP, Route.ERROR, Route.NOTFOUND)
    .hideAuthPaths(Route.LOGIN, Route.SIGNUP)
    .protectedCb(authController.checkUser.bind(authController))
    .hiddenAuthCb(authController.checkHiddenAuth.bind(authController))
    .use(Route.LOGIN, LoginPage as typeof Block)
    .use(Route.SIGNUP, SignupPage as typeof Block)
    .use(Route.CHAT, ChatPage as typeof Block)
    .use(Route.USERFORM, UserProfilePage as typeof Block)
    .use(Route.PASSWORDFORM, PasswordProfilePage as typeof Block)
    .use(Route.ERROR, ErrorPage as typeof Block)
    .use(Route.NOTFOUND, NotFoundPage as typeof Block)
    .start();
};

document.addEventListener('DOMContentLoaded', onDomLoaded);
