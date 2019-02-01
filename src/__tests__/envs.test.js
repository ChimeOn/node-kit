const envs = require('../envs');

describe('envs', () => {
  it('should build a hash of the environment vars', () => {
    const vars = envs.getAllEnvironmentVariables();

    expect(vars.PROJECT_NAME).toEqual('node-kit');
    expect(vars.PURPOSE).toEqual('A toolbox for serverless node services.');
    expect(vars.DOT_ENV).toEqual('IT WORKS!');
  });
});
