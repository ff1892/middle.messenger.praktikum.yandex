import Block from '../../core/block';
import tpl from './button.hbs';

type ButtonProps = {
  attributes: {
    class: string,
    type: string,
  },
  value: string,
  withInternalId?: boolean,
}

class Button extends Block<ButtonProps> {
  constructor(props: ButtonProps) {
    super('button', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default Button;
