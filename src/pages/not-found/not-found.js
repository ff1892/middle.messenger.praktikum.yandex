import tpl from './not-found.hbs';
import errorLayoutTpl from '../../layouts/error-layout/error-layout.hbs';
import { getCurrentTime } from '../utils';
import iconArrow from 'bundle-text:../../../static/icons/back-arrow.svg';


const currentDate = new Date();
const date = currentDate.toISOString();
const dateString = getCurrentTime();


const layoutData = {
  title: 'Bot 404',
  text: 'Такой страницы не существует((',
  date,
  dateString,
  icon: iconArrow,
}


const errorLayout = errorLayoutTpl(layoutData);
const notFoundPage = tpl({errorLayout});

export default notFoundPage;
