import tpl from './main-link.hbs';
import Block from '../../services/block';

export type MainLinkProps = {
  attributes: {
    class: string,
    href: string,
  }
  text: string,
}

class MainLink extends Block<MainLinkProps> {
  constructor(props: MainLinkProps) {
    super ('a', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default MainLink;
