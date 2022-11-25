import { assert } from 'chai';
import { Block } from './block';
import tpl from './block.test.hbs';

class TestBlock extends Block {
  constructor(props: Record<string, any>) {
    super('span', props);
  }

  render() {
    return this.compile(tpl, this.props);
  }
}

const testBlock = new TestBlock({});
