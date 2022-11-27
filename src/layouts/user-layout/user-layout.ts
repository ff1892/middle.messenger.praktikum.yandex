import iconArrow from 'bundle-text:../../../static/icons/back-arrow.svg';
import tpl from './user-layout.hbs';
import { Block } from '../../services/block';
import { IconLink } from '../../components/icon-link/icon-link';
import { Button } from '../../components/button/button';
import { Route } from '../../constants';
import { authController } from '../../controllers/auth-controller';

type UserLayoutProps = Record<string, any>;

class UserLayout extends Block<UserLayoutProps> {
  constructor(props: UserLayoutProps = {}) {

    props.iconLink = new IconLink({
      linkText: 'Вернуться к чатам',
      icon: iconArrow,
      attrs: {
        href: Route.CHAT,
      },
    });

    props.button = new Button({
      attrs: {
        class: 'button',
        type: 'button',
      },
      value: 'Выйти',
      events: {
        click: authController.logout.bind(authController),
      },
    });

    super('section', props);
    this.element?.classList.add('user-layout');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { UserLayout };
