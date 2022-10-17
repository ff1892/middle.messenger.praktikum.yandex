import './components';
import './modules';
import mainPage from './pages/main';
import loginPage from './pages/login';
import signupPage from './pages/signup';
import notFoundPage from './pages/not-found';
import errorPage from './pages/error';
import userProfilePage from './pages/user-profile';
import passwordProfilePage from './pages/password-profile';
import chatPage from './pages/chat';


const pagesWithRoutes = {
  ['']: mainPage,
  login: loginPage,
  signup: signupPage,
  notfound: notFoundPage,
  error: errorPage,
  userform: userProfilePage,
  passwordform: passwordProfilePage,
  chat: chatPage,
};

const currentLocation = window.location.pathname.slice(1);

const currentPage = pagesWithRoutes[currentLocation];

const onDomLoaded = () => {
  const root = document.querySelector('#root');
  root.innerHTML = currentPage;

  const mainLink = document.querySelectorAll('.main-link');

  mainLink.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      history.pushState(link.textContent, 'Page', link.href);
      location.reload();
    })
  })
}

document.addEventListener('DOMContentLoaded', onDomLoaded);
