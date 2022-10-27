import Block from '../../core/block';
import tpl from './field.hbs';

class Field extends Block {
  constructor(props) {
    super ('div', props);
  }

  render() {
    return tpl(this.props);
  }
}

export default Field;
