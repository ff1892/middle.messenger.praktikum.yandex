import iconArrow from '../../../static/icons/back-arrow.svg';
import tpl from './error-layout.hbs';
import { Block } from '../../services/block';
import { IconLink } from '../../components/icon-link/icon-link';
import { Route } from '../../constants';

type ErrorLayoutProps = {
  title: string,
  text: string,
  date: string,
  dateString: string,
  iconLink?: IconLink,
};

class ErrorLayout extends Block<ErrorLayoutProps> {
  constructor(props: ErrorLayoutProps) {
    props.iconLink = new IconLink({
      icon: iconArrow,
      linkText: 'Вернуться к чатам',
      attrs: {
        href: Route.CHAT,
      },
    });
    super('section', props);
    this.element?.classList.add('error-layout');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { ErrorLayout };
