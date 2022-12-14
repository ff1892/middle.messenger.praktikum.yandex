import tpl from './message-field.hbs';
import { Block } from '../../services/block';

type MessageFieldProps = Record<string, any>;

class MessageField extends Block<MessageFieldProps> {
  constructor(props: MessageFieldProps = {}) {
    props.attrs = {
      type: 'text',
      name: 'message',
      class: 'message-field',
      placeholder: 'Сообщение',
    };
    super('input', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { MessageField };
