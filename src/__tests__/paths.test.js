const paths = require('../paths');

describe('paths', () => {
  it('should find the apps root path from environment variables or require.main', () => {
    const result = paths.getRootPath();
    expect(result).toMatch(/node-kit$/);
  });
});
