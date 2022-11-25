import { expect } from 'chai';
import { isEqualString } from './is-equal-string';

describe('String equality function', () => {

  it('Should return true if strings are equal', () => {
    expect(isEqualString('someString', 'someString')).to.equal(true);
  });

  it('Should return false if strings are not equal', () => {
    expect(isEqualString('someString', 'anotherString')).to.equal(false);
  });

  it('Should return true with empty strings', () => {
    expect(isEqualString('', '')).to.equal(true);
  });
});
