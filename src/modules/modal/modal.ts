import tpl from './modal.hbs';
import { Block } from '../../services/block';
import { Button } from '../../components/button/button';
import { avatarForm } from '../avatar-form/avatar-form';

const closeModal = () => {
  const modal = document.querySelector('.modal');
  modal?.remove();
};

const closeButton = new Button({
  attrs: {
    class: 'modal__close-button',
    type: 'button',
    'aria-label': 'Закрыть форму',
  },
  events: {
    click: closeModal.bind(this),
  },
})

type ModalProps = Record<string, any>

class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super('div', { ...props, closeButton });

    this.element?.classList.add('modal');
  }

  render() {
    return this.compile(tpl, this.props);
  }

  show() {
    document.body.append(this.getContent()!);
  }

  hide() {
    this.getContent()?.remove();
  }
}

const modalAvatar = new Modal({ content: avatarForm })

export { modalAvatar };
