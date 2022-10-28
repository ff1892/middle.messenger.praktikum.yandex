export enum Route {
  MAIN = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  CHAT = '/chat',
  USERFORM = '/userform',
  PASSWORDFORM = 'passwordform',
  NOTFOUND = '/notfound',
  ERROR = '/error',
};

export const routesWithLabel: Array<{ label: string, route: Route}> = [
  { label: 'Главная', route: Route.MAIN },
  { label: 'Чат', route: Route.CHAT },
  { label: 'Авторизация', route: Route.LOGIN },
  { label: 'Регистрация', route: Route.SIGNUP },
  { label: 'Редактирование профиля', route: Route.USERFORM },
  { label: 'Изменение пароля', route: Route.PASSWORDFORM },
  { label: 'Ошибка 404', route: Route.NOTFOUND },
  { label: 'Ошибка 500', route: Route.ERROR },
];
