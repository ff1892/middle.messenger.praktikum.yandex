import { assert, expect } from 'chai';
import Handlebars = require('handlebars');
import { Block } from './block';

const template = Handlebars.compile('{{content}}');

class TestBlock extends Block {
  constructor(props: Record<string, any>) {
    super('span', props);
  }

  render() {
    return this.compile(template, this.props);
  }
}

const testBlock = new TestBlock({ content: 'Test message' });

describe('Block base component: render', () => {

  it('Should render correctly', () => {
    assert.equal(testBlock.getContent()?.innerHTML, 'Test message');
  });

  it('Should render tag', () => {
    assert.equal(testBlock.getContent()?.tagName, 'SPAN');
  });
});

describe('Block base component: props', () => {
  beforeEach(() => {
    testBlock.setProps({
      content: 'New message',
      attrs: {
        class: 'test',
      },
    });
  });

  it('Should render given props', () => {
    assert.equal(testBlock.getContent()?.innerHTML, 'New message');
  });

  it('Should set attributes', () => {
    expect(testBlock.getContent()?.classList.contains('test')).to.equal(true);
  });
});
