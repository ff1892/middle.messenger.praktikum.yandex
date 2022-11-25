/* eslint-disable no-console */
import { SOCKET_URL } from '../constants';
import { Toast } from '../components/toast/toast';
import { setMessage } from '../utils/set-message';
import { store } from '../services/store';

const cleanCloseToast = new Toast({ text: 'Соединение закрыто' });
const errorCloseToast = new Toast({ text: 'Обрыв соединения', isError: true });

type SocketProps = {
  token: string,
  chatId: number,
  userId: number,
};

class MessageController {
  private _token: string;
  private _chatId: number;
  private _userId: number;
  private _interval: ReturnType<typeof setInterval>;
  private _socket: WebSocket;

  constructor() {

    this._onOpen = this._onOpen.bind(this);
    this._onClose = this._onClose.bind(this);
    this._onError = this._onError.bind(this);
    this._onMessage = this._onMessage.bind(this);

  }

  private _addEvents() {
    this._socket.addEventListener('open', this._onOpen);
    this._socket.addEventListener('close', this._onClose);
    this._socket.addEventListener('error', this._onError);
    this._socket.addEventListener('message', this._onMessage);
  }

  private _removeEvents() {
    this._socket.removeEventListener('open', this._onOpen);
    this._socket.removeEventListener('close', this._onClose);
    this._socket.removeEventListener('error', this._onError);
    this._socket.removeEventListener('message', this._onMessage);
  }

  private _onOpen() {
    this._cancelKeepAlive();
    this.getMessages(0);
    this._keepAlive();
  }

  private _onClose(e: CloseEventInit) {
    this._removeEvents();
    this._cancelKeepAlive();

    if (e.code === 1006) {
      this._getNewConnection();
    }

    if (e.wasClean) {
      cleanCloseToast.show();
    } else {
      errorCloseToast.show();
      console.log(e.reason);
    }
  }

  private _onError(e: ErrorEvent) {
    console.log('WebSocket error: ', e.message);
  }

  private _onMessage(e: MessageEvent) {
    const data = JSON.parse(e.data);
    if (data.type === 'pong' || data[0] === null) {
      return;
    }
    const messages = setMessage(data);
    store.setState('messages', messages);
  }

  private _keepAlive() {
    this._interval = setInterval(() => {
      this._socket.send(JSON.stringify({ type: 'ping' }));
    }, 10000);
  }

  private _cancelKeepAlive() {
    clearInterval(this._interval);
  }

  private _getNewConnection() {
    this.init({
      token: this._token,
      chatId: this._chatId,
      userId: this._userId,
    });
  }

  init(props: SocketProps) {
    const { token, chatId, userId } = props;
    this._token = token;
    this._chatId = chatId;
    this._userId = userId;
    const socketUrl = `${SOCKET_URL}/${this._userId}/${this._chatId}/${this._token}`;
    this._socket = new WebSocket(socketUrl);
    this._addEvents();
  }

  getMessages(offset: number) {
    this._socket.send(JSON.stringify({
      content: `${offset}`,
      type: 'get old',
    }));
  }

  sendMessage(message: string) {
    this._socket.send(JSON.stringify({
      content: message,
      type: 'message',
    }));
  }

  drop() {
    if (!this._socket) {
      return;
    }
    this._cancelKeepAlive();
    this._removeEvents();
    this._socket.close();
  }
}

const messageController = new MessageController();

export { messageController };
