import MainPage from './pages/main/main';
import render from './utils/render';

const mainPage = new MainPage();

const pagesWithRoutes = {
  ['']: mainPage,
  login: mainPage,
  // signup: signupPage,
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
