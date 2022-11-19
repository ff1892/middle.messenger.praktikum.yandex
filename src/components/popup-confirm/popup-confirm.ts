import tpl from './popup-confirm.hbs';
import { Block } from '../../services/block';
import { Button } from '../button/button';
import { validator } from '../../utils/validator';

type PopupConfirmProps = {
  title: string,
  submitButton: Button,
  rejectButton: Button,
};

class PopupConfirm extends Block<PopupConfirmProps> {
  constructor(props: PopupConfirmProps) {
    super('div', props);

    this.element?.classList.add('popup-confirm');
  }

  render() {
    return this.compile(tpl, this.props);
  }
};

const popupConfirm = new PopupConfirm({
  title: 'Удалить чат?',
  submitButton: new Button({
    attrs: {
      type: 'button',
      class: 'button button--secondary',
    },
    value: 'Удалить',
    events: {
      click: () => {
        alert('Confirm');
        validator.closeModal();
      },
    },
  }),
  rejectButton: new Button({
    attrs: {
      type: 'button',
      class: 'button',
    },
    value: 'Отмена',
    events: {
      click: validator.closeModal,
    },
  }),

});

export { popupConfirm };
