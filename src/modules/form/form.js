import Handlebars from 'handlebars/dist/handlebars.runtime';
import tpl from './form.hbs';

Handlebars.registerPartial('form', tpl);

const form = tpl();

export default form;
