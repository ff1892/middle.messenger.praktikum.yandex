import tpl from './main-link.hbs';
import Block from '../../core/block';

class MainLink extends Block {
  constructor(props) {
    super ('a', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default MainLink;
