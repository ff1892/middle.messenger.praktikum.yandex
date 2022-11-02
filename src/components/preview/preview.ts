import Block from '../../services/block';
import tpl from './preview.hbs';
import cutString from '../../utils/cut-string';

type PreviewProps = Record<string, any>;

class Preview extends Block<PreviewProps> {
  constructor(props: PreviewProps) {
    props.text = cutString(45, props.text);
    props.title = cutString(22, props.title);
    super('div', props);
    this.element?.classList.add('preview');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default Preview;
