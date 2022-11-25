import tpl from './loader.hbs';
import { Block } from '../../services/block';

class Loader extends Block {
  constructor(props = {}) {

    super('div', props);
    this.element?.classList.add('loader');
  }

  render() {
    return this.compile(tpl, this.props);
  }

  show() {
    document.body.append(this.getContent()!);
  }

  hide() {
    this.getContent()?.remove();
  }
}

const loader = new Loader();

export { loader };
