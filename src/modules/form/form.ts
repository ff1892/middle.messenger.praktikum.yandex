import tpl from './form.hbs';
import { Block } from '../../services/block';
import { Field } from '../../components/field/field';
import { Link } from '../../components/link/link';
import { Button } from '../../components/button/button';

type FormProps = {
  title: string,
  link?: Link,
  inputs: Field[],
  button: Button,
  events: {
    submit: (e: SubmitEvent) => void;
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

export { Form };
