export const BASE_URL = 'https://ya-praktikum.tech/api/v2';

export const HEADERS_DEFAULT = {['content-type']: 'application/json'};

export enum ConvertMethod {
  TO_SNAKE_CASE = 'snakeCase',
  TO_CAMEL_CASE = 'camelCase',
}

export const ApiRoute = {
  AUTH: '/auth',
  CHATS: '/messenger',
  USERS: '/users',
  AUTH_SIGNUP: '/signup',
  AUTH_LOGIN: '/signin',
  AUTH_USER: '/user',
  AUTH_LOGOUT: '/logout',
};

export const Route = {
  MAIN: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  CHAT: '/messenger',
  USERFORM: '/userform',
  PASSWORDFORM: '/passwordform',
  NOTFOUND: '/notfound',
  ERROR: '/error',
};

export const ApiMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

export const InputRegexp: Record<string, RegExp> = {
  LOGIN: /^[a-z]{1}[a-z\d\_-]{2,19}$/i,
  PASSWORD: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,40}$/,
  OLD_PASSWORD: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,40}$/,
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
  PHONE: /^[+\d][\d]{9,14}$/,
  FIRST_NAME: /^[A-ZА-ЯЁ]{1}[A-Za-zА-Яa-яёЁ]{0,20}[-]?[A-Za-zА-Яa-яёЁ]{1,20}$/,
  SECOND_NAME: /^[A-ZА-ЯЁ]{1}[A-Za-zА-Яa-яёЁ]{0,20}[-]?[A-Za-zА-Яa-яёЁ]{1,20}$/,
  DISPLAY_NAME: /^[\wa-я\-@$!%*#?&]{3,20}$/i,
  MESSAGE: /(?!\s*$).+/,
};

export const ValidationMessage: Record<string, string> = {
  LOGIN: 'От 3 до 20 символов: латиница, цифры, дефис и нижнее подчеркивание',
  PASSWORD: 'От 8 до 40 символов, хотя бы одна заглавная буква и цифра',
  PASSWORD_REPEAT: 'Пароли несовпадают или неверный формат пароля',
  EMAIL: 'Латиница, обязательно @',
  PHONE: 'От 10 до 15 цифр, может начинаться с +',
  FIRST_NAME: 'Латиница или кириллица. Заглавная первая буква. Только буквы и дефис',
  SECOND_NAME: 'Латиница или кириллица. Заглавная первая буква. Только буквы и дефис',
  DISPLAY_NAME: 'Латиница или кириллица. От 3 до 20 символов',
  MESSAGE: 'Пустое сообщение',
};

export const routesWithLabel: Array<{ label: string, route: string }> = [
  { label: 'Главная', route: Route.MAIN },
  { label: 'Чат', route: Route.CHAT },
  { label: 'Авторизация', route: Route.LOGIN },
  { label: 'Регистрация', route: Route.SIGNUP },
  { label: 'Редактирование профиля', route: Route.USERFORM },
  { label: 'Изменение пароля', route: Route.PASSWORDFORM },
  { label: 'Ошибка 404', route: Route.NOTFOUND },
  { label: 'Ошибка 500', route: Route.ERROR },
];

export const StoreEvents = {
  Updated: 'updated',
};
