import Block from '../../core/block';
import tpl from './button.hbs';

type TButtonProps = {
  attributes: {
    class: string,
    type: string,
  },
  value: string,
  withInternalId?: boolean,
}

class Button extends Block<TButtonProps> {
  constructor(props: TButtonProps) {
    super('button', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default Button;
