import MainPage from './pages/main/main';
import LoginPage from './pages/login/login';
import SignupPage from './pages/signup/signup';
import render from './utils/render';

const mainPage = new MainPage({});
const loginPage = new LoginPage({});
const signupPage = new SignupPage({});

const pagesWithRoutes = {
  ['']: mainPage,
  login: loginPage,
  signup: signupPage,
  // notfound: notFoundPage,
  // error: errorPage,
  // userform: userProfilePage,
  // passwordform: passwordProfilePage,
  // chat: chatPage,
};

const currentLocation = window.location.pathname.slice(1);
const currentPage = pagesWithRoutes[currentLocation];

const onDomLoaded = () => {
  render('#root', currentPage);
}

document.addEventListener('DOMContentLoaded', onDomLoaded);
