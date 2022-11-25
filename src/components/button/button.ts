import tpl from './button.hbs';
import { Block } from '../../services/block/block';

type ButtonProps = {
  attrs: {
    class?: string,
    type: string,
    'aria-label'?: string,
  },
  value?: string,
  events?: Record<string, any>,
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
