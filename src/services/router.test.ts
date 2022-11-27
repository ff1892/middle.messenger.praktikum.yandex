import { expect } from 'chai';
import Handlebars = require('handlebars');
import { router } from './router';
import { Block } from './block';

const template = Handlebars.compile('');

describe('Router', () => {

  class Test1 extends Block {
    render() {
      return this.compile(template, this.props);
    }
  }
  class Test2 extends Block {
    render() {
      return this.compile(template, this.props);
    }
  }
  class Test3 extends Block {
    render() {
      return this.compile(template, this.props);
    }
  }

  let calls = 0;
  const callback = () => {
    calls += 1;
  };

  router
    .openPaths('/1', '/2')
    .protectedCb(callback)
    .use('/1', Test1)
    .use('/2', Test2)
    .use('/3', Test3)
    .start();

  router.go('/1');
  router.go('/2');
  router.go('/3');

  it('Should run callback on closed routes', () => {
    expect(calls).to.equal(1);
  });

  it('Should get correct pathname', () => {
    const { pathName } = router.currentRoute || {};
    expect(pathName).to.equal('/3');
  });

  it('Should get correct history', () => {
    expect(router.history.length).to.equal(4);
  });
});
