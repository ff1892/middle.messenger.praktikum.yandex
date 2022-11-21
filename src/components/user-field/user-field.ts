import tpl from './user-field.hbs';
import { Block } from '../../services/block';

class UserField extends Block {
  constructor(props: Record<string, any>) {
    super('div', props);
    this.element?.classList.add('user-field');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { UserField };
