import tpl from './button-profile.hbs';
import { Block } from '../../services/block';
import { Popup } from '../popup/popup';
import { Avatar } from '../avatar/avatar';

type ButtonProfileProps = {
  avatar: Avatar,
  popup: Popup,
  events: {
    mouseenter: (e: MouseEvent) => void;
    mouseleave: (e: MouseEvent) => void;
  },
}

class ButtonProfile extends Block<ButtonProfileProps> {
  constructor(props: ButtonProfileProps) {
    super('div', props);
    this.element?.classList.add('button-profile');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { ButtonProfile };
