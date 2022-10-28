import tpl from './user-field.hbs';
import Block from '../../core/block';

type UserFieldType = {
  label: string,
  type: string,
  name: string,
  value: string,
  placeholder?: string,
};

class UserField extends Block<UserFieldType> {
  constructor (props: UserFieldType) {
    super('div', props);
    this.element?.classList.add('user-field');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default UserField;
