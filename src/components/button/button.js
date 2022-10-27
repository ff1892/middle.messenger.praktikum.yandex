import Block from '../../core/block';
import tpl from './button.hbs';

class Button extends Block {
  constructor(props) {
    super('button', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default Button;
