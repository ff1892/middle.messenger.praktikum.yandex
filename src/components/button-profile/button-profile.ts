import Block from '../../core/block';
import tpl from './button-profile.hbs';

type ButtonProfileProps = {
  src: string,
  alt: string,
  attributes: {
    type: string,
    role: string,
    title: string,
    ['aria-label']: string,
  },
}

class ButtonProfile extends Block<ButtonProfileProps> {
  constructor(props: ButtonProfileProps) {
    super('div', props);
    this.element?.classList.add('button-profile');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default ButtonProfile;
