type Listeners = Record<string, Array<(...args: any[]) => void>>;
type Callback = (...args: any[]) => void;

class EventBus {
  private readonly listeners: Listeners;

  constructor() {
    this.listeners = {};
  }

  subscribe(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  unsubscribe(event: string, callback: Callback) {
    if (!this.listeners[event]) {
      throw new Error(`Нет события: ${event}`);
    }

    this.listeners[event] = this.listeners[event].filter(
      (listener) => listener !== callback,
    );
  }

  emit(event:string, ...args: any[]) {
    if (!this.listeners[event]) {
      return;
    }

    this.listeners[event].forEach((listener) => {
      listener(...args);
    });
  }
}

export { EventBus };
