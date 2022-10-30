import MainPage from './pages/main/main';
import LoginPage from './pages/login/login';
import SignupPage from './pages/signup/signup';
import ErrorPage from './pages/error/error';
import NotFoundPage from './pages/not-found/not-found';
import UserProfilePage from './pages/user-profile/user-profile';
import PasswordProfilePage from './pages/password-profile/password-profile';
import ChatPage from './pages/chat/chat';
import render from './utils/render';

const mainPage = new MainPage();
const loginPage = new LoginPage();
const signupPage = new SignupPage();
const errorPage = new ErrorPage();
const notFoundPage = new NotFoundPage();
const userProfilePage = new UserProfilePage();
const passwordProfilePage = new PasswordProfilePage();
const chatPage = new ChatPage();


const pagesWithRoutes = {
  ['']: mainPage,
  chat: chatPage,
  login: loginPage,
  signup: signupPage,
  notfound: notFoundPage,
  error: errorPage,
  userform: userProfilePage,
  passwordform: passwordProfilePage,
};

const currentLocation = window.location.pathname.slice(1);
const currentPage = pagesWithRoutes[currentLocation];

const onDomLoaded = () => {
  render('#root', currentPage);
}

document.addEventListener('DOMContentLoaded', onDomLoaded);
