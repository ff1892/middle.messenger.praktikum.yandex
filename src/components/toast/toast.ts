import tpl from './toast.hbs';
import { Block } from '../../services/block/block';

type ToastProps = {
  text: string,
  isError?: boolean,
};

class Toast extends Block {
  constructor(props: ToastProps) {
    super('div', props);
    this.element?.classList.add('toast');
  }

  render() {
    return this.compile(tpl, this.props);
  }

  show() {
    document.body.append(this.getContent()!);
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  hide() {
    this.getContent()?.remove();
  }
}

export { Toast };
