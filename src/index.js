import './components';
import './modules';
import mainPage from './pages/main';
import loginPage from './pages/login';
import signupPage from './pages/signup';
import notFoundPage from './pages/not-found';
import errorPage from './pages/error';


const pagesWithRoutes = {
  ['']: mainPage,
  login: loginPage,
  signup: signupPage,
  notfound: notFoundPage,
  error: errorPage,
};

const currentLocation = window.location.pathname.slice(1);

const currentPage = pagesWithRoutes[currentLocation];

const onDomLoaded = () => {
  const root = document.querySelector('#root');
  root.innerHTML = currentPage;
}

document.addEventListener('DOMContentLoaded', onDomLoaded);
