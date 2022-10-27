import tpl from './main-link.hbs';
import Block from '../../core/block';

export type TMainLinkProps = {
  attributes: {
    class: string,
    href: string,
  }
  text: string,
  withInternalId?: boolean,
}

class MainLink extends Block<TMainLinkProps> {
  constructor(props: TMainLinkProps) {
    super ('a', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default MainLink;
