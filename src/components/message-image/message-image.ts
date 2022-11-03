import tpl from './message-image.hbs';
import { Block } from '../../services/block';

type MessageImageProps = Record<string, any>;

class MessageImage extends Block<MessageImageProps> {
  constructor(props: MessageImageProps = {}) {
    super('div', props);
    this.element?.classList.add('message-image');

    if (props.isMine) {
      this.element?.classList.add('message-image--mine');
    }

    if (props.isRead) {
      this.element?.classList.add('message-image--read');
    }
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

export { MessageImage };
