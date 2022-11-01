import Block from '../../services/block';
import tpl from './text-input.hbs';

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
    super ('input', props);
    this.element?.classList.add('text-input');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default TextInput;
