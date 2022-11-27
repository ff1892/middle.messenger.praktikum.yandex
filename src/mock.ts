import { SignupModel, LoginModel } from './types/data-model';

type MockData = {
  signup: SignupModel,
  login: LoginModel,
}

export const MOCK_DATA: MockData = {
  signup: {
    first_name: 'Контсантин',
    second_name: 'Константинов',
    login: 'kon8',
    email: 'kon8@test.com',
    password: 'Konkon89',
    phone: '+7999552244',
  },
  login: {
    login: 'kon8',
    password: 'Konkon89',
  },
};
