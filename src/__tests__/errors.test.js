const errors = require('../errors');

describe('errors', () => {
  it('should normalize exceptions', () => {
    try {
      throw new Error('no bueno');
    } catch (error) {
      const result = errors.normalizeError(error);

      expect(result.name).toEqual('Error');
      expect(result.message).toEqual('no bueno');
      expect(result.stack).toMatch('errors.test.js');
      expect(result.appStack).toMatch('__tests__/errors.test.js');
      expect(result.appStack).not.toMatch('node_modules/jest-jasmine');
    }
  });
});
