import tpl from './signup.hbs';
import { Block } from '../../services/block/block';
import { FormLayout } from '../../layouts/form-layout/form-layout';
import { Button } from '../../components/button/button';
import { Form } from '../../modules/form/form';
import { Field } from '../../components/field/field';
import { Route } from '../../constants';
import { validator } from '../../utils/validator';
import { Link } from '../../components/link/link';
import { signupInputsData } from './sign-up.data';
import { SignupModel } from '../../types/data-model';
import { authController } from '../../controllers/auth-controller';

const handleSubmit = (e: SubmitEvent) => {
  const isValid = validator.handleSubmit(e);
  if (!isValid) {
    return;
  }
  const formData = validator.getFormData(e);
  delete formData.passwordRepeat;
  authController.signup(e, formData as SignupModel);
};

const signupInputs = signupInputsData.map((inputData) => {
  const inputProps = { ...inputData };
  return new Field(inputProps);
});

const button = new Button({
  attrs: {
    class: 'button',
    type: 'submit',
  },
  value: 'Зарегистрироваться',
});

const link = new Link({
  text: 'Есть аккаунт?',
  attrs: {
    href: Route.LOGIN,
  },
});

const signupFormProps = {
  title: 'Регистрация',
  inputs: signupInputs,
  button,
  link,
  events: {
    submit: handleSubmit,
  },
};

const signupForm = new Form(signupFormProps);

const formLayout = new FormLayout({
  layoutElement: signupForm,
});

class SignupPage extends Block<{}> {
  constructor(props = {}) {
    super('main', { ...props, formLayout });
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { SignupPage };
