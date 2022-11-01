import Block from '../../services/block';
import tpl from './form.hbs';
import Field from '../../components/field/field';

type FormProps = {
  title: string,
  link?: {
    href: string,
    text: string,
  }
  inputs: Field[],
  events: {
    submit: (evt: SubmitEvent) => void;
  }
}

class Form extends Block<FormProps> {
  constructor(props: FormProps) {
    super('form', props);
    this.element?.classList.add('form');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default Form;
