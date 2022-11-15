import { SignupModel, LoginModel } from './types/data-model';

type MockData = {
  signup: SignupModel,
  login: LoginModel,
}

export const MOCK_DATA: MockData = {
  signup: {
    first_name: 'Контсантин',
    second_name: 'Константинов',
    login: 'konstantine4581',
    email: 'konstantine4581@test.com',
    password: 'k$onstantine458$1',
    phone: '+7999552244',
  },
  login: {
    login: 'konstantine4581',
    password: 'k$onstantine458$1',
  },
};
