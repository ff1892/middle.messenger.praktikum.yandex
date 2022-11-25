import tpl from './box-popup.hbs';
import { Block } from '../../services/block/block';
import { Popup } from '../popup/popup';
import { IconButton } from '../icon-button/icon-button';

type BoxPopupProps = {
  iconButton: IconButton,
  popup: Popup,
  wrapperClass: string,
  attrs: {
    class: string,
  },
  events: {
    mouseenter: () => void;
    mouseleave: () => void;
  },
};

class BoxPopup extends Block<BoxPopupProps> {
  constructor(props: BoxPopupProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { BoxPopup };
