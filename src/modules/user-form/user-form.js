import Handlebars from 'handlebars/dist/handlebars.runtime';
import tpl from './user-form.hbs';

Handlebars.registerPartial('userForm', tpl);

const userForm = tpl();

export default userForm;
