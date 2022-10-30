import tpl from './icon-link.hbs';
import Block from '../../services/block';


type IconLinkProps = {
  linkHref: string,
  icon: string,
  linkText: string
}

class IconLink extends Block<IconLinkProps> {
  constructor(props: IconLinkProps) {
    super('a', props);
    this.element?.classList.add('icon-link');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default IconLink;

