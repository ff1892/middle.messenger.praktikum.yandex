import tpl from './popup-link.hbs';
import { Block } from '../../services/block/block';

type PopupLinkProps = {
  secondary?: boolean,
  icon: string,
  text: string,
  attrs: {
    href?: string,
    type?: string,
    role?: string,
  },
  events?: {
    click: (e: MouseEvent) => void;
  }
}

class PopupLink extends Block<PopupLinkProps> {
  constructor(props: PopupLinkProps) {
    super('a', props);

    this.element?.classList.add('popup-link');
    if (props.secondary) {
      this.element?.classList.add('popup-link--secondary');
    }
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { PopupLink };
