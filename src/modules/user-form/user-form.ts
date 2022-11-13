import tpl from './user-form.hbs';
import { Block } from '../../services/block';
import { UserField } from '../../components/user-field/user-field';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';

type UserFormType = {
  avatar: string,
  avatarDescription: string,
  inputs: UserField[];
  title: string,
  button: Button,
  link?: Link,
  events: {
    submit: (e: SubmitEvent) => void;
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

export { UserForm };
