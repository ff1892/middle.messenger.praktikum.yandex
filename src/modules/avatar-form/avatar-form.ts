import tpl from './avatar-form.hbs';
import { Block } from '../../services/block';
import { Button } from '../../components/button/button';
import { validator } from '../../utils/validator';
import { userController } from '../../controllers/user-controller';

type AvatarFormProps = Record<string, any>;


const handleSubmit = (e: SubmitEvent) => {
  const isValid = validator.handleSubmitAvatar(e);
  if (!isValid) {
    return;
  }

  const formData = new FormData(e.target as HTMLFormElement);
  userController.updateAvatar(formData);
}

const avatarFormProps = {
  attrs: {
    enctype: 'multipart/form-data',
  }
}

class AvatarForm extends Block<AvatarFormProps> {
  constructor(props: AvatarFormProps) {
    super('form', { ...props, avatarFormProps });

    const form = this.element as HTMLFormElement;

    form.classList.add('avatar-form');
    form.enctype = 'multipart/form-data';
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const avatarForm = new AvatarForm({
  submitButton: new Button({
    attrs: {
      class: 'button',
      type: 'submit',
    },
    value: 'Поменять аватар',
  }),
    events: {
      submit: handleSubmit,
      change: validator.handleChangeAvatar,
    }
});

export { avatarForm };
