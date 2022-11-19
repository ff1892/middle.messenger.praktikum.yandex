import tpl from './popup-form.hbs';
import { Block } from '../../services/block';
import { Button } from '../../components/button/button';
import { validator } from '../../utils/validator';
import { TextInput } from '../../components/text-input/text-input';
import { Field } from '../../components/field/field';

type PopupFormProps = Record<string, any>;

class PopupForm extends Block<PopupFormProps> {
  constructor(props: PopupFormProps) {
    super('form', props);

    this.element?.classList.add('popup-form');
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const handleAddUser = (e: SubmitEvent) => {
  const isValidForm = validator.handleSubmit(e);
  if (!isValidForm) {
    return;
  }
  alert('Is valid add');
};

const handleDeleteUser = (e: SubmitEvent) => {
  const isValidForm = validator.handleSubmit(e);
  if (!isValidForm) {
    return;
  }
  alert('Is valid delete');
};

const handleAddChat = (e: SubmitEvent) => {
  const isValidForm = validator.handleSubmit(e);
  if (!isValidForm) {
    return;
  }
  alert('Is valid add chat');
};


const inputProps = {
  attrs: {
    type: 'text',
    name: 'login',
  },
  events: {
    focus: validator.handleFocus,
    blur: validator.handleFocus,
    input: validator.handleChange,
  }
};

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
    input: new TextInput(inputProps),
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
    input: new TextInput(inputProps),
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
    input: new TextInput(inputProps),
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
