import tpl from './user-form.hbs';
import { Block } from '../../services/block/block';

type UserFormType = Record<string, any>;

class UserForm extends Block {
  constructor(props: UserFormType) {
    super('section', props);
    this.element?.classList.add('user-form');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { UserForm };
