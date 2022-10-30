import tpl from './user-form.hbs';
import Block from '../../services/block';
import UserField from '../../components/user-field/user-field';
import Button from '../../components/button/button';

type UserFormType = {
  avatar: string,
  avatarDescription: string,
  inputs: UserField[];
  title: string,
  button: Button,
  link?: {
    href: string,
    text: string,
  },
  events: {
    submit: (evt: SubmitEvent) => void;
  }
};

class UserForm extends Block<UserFormType> {
  constructor(props: UserFormType) {
    super('form', props);
    this.element?.classList.add('user-form');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default UserForm;
