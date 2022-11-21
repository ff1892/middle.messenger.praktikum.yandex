import tpl from './password-profile.hbs';
import { Block } from '../../services/block';
import { UserLayout } from '../../layouts/user-layout/user-layout';
import { UserForm } from '../../modules/user-form/user-form';
import { UserField } from '../../components/user-field/user-field';
import { Button } from '../../components/button/button';
import { TextInput } from '../../components/text-input/text-input';
import { validator } from '../../utils/validator';
import { Route } from '../../constants';
import { Link } from '../../components/link/link';
import { passwordFormHeader } from '../../modules/user-form-header/user-form-header';
import { passwordFormData } from './password-profile.data';
import { userController } from '../../controllers/user-controller';

const handleSubmit = (e: SubmitEvent) => {
  const isValid = validator.handleSubmit(e);
  if (!isValid) {
    return;
  }
  const formData = validator.getFormData(e);
  delete formData.passwordRepeat;
  userController.updatePassword(e, formData);
}

const formFieldsData = passwordFormData.map(({label, attrs}) => ({
  label,
  input: new TextInput({
    attrs,
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    }
  }),
}))

const formInputs = formFieldsData.map((fieldData) => (
  new UserField(fieldData)
));

const submitButton = new Button({
  attrs: {
    class: 'button',
    type: 'submit',
  },
  value: 'Изменить пароль',
});

const formLink = new Link({
  text: 'Изменить данные профиля',
  attrs: {
    href: Route.USERFORM,
  },
});

const passwordForm = new UserForm({
  header: passwordFormHeader,
  link: formLink,
  button: submitButton,
  inputs: formInputs,
  events: {
    submit: handleSubmit,
  },
});

type PasswordProfileType = Record<string, any>;

class PasswordProfilePage extends Block<PasswordProfileType> {
  constructor(props: PasswordProfileType = {}) {
    props.userLayout = new UserLayout({
      form: passwordForm,
    });
    super('main', props);
    this.element?.classList.add('user-profile-page');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { PasswordProfilePage };
