import Block from '../../core/block';
import tpl from './form.hbs';

type TFormProps = {
  title: string,
  withInternalId: boolean,
  link?: {
    href: string,
    text: string,
  }
  inputs: Array<string | undefined>;
}

class Form extends Block<TFormProps> {
  constructor(props: TFormProps) {
    super('form', props);
    this.element?.classList.add('form')
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default Form;
