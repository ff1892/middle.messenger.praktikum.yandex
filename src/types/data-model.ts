export type UserModel = {
  id: number,
  first_name: string,
  second_name: string,
  display_name: string,
  login: string,
  email: string,
  phone: string,
  avatar: string,
};

export type SignupModel = {
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  password: string,
  phone: string,
};

export type LoginModel = {
  login: string,
  password: string,
};

