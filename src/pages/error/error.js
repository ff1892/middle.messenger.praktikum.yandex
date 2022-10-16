import tpl from './error.hbs';
import errorLayoutTpl from '../../layouts/error-layout/error-layout.hbs';
import { getCurrentTime } from '../utils';
import iconArrow from 'bundle-text:../../../static/icons/back-arrow.svg';


const currentDate = new Date();
const date = currentDate.toISOString();
const dateString = getCurrentTime();


const layoutData = {
  title: 'Bot 500',
  text: 'Что-то не то с сервером. \n Обещаем починить',
  date,
  dateString,
  icon: iconArrow,
}


const errorLayout = errorLayoutTpl(layoutData);
const errorPage = tpl({errorLayout});

export default errorPage;
