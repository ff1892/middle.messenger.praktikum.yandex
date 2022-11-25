import tpl from './field.hbs';
import { Block } from '../../services/block/block';
import { TextInput } from '../text-input/text-input';

type FieldProps = {
  label: string,
  input: TextInput,
}

class Field extends Block<FieldProps> {
  constructor(props: FieldProps) {
    super('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { Field };
