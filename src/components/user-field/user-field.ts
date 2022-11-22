import tpl from './user-field.hbs';
import { Block } from '../../services/block';
import { TextInput } from '../text-input/text-input';

type UserFieldProps = {
  label: string,
  input: TextInput,
}

class UserField extends Block {
  constructor(props: UserFieldProps) {
    super('div', props);
    this.element?.classList.add('user-field');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { UserField };
