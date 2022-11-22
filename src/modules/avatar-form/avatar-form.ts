import tpl from './avatar-form.hbs';
import { Block } from '../../services/block';
import { Button } from '../../components/button/button';
import { validator } from '../../utils/validator';
import { userController } from '../../controllers/user-controller';
import { store } from '../../services/store';
import { chatsController } from '../../controllers/chats-controller';

type AvatarFormProps = Record<string, any>;


const handleSubmitForm = (e: SubmitEvent, callback: (formData: FormData) => void) => {
  const isValid = validator.handleSubmitAvatar(e);
  if (!isValid) {
    return;
  }

  const formData = new FormData(e.target as HTMLFormElement);
  callback(formData);
}

const handleSubmitUser = (e: SubmitEvent) => {
  handleSubmitForm(e, (formData) => {
    userController.updateAvatar(formData);
  });
}

const handleSubmitChat = (e: SubmitEvent) => {
  handleSubmitForm(e, (formData) => {
    const id = store.getState().currentChat.id;
    formData.set('chatId', id);
    chatsController.updateAvatar(formData);
  })
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

const avatarFormUser = new AvatarForm({
  submitButton: new Button({
    attrs: {
      class: 'button',
      type: 'submit',
    },
    value: 'Поменять аватар',
  }),
    events: {
      submit: handleSubmitUser,
      change: validator.handleChangeAvatar,
    }
});

const avatarFormChat = new AvatarForm({
  submitButton: new Button({
    attrs: {
      class: 'button',
      type: 'submit',
    },
    value: 'Поменять аватар',
  }),
    events: {
      submit: handleSubmitChat,
      change: validator.handleChangeAvatar,
    }
});

export {
  avatarFormUser,
  avatarFormChat,
};
