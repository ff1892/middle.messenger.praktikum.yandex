import { setObject } from '../utils/set-object';
import { StoreEvents } from '../constants';
import { EventBus } from '../services/event-bus';

type Indexed<T = any> = {
  [key in string]: T;
};

class Store extends EventBus {
  private _state: Indexed = {};

  getState() {
    return this._state;
  }

  setState(path: string, value: Indexed) {
    setObject(this._state, path, value);

    this.emit(StoreEvents.Updated, this._state);
  }
}

const store = new Store();

export { store };
