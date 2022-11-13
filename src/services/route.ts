import { Block } from './block';
import { renderDOM } from '../utils/render-dom';
import { isEqualString } from '../utils/is-equal-string';

class Route {

  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _rootQuery: string;

  constructor(pathname: string, view: typeof Block, rootQuery: string = '#root') {

    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._rootQuery = rootQuery;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string) {
    return isEqualString(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = new this._blockClass();
      renderDOM(this._rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}

export { Route };
