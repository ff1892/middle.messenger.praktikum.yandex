import Block from '../../core/block';
import tpl from './form-layout.hbs';

type TFormLayoutProps = {
  layoutElement: Block<any>;
  withInternalId: boolean;
}

class FormLayout extends Block<TFormLayoutProps> {
  constructor(props: TFormLayoutProps) {
    super('div', props);
    this.element?.classList.add('form-layout');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default FormLayout;
