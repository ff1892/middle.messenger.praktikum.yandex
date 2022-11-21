import tpl from './text-input.hbs';
import { Block } from '../../services/block';
import { connect } from '../../utils/connect';
import { authController } from '../../controllers/auth-controller';

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

class TextInputBase extends Block {

  customize() {
    this.element?.classList.add('text-input');
  }

  async componentDidMount() {
    await authController.checkUser();
    const element = this.element as HTMLInputElement;
    element.value = this.props.value;
  }

  render() {
    return this.compile(tpl, this.props);
  }
};

const withValue = (name: string) => connect((state) => {
  const user = {...state.currentUser }
  const currentValue = user[name];

  if (currentValue) {
    return {value: currentValue};
  }
  return {value: ''};
});

export { TextInput, TextInputBase, withValue };
