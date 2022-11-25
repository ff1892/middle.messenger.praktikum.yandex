import tpl from './icon-button.hbs';
import { Block } from '../../services/block/block';

type IconButtonProps = Record<string, any>;

class IconButton extends Block<IconButtonProps> {
  constructor(props: IconButtonProps = {}) {
    super('button', props);
    this.element?.classList.add('icon-button');

    if (props.primary) {
      this.element?.classList.add('icon-button--primary');
    }
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { IconButton };
