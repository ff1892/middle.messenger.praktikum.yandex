import Block from '../../services/block';
import tpl from './message-field.hbs';

type MessageFieldProps = Record<string, any>;

class MessageField extends Block<MessageFieldProps> {
  constructor(props: MessageFieldProps = {}) {
    props['attributes'] = {
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

export default MessageField;
