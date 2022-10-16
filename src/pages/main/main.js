import Handlebars from 'handlebars';
import tpl from './main.hbs';
import { Route, routeLabels } from '../../constants';

const links = Object.values(Route).map((href, index) => ({
  href,
  text: routeLabels[index],
}));

const mainPage = tpl({links});


export default mainPage;
