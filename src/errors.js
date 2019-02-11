const objects = require('./objects');

/*
 * Normalize the attributes for an error.
 *
 * Errors in JavaScript can be inconsistent. We normalize the error
 * thrown by a JavaScript method to enable application code to handle an
 * error with a standard interface.
 *
 * A response looks like this:
 * {
 *  name: Error name, usually Error
 *  message: The error message returned by the response
 *  stack: The full stack trace as a string
 *  appStack: The application only stack trace as a string.
 * }
 *
 */
const normalizeError = error => {
  error.appStack = buildAppStack(error);
  error.toJSON = renderToJSON;

  return error;
};

const buildAppStack = error => {
  const safeStack = typeof error.stack === 'string' ? error.stack : '';
  const stackCalls = safeStack.split(/(\n|\r)/);
  const appCalls = stackCalls
    .filter(stackCall => {
      return !/(\/node_modules\/.+|\(internal)/.test(stackCall);
    })
    .map(stackCall => stackCall.trim())
    .filter(Boolean);

  return appCalls.join('\n');
};

// Render all the possible attributes for a node Error object
function renderToJSON() {
  return objects.compact({
    address: this.address,
    appStack: this.appStack,
    code: this.code,
    dest: this.dest,
    errno: this.errno,
    info: this.info,
    message: this.message,
    name: this.name,
    port: this.port,
    stack: this.stack,
    syscall: this.syscall
  });
}

module.exports = { normalizeError };
