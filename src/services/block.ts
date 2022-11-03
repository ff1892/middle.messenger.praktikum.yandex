/* eslint-disable no-use-before-define */
import { v4 as makeUUID } from 'uuid';
import { TemplateDelegate } from 'handlebars';
import { EventBus } from './event-bus';

type Nullable<T> = T | null;

class Block<P extends Record<string, any>> {

  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected props: Record<string, any>;

  protected children: Record<string, Block<P>>;

  protected childrenArr: Record<string, Block<P>[]>;

  eventBus: () => EventBus;

  private _id: string;

  protected _element: Nullable<HTMLElement> = null;

  private _meta: Nullable<{ tagName: string, props: Record<string, any>}> = null;

  private _setUpdate: boolean = false;

  constructor(
    tagName: string = 'div',
    propsAndChildren: P | {} = {},
  ) {

    const { props, children, childrenArr } = this._getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this._meta = { tagName, props };
    this._id = makeUUID();

    this.props = this._makeProxyProps({ ...props, __id: this._id });
    this.children = this._makeProxyProps(children);
    this.childrenArr = this._makeProxyProps(childrenArr);

    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);

  }

  private _getChildren(propsAndChildren: P | {}) {
    const props: Record<string, any> = {};
    const children: Record<string, Block<P>> = {};
    const childrenArr: Record<string, Block<P>[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((valueEl) => valueEl instanceof Block)) {
        childrenArr[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { props, children, childrenArr };
  }

  private _registerEvents(eventBus: EventBus) {
    eventBus.subscribe(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.subscribe(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.subscribe(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.subscribe(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _createDocumentElement(tagName: string) {

    const element = document.createElement(tagName);
    element.setAttribute('data-id', this._id);
    return element;
  }

  private _createResources() {
    const { tagName } = this._meta!;
    this._element = this._createDocumentElement(tagName);
    this.addAttribute();
  }

  protected compile(template: TemplateDelegate, props: any) {
    const propsAndStubs = { ...props };

    if (Object.entries(this.childrenArr).length > 0) {
      Object.entries(this.childrenArr).forEach(([key, childArr]) => {
        childArr.forEach((child) => {
          const stubString = `<div data-id="${child._id}"></div>`;
          if (Array.isArray(propsAndStubs[key])) {
            propsAndStubs[key].push(stubString);
          } else {
            propsAndStubs[key] = [stubString];
          }
        });
      });
    }

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = document.createElement('template');
    fragment.innerHTML = template(propsAndStubs);

    Object.values(this.childrenArr).forEach((chidldren) => {
      chidldren.forEach((child) => {
        this._replace(child, fragment);
      });
    });

    Object.values(this.children).forEach((child) => {
      this._replace(child, fragment);
    });

    return fragment.content;
  }

  private _replace(child: Block<P>, template: HTMLTemplateElement) {
    const stub = template.content.querySelector(`[data-id="${child._id}"]`);
    if (!stub) {
      return;
    }
    stub.replaceWith(child.getContent()!);
  }

  protected init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _componentDidMount() {
    this.componentDidMount();

    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });

    Object.values(this.childrenArr).forEach((children) => {
      children.forEach((child) => {
        child.dispatchComponentDidMount();
      });
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

  setProps(nextProps: P | {}) {

    if (!nextProps) {
      return;
    }

    this._setUpdate = false;
    const oldValue = { ...this.props };

    const { props, children, childrenArr } = this._getChildren(nextProps);

    if (Object.values(props).length) {
      Object.assign(this.props, nextProps);
    }

    if (Object.values(children).length) {
      Object.assign(this.children, nextProps);
    }

    if (Object.values(childrenArr).length) {
      Object.assign(this.childrenArr, nextProps);
    }

    if (this._setUpdate) {
      this.eventBus().emit(Block.EVENTS.FLOW_CDU, oldValue, this.props);
      this._setUpdate = false;
    }
  }

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  private _render() {
    const block = this.render();
    this.removeEvents();
    this._element!.innerHTML = '';
    this._element!.appendChild(block);
    this.addEvents();
  }

  render(): DocumentFragment {
    return new DocumentFragment();
  }

  private _makeProxyProps(props: any) {

    return new Proxy(props, {

      get(target, prop) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },

      set(target, prop, value) {
        if (target[prop] !== value) {
          target[prop] = value;
          this._setUpdate = true;
        }
        return true;
      },

      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  show() {
    this.getContent()!.style.display = 'block';
  }

  hide() {
    this.getContent()!.style.display = 'none';
  }

  addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element!.addEventListener(eventName, events[eventName]);
    });
  }

  removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this._element!.removeEventListener(eventName, events[eventName]);
    });
  }

  addAttribute() {
    const { attrs = {} } = this.props;

    Object.entries(attrs).forEach(([attr, value]) => {
      this._element!.setAttribute(attr, value as string);
    });
  }
}

export { Block };
