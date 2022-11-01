declare module '*.hbs' {
  import { TemplateDelegate } from 'handlebars';

  const template: TemplateDelegate;
  export default template;
}
declare module '*.png'
declare module '*.scss';
declare module '*.svg' {
  const content: any;
  export default content;
}
