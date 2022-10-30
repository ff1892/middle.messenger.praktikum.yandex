import Block from '../../services/block';
import ErrorLayout from '../../layouts/error-layout/error-layout';
import tpl from './error.hbs';
import { getCurrentTime } from '../../utils/time';


const currentDate = new Date();
const date = currentDate.toISOString();
const dateString = getCurrentTime();

const layoutData = {
  title: 'Bot 500',
  text: 'Что-то не то с сервером. Обещаем починить',
  date,
  dateString,
}

type ErrorPageProps = Record<string, any>;

class ErrorPage extends Block<ErrorPageProps> {
  constructor(props: ErrorPageProps = {}) {
    props['errorLayout'] = new ErrorLayout(layoutData);

    super('div', props);
    this.element?.classList.add('error-page');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default ErrorPage;
