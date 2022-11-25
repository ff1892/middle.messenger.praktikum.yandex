import tpl from './error.hbs';
import { Block } from '../../services/block/block';
import { ErrorLayout } from '../../layouts/error-layout/error-layout';
import { getCurrentTime } from '../../utils/time';

const date = new Date().toISOString();
const dateString = getCurrentTime();

const layoutData = {
  title: 'Bot 500',
  text: 'Что-то не то с сервером. Обещаем починить',
  date,
  dateString,
};

type ErrorPageProps = Record<string, any>;

class ErrorPage extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps = {}) {
    props.errorLayout = new ErrorLayout(layoutData);

    super('main', props);
    this.element?.classList.add('error-page');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { ErrorPage };
