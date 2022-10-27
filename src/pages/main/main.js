import Block from '../../core/block';
import MainLink from '../../components/main-link/main-link';
import tpl from './main.hbs';
import compileGroup from '../../utils/compile-group';
import { routesWithLabel } from '../../constants';

const mainLinkData = routesWithLabel.slice(1).map(({ route, label}) => {
  return {
    attributes: {
      class: 'main-link',
      href: route,
    },
    text: label,
    withInternalId: true,
  };
});

class MainPage extends Block {
  constructor(props) {
    super ('div', props);
    this._element.classList.add('main-page');
    this.props.mainLinks = compileGroup(MainLink, mainLinkData);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default MainPage;
