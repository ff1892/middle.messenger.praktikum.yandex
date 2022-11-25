import tpl from './text-input.hbs';
import { Block } from '../../services/block/block';
import { connect } from '../../utils/connect';

type TextInputProps = {
  attrs: {
    type: string,
    name: string,
    placeholder?: string,
    value?:string
  },
  events: {
    focus: (e: FocusEvent) => void;
    blur: (e: FocusEvent) => void;
    input: (e: KeyboardEvent) => void;
  },
};

class TextInput extends Block<TextInputProps> {
  constructor(props: TextInputProps) {
    super('input', props);
    this.element?.classList.add('text-input');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

class TextInputStore extends Block {

  customize() {
    this.element?.classList.add('text-input');
  }

  componentDidUpdate() {
    const element = this.element as HTMLInputElement;
    element.value = this.props.value;
    return true;
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const withValue = (name: string) => connect((state) => {
  const user = { ...state.currentUser };
  const currentValue = user[name];

  if (currentValue) {
    return { value: currentValue };
  }
  return { value: '' };
});

export { TextInput, TextInputStore, withValue };
