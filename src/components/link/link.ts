import tpl from './link.hbs';
import { Block } from '../../services/block';
import { router } from '../../services/router';

type LinkProps = {
  text: string,
  attrs: {
    href: string,
  },
  events?: {
    click: (e: MouseEvent) => void;
  }
}

class Link extends Block<LinkProps> {
  constructor(props: LinkProps) {

    super('a', {...props, events: {
      click: (e) => {
        e.preventDefault();
        router.go(props.attrs.href);
      }
    }});

    this.element?.classList.add('link');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { Link };
