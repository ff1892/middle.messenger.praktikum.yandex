import tpl from './not-found.hbs';
import { Block } from '../../services/block';
import { ErrorLayout } from '../../layouts/error-layout/error-layout';
import { getCurrentTime } from '../../utils/time';

const currentDate = new Date();
const date = currentDate.toISOString();
const dateString = getCurrentTime();

const layoutData = {
  title: 'Bot 404',
  text: 'Такой страницы не существует',
  date,
  dateString,
};

type NotFoundPageProps = Record<string, any>;

class NotFoundPage extends Block<NotFoundPageProps> {
  constructor(props: NotFoundPageProps = {}) {
    props.errorLayout = new ErrorLayout(layoutData);

    super('main', props);
    this.element?.classList.add('notfound-page');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { NotFoundPage };
