import tpl from './main.hbs';
import { Block } from '../../services/block';
import { MainLink, MainLinkProps } from '../../components/main-link/main-link';
import { routesWithLabel } from '../../constants';

const mainLinkData: Array<MainLinkProps> = routesWithLabel
  .map(({ route, label }) => ({
    attrs: {
      class: 'main-link',
      href: route,
    },
    text: label,
  }));

const mainLinks = mainLinkData.map((data) => (
  new MainLink(data)));

type TMainPageProps = Record<string, any>;

class MainPage extends Block<TMainPageProps> {
  constructor(props: TMainPageProps = {}) {
    props.mainLinks = mainLinks;

    super('div', props);
    this.element!.classList.add('main-page');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { MainPage };
