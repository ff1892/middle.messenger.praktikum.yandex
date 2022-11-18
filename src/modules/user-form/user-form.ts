import tpl from './user-form.hbs';
import { Block } from '../../services/block';
import { UserField } from '../../components/user-field/user-field';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import { UserFormHeader } from '../user-form-header/user-form-header';

type UserFormType = {
  header: UserFormHeader,
  inputs: UserField[];
  button: Button,
  link?: Link,
  events: {
    submit: (e: SubmitEvent) => void;
  }
};

class UserForm extends Block<UserFormType> {
  constructor(props: UserFormType) {
    super('section', props);
    this.element?.classList.add('user-form');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}


export { UserForm };
