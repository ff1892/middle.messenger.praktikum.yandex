import tpl from './icon-link.hbs';
import { Block } from '../../services/block/block';
import { router } from '../../services/router';

type IconLinkProps = {
  icon: string,
  linkText: string,
  attrs: {
    href: string,
  },
  events?: {
    click: (e: MouseEvent) => void;
  }
}

class IconLink extends Block<IconLinkProps> {
  constructor(props: IconLinkProps) {
    super('a', {
      ...props,
      events: {
        click: (e) => {
          e.preventDefault();
          router.go(props.attrs.href);
        },
      },
    });

    this.element?.classList.add('icon-link');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { IconLink };
