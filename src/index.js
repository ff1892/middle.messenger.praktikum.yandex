import './components';
import tpl from './modules/card/card.hbs';

const card = tpl({
  fname: 'students',
});

const onDomLoaded = () => {
  const root = document.querySelector('#root');
  root.innerHTML = card;
  const resButton = button('resButton', 'Button');
  root.insertAdjacentHTML('beforeend', resButton);
}

document.addEventListener('DOMContentLoaded', onDomLoaded);
