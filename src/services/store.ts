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

  setState(path: string, value: unknown) {
    setObject(this._state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();

export { store };
