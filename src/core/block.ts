import EventBus from './event-bus';
import { v4 as makeUUID } from 'uuid';
import { TNullable } from '../types';
import { TemplateDelegate } from 'handlebars';

class Block<TProps extends {}> {

  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render"
  };


  protected props: Record<string, any>;
  protected children: Record<string, Block<TProps>>;
  eventBus: () => EventBus;

  private _id: TNullable<string> = null;
  private _element: TNullable<HTMLElement> = null;
  private _meta: TNullable<{ tagName: string, props: Record<string, any>}> = null;

  constructor(tagName: string = 'div', propsAndChildren: TProps) {
    const { children, props } = this._getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this.children = children;

    this._meta = {
      tagName,
      props
    };

    if (props?.withInternalId) {
      this._id = makeUUID();
    }

    this.props = this._makeProxyProps({...props, __id: this._id});

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildren(propsAndChildren: any) {
    const children: Record<string, Block<TProps>> = {};
    const props: Record<string, any> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      value instanceof Block ?
        children[key] = value
        : props[key] = value;
    });

    return { children, props };
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.subscribe(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.subscribe(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.subscribe(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.subscribe(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createDocumentElement(tagName: string) {

    const element = document.createElement(tagName);
    if (this._id) {
      element.setAttribute('data-id', this._id);
    }
    if (this.props?.attributes) {
      Object.entries(this.props.attributes).forEach(([attr, value]) => {
        element.setAttribute(attr, value as string);
      });
    }
    return element;
  }

  private _createResources() {
    const { tagName } = this._meta!;
    this._element = this._createDocumentElement(tagName);
  }

  protected compile(template: TemplateDelegate, props: any) {
    const propsAndStubs = {...props};

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`
    })

    const fragment = document.createElement('template');
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);

      if (!stub) {
        return;
      }

      stub.replaceWith(child.getContent()!);
    });

    return fragment.content;
  }

  protected init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
  });
  }

  componentDidMount() {}

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private _componentDidUpdate() {
    const response = this.componentDidUpdate();
    if (!response) {
      return;
    }
    this._render();
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: any) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  private _render() {
    const block = this.render();
    this._removeEvents();
    this._element!.innerHTML = '';
    this._element!.appendChild(block);
    this._addEvents();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  private _makeProxyProps(props: any) {
    const self = this;
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop];
        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop, value) {
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, {...target}, target);
        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      }
    });
  }

  show() {
    this.getContent()!.style.display = "block";
  }

  hide() {
    this.getContent()!.style.display = "none";
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    })
  }

  // ! MEMORY LEAK !

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    })
  }
}

export default Block;

