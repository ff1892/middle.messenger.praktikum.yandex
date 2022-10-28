import Block from '../../core/block';
import tpl from './form.hbs';
import Field from '../../components/field/field';

type TFormProps = {
  title: string,
  withInternalId: boolean,
  link?: {
    href: string,
    text: string,
  }
  inputs: Field[],
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
