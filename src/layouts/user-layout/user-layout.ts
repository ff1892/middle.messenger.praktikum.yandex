import tpl from './user-layout.hbs';
import Block from '../../core/block';
import IconLink from '../../components/icon-link/icon-link';
import Button from '../../components/button/button';
import { Route } from '../../constants';
import iconArrow from 'bundle-text:../../../static/icons/back-arrow.svg';


type UserLayoutProps = Record<string, any>;

const iconLink = new IconLink({
  linkHref: Route.CHAT,
  linkText: 'Вернуться к чатам',
  icon: iconArrow,
});

const button = new Button({
  attributes: {
    class: 'button',
    type: 'button',
  },
  value: 'Выйти',
})

class UserLayout extends Block<UserLayoutProps> {
  constructor(props: UserLayoutProps = {}) {
    props['iconLink'] = iconLink;
    props['button'] = button;
    super('section', props);
    this.element?.classList.add('user-layout');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default UserLayout;
