// This module takes inspiration from the node-app-root-path package.
// REFERENCE: https://github.com/inxilpro/node-app-root-path/blob/master/lib/resolve.js
const path = require('path');
const fs = require('fs');

// Defer
const findRootPathInEnvironmentVariables = () => {
  const envVars = [process.env.APP_ROOT_PATH, process.env.LAMBDA_TASK_ROOT];
  return envVars.find(envVar => envVar);
};

const findRootPathInPaths = () => {
  const rootPaths = require.main.paths.map(filepath =>
    filepath.replace(/\/node_modules$/, '')
  );

  return rootPaths.find(rootPath => {
    return fs.existsSync(`${rootPath}/package.json`);
  });
};

const getRootPath = () => {
  // Option 1. Find in environment variable
  const rootPathEnvVar = findRootPathInEnvironmentVariables();
  if (rootPathEnvVar) return path.resolve(rootPathEnvVar);

  // Option 2. Find the first package.json on our paths
  const rootPathInPaths = findRootPathInPaths();
  if (rootPathInPaths) return rootPathInPaths;

  // Option 3. Return the main file's directory
  return path.dirname(require.main.filename);
};

module.exports = { getRootPath };
