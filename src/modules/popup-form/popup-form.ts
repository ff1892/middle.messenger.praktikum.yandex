import tpl from './popup-form.hbs';
import { Block } from '../../services/block';
import { Button } from '../../components/button/button';
import { validator } from '../../utils/validator';
import { TextInput } from '../../components/text-input/text-input';
import { Field } from '../../components/field/field';
import { chatsController } from '../../controllers/chats-controller';

type PopupFormProps = Record<string, any>;

class PopupForm extends Block<PopupFormProps> {
  constructor(props: PopupFormProps) {
    super('form', props);

    this.element?.classList.add('popup-form');
  }

  render() {
    return this.compile(tpl, this.props);
  }
};


const handleSubmit = (
  e: SubmitEvent,
  input: string,
  callback: (e: SubmitEvent, data: string) => void,
  ) => {
  const isValidForm = validator.handleSubmit(e);
  if (!isValidForm) {
    return;
  }
  const formData = new FormData(e.target as HTMLFormElement);
  const data = formData.get(input);
  callback(e, data as string);
};

const handleAddChat = (e: SubmitEvent) => {
  handleSubmit(
    e, 'chat',
    (e, data) => chatsController.createChat(e, data),
  );
};

const handleAddUser = (e: SubmitEvent) => {
  handleSubmit(
    e, 'login',
    (e, data) => chatsController.addUserToChat(e, data),
  );
};

const handleDeleteUser = (e: SubmitEvent) => {
  handleSubmit(
    e, 'login',
    (e, data) => chatsController.deleteUserFromChat(e, data),
  );
};


const getInputProps = (name: string) =>  ({
  attrs: {
    type: 'text',
    name,
  },
  events: {
    focus: validator.handleFocus,
    blur: validator.handleFocus,
    input: validator.handleChange,
  }
});

const buttonAttrs = {
  attrs: {
    class: 'button',
    type: 'submit',
  },
}

const popupAddUser = new PopupForm({
  title: 'Добавить пользователя',
  field: new Field({
    label: 'Логин пользователя',
    input: new TextInput(getInputProps('login')),
  }),
  submitButton: new Button({
    ...buttonAttrs,
    value: 'Добавить',
  }),
    events: {
      submit: handleAddUser,
    }
});

const popupDeleteUser = new PopupForm({
  title: 'Удалить пользователя',
  field: new Field({
    label: 'Логин пользователя',
    input: new TextInput(getInputProps('login')),
  }),
  submitButton: new Button({
    ... buttonAttrs,
    value: 'Удалить',
  }),
    events: {
      submit: handleDeleteUser,
    }
});

const popupAddChat = new PopupForm({
  title: 'Новый чат',
  field: new Field({
    label: 'Название чата',
    input: new TextInput(getInputProps('chat')),
  }),
  submitButton: new Button({
    ...buttonAttrs,
    value: 'Создать',
  }),
    events: {
      submit: handleAddChat,
    }
});

export {
  popupAddUser,
  popupDeleteUser,
  popupAddChat,
};
