import tpl from './button.hbs';
import { Block } from '../../services/block';

type ButtonProps = {
  attrs: {
    class: string,
    type: string,
  },
  value: string,
}

class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { Button };
