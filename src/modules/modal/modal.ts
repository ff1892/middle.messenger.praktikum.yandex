import tpl from './modal.hbs';
import { Block } from '../../services/block';
import { Button } from '../../components/button/button';
import { avatarForm } from '../avatar-form/avatar-form';
import { validator } from '../../utils/validator';
import {
  popupAddUser,
  popupDeleteUser,
  popupAddChat,
} from '../popup-form/popup-form';
import { popupConfirm } from '../../components/popup-confirm/popup-confirm';

const closeButtonProps = {
  attrs: {
    class: 'modal__close-button',
    type: 'button',
    'aria-label': 'Закрыть форму',
  },
  events: {
    click: validator.closeModal,
  },
};

type ModalProps = Record<string, any>

class Modal extends Block<ModalProps> {
  constructor(props: ModalProps) {
    super('div', { ...props, closeButton: new Button(closeButtonProps) });
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

const modalAvatar = new Modal({ content: avatarForm });
const modalAddUser = new Modal({ content: popupAddUser });
const modalDeleteUser = new Modal({ content: popupDeleteUser });
const modalAddChat = new Modal({ content: popupAddChat });
const modalConfirm = new Modal({ content: popupConfirm });

export {
  modalAvatar,
  modalAddUser,
  modalDeleteUser,
  modalAddChat,
  modalConfirm,
};
