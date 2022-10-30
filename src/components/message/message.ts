import Block from '../../core/block';
import tpl from './message.hbs';

type MessageProps = Record<string, any>;

class Message extends Block<MessageProps> {
  constructor(props: MessageProps = {}) {
    super('div', props);
    this.element?.classList.add('message');

    if(props.isMine) {
      this.element?.classList.add('message--mine');
    }

    if(props.isRead) {
      this.element?.classList.add('message--read');
    }
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export default Message;
