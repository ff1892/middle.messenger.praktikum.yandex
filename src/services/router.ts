import { Route } from './route';
import { Route as RouteList } from '../constants';
import { Block } from './block';

class Router {

  private _currentRoute: Route | null;
  private _rootQuery: string;
  private _paths: string[];
  private _openPaths: string[];
  private _hiddenAuthPaths: string[];
  private _protectedCb: () => void;
  private _hiddenAuthCb: () => void;
  private _includedRoutes: { path: string, cb: (id: number) => void }[];

  routes: Route[];
  history: History;

  constructor(rootQuery: string) {

    this._currentRoute = null;
    this._rootQuery = rootQuery;
    this._paths = [];
    this._openPaths = [];
    this._hiddenAuthPaths = [];
    this._includedRoutes = [];

    this.routes = [];
    this.history = window.history;

  }

  private _onRoute(path: string) {

    const pathname = this._checkBasePath(path);

    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._isIncludedList(pathname) && window.location.hash) {
      const currentRoute = this._includedRoutes.find(
        (currentPath) => currentPath.path === pathname,
      );
      if (currentRoute) {
        currentRoute.cb(+window.location.hash.slice(1));
      }
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    if (!this._openPaths.includes(pathname)) {
      this._protectedCb();
    }

    if (this._hiddenAuthPaths.includes(pathname)) {
      this._hiddenAuthCb();
    }

    this._currentRoute = route;
    route.render();
  }

  private _getPath(pathname: string) {
    if (this._paths.includes(pathname)) {
      return pathname;
    }
    return RouteList.NOTFOUND;
  }

  private _checkBasePath(pathname: string) {
    const basePathExp = /^\/\w+/i;
    const [basePath] = pathname.match(basePathExp) || '/';
    return basePath;
  }

  private _isIncludedList(pathname:string) {
    if (!this._includedRoutes.length) {
      return false;
    }
    return this._includedRoutes.some(({ path }) => path === pathname);
  }

  use(pathname: string, block: typeof Block, rootQuery = this._rootQuery) {
    const route = new Route(pathname, block, rootQuery);
    this.routes.push(route);
    this._paths.push(pathname);
    return this;
  }

  start() {
    window.onpopstate = ((event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      const pathname = this._getPath(target.location.pathname);
      this._onRoute(pathname);
    });

    const pathname = this._getPath(window.location.pathname);
    this._onRoute(pathname);
  }

  go(pathname: string) {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.back();
  }

  forward() {
    this.history.forward();
  }

  getRoute(pathname: string) {
    return this.routes.find((route) => route.match(pathname));
  }

  protectedCb(cb: () => void) {
    this._protectedCb = cb;
    return this;
  }

  hiddenAuthCb(cb: () => void) {
    this._hiddenAuthCb = cb;
    return this;
  }

  openPaths(...paths: string[]) {
    this._openPaths = paths;
    return this;
  }

  hideAuthPaths(...paths: string[]) {
    this._hiddenAuthPaths = paths;
    return this;
  }

  setIncludedRoutes(...paths: {path: string, cb: () => void}[]) {
    this._includedRoutes = paths;
    return this;
  }

  get currentRoute() {
    return this._currentRoute;
  }
}

const router = new Router('#root');

export { router };
