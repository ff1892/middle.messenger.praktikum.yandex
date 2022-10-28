import Block from '../../core/block';
import IconLink from '../../components/icon-link/icon-link';
import tpl from './error-layout.hbs';
import { Route } from '../../constants';
import iconArrow from 'bundle-text:../../../static/icons/back-arrow.svg';


  // {{!-- {{>iconLink linkHref="/" linkText="На главную" icon=icon }} --}}


type ErrorLayoutProps = {
  title: string,
  text: string,
  date: string,
  dateString: string,
  iconLink?: IconLink,
};

class ErrorLayout extends Block<ErrorLayoutProps> {
  constructor(props: ErrorLayoutProps) {
    props['iconLink'] = new IconLink({
      linkHref: Route.MAIN,
      icon: iconArrow,
      linkText: 'На главную',
    });
    super('section', props);
    this.element?.classList.add('error-layout');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default ErrorLayout;
