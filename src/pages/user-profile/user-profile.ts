import tpl from './user-profile.hbs';
import { Block } from '../../services/block';
import { UserLayout } from '../../layouts/user-layout/user-layout';
import { UserForm } from '../../modules/user-form/user-form';
import { UserField } from '../../components/user-field/user-field';
import { Button } from '../../components/button/button';
import { TextInputStore, withValue } from '../../components/text-input/text-input';
import { validator } from '../../utils/validator';
import { Route } from '../../constants';
import { Link } from '../../components/link/link';
import { userFormHeader } from '../../modules/user-form-header/user-form-header';
import { userController } from '../../controllers/user-controller';
import { userData } from './user.data';

const handleSubmit = (e: SubmitEvent) => {
  const isValid = validator.handleSubmit(e);
  if (!isValid) {
    return;
  }
  const formData = validator.getFormData(e);
  userController.updateProfile(formData);
};

const formInputs = userData.map(({ label, value, attrs }) => {
  const withName = withValue(attrs.name);
  const InputWithName = withName(TextInputStore);
  const currentInput = new InputWithName('input', {
    value,
    attrs,
    events: {
      focus: validator.handleFocus,
      blur: validator.handleFocus,
      input: validator.handleChange,
    },
  });

  return new UserField({
    label,
    input: currentInput,
  });
});

const submitButton = new Button({
  attrs: {
    class: 'button',
    type: 'submit',
  },
  value: 'Изменить данные',
});

const formLink = new Link({
  text: 'Изменить пароль',
  attrs: {
    href: Route.PASSWORDFORM,
  },
});

const userForm = new UserForm({
  header: userFormHeader,
  link: formLink,
  button: submitButton,
  inputs: formInputs,
  events: {
    submit: handleSubmit,
  },
});

const userLayout = new UserLayout({
  form: userForm,
});

type UserProfileType = Record<string, any>;

class UserProfilePage extends Block<UserProfileType> {
  constructor(props: UserProfileType = {}) {

    props.userLayout = userLayout;

    super('main', props);
    this.element?.classList.add('user-profile-page');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { UserProfilePage };
