import tpl from './form-layout.hbs';
import { Block } from '../../services/block/block';

type FormLayoutProps = {
  layoutElement: Block<any>;
}

class FormLayout extends Block<FormLayoutProps> {
  constructor(props: FormLayoutProps) {
    super('div', props);
    this.element?.classList.add('form-layout');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { FormLayout };
