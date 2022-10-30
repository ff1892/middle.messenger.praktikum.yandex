import Block from '../../services/block';
import tpl from './field.hbs';

type TFieldProps = {
  label: string,
  type: string,
  name: string,
  placeholder: string,
}

class Field extends Block<TFieldProps> {
  constructor(props: TFieldProps) {
    super ('div', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default Field;
