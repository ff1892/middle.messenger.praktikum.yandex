import tpl from './popup.hbs';
import { Block } from '../../services/block';
import { PopupLink } from '../popup-link/popup-link';

type PopupProps = {
  items?: PopupLink[];
}

class Popup extends Block<PopupProps> {
  constructor(props: {}) {
    super('div', props);

    this.element?.classList.add('popup');
  }

  private _getParent() {
    return this.getContent()?.parentElement;
  }

  render() {
    return this.compile(tpl, this.props);
  }

  showParent() {
    this._getParent()?.classList.remove('visually-hidden');
  }

  hideParent() {
    this._getParent()?.classList.add('visually-hidden');
  }

  toggleShowParent() {
    this._getParent()?.classList.toggle('visually-hidden');
  }
}

export { Popup };
