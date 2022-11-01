import tpl from './main-link.hbs';
import Block from '../../services/block';

export type MainLinkProps = {
  attrs: {
    class: string,
    href: string,
  }
  text: string,
  events: {
    click: (e: MouseEvent) => void,
  },
}

class MainLink extends Block<MainLinkProps> {
  constructor(props: MainLinkProps) {
    super('a', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default MainLink;
