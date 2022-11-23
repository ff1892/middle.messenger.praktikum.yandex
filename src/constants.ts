export const BASE_URL = 'https://ya-praktikum.tech/api/v2';
export const RESOURCES_URL = BASE_URL + '/resources';

export const HEADERS_DEFAULT = {['content-type']: 'application/json'};

export enum ConvertMethod {
  TO_SNAKE_CASE = 'snakeCase',
  TO_CAMEL_CASE = 'camelCase',
}

export const ApiRoute = {
  AUTH: '/auth',
  CHATS: '/chats',
  USER: '/user',
  AUTH_SIGNUP: '/signup',
  AUTH_LOGIN: '/signin',
  AUTH_USER: '/user',
  AUTH_LOGOUT: '/logout',
  USER_PROFILE: '/profile',
  USER_SEARCH: '/search',
  USER_PASSWORD: '/password',
  USER_AVATAR: '/profile/avatar',
  CHATS_GET: '',
  CHATS_CREATE: '',
  CHATS_DELETE: '',
  CHATS_AVATAR: '/avatar',
  CHATS_ADD_USER: '/users',
  CHATS_DELETE_USER: '/users',
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
  OLDPASSWORD: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,40}$/,
  NEWPASSWORD: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,40}$/,
  EMAIL: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
  PHONE: /^[+\d][\d]{9,14}$/,
  FIRSTNAME: /^[A-ZА-ЯЁ]{1}[A-Za-zА-Яa-яёЁ]{0,20}[-]?[A-Za-zА-Яa-яёЁ]{1,20}$/,
  SECONDNAME: /^[A-ZА-ЯЁ]{1}[A-Za-zА-Яa-яёЁ]{0,20}[-]?[A-Za-zА-Яa-яёЁ]{1,20}$/,
  DISPLAYNAME: /^[\wa-я\-@$!%*#?&]{3,20}$/i,
  MESSAGE: /(?!\s*$).+/,
  CHAT: /^[a-zа-яё\d]{1}[a-zа-яё\d\_-\s]{2,35}$/i,
};

export const ValidationMessage: Record<string, string> = {
  LOGIN: 'От 3 до 20 символов: латиница, цифры, дефис и нижнее подчеркивание',
  PASSWORD: 'От 8 до 40 символов, хотя бы одна заглавная буква и цифра',
  OLDPASSWORD: 'От 8 до 40 символов, хотя бы одна заглавная буква и цифра',
  NEWPASSWORD: 'От 8 до 40 символов, хотя бы одна заглавная буква и цифра',
  PASSWORDREPEAT: 'Пароли несовпадают или неверный формат пароля',
  EMAIL: 'Латиница, обязательно @',
  PHONE: 'От 10 до 15 цифр, может начинаться с +',
  FIRSTNAME: 'Латиница или кириллица. Заглавная первая буква. Только буквы и дефис',
  SECONDNAME: 'Латиница или кириллица. Заглавная первая буква. Только буквы и дефис',
  DISPLAYNAME: 'Латиница или кириллица. От 3 до 20 символов',
  MESSAGE: 'Пустое сообщение',
  AVATAR: 'Нужно выбрать файл',
  CHAT: 'Не более 36 символов. Начинается с буквы или цифры',
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
