import {expect} from 'chai'

describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present', () => {
      expect([1, 2, 3].indexOf(4)).equals(-1)
    });
    it('should return something', () => {
      expect(1).equals(1)
    })
  });
});