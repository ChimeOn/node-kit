const fs = require('fs');

const paths = require('./paths');
const compact = require('./objects').compact;
const files = require('./files');

const getRootPath = () => {
  return paths.getRootPath();
};

const cleanForMerge = obj => {
  const safeObj = typeof obj === 'object' ? obj : {};
  return compact(safeObj);
};

const getProcessEnvironmentVariables = () => {
  return Object.assign({}, process.env);
};

const getEnvJSON = rootPath => {
  const filepath = `${rootPath}/env.json`;
  if (!fs.existsSync(filepath)) return {};

  return files.getFileJSONContents(filepath);
};

// Parses src into an Object
// Taken from: https://github.com/motdotla/dotenv/blob/master/lib/main.js#L31
const parseDotEnv = src => {
  const obj = {};

  // convert Buffers before splitting into lines and processing
  src
    .toString()
    .split('\n')
    .forEach(function(line, idx) {
      // matching "KEY' and 'VAL' in 'KEY=VAL'
      const keyValueArr = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
      // matched?
      if (keyValueArr != null) {
        const key = keyValueArr[1];

        // default undefined or missing values to empty string
        let value = keyValueArr[2] || '';

        // expand newlines in quoted values
        const len = value ? value.length : 0;
        if (len > 0 && value.charAt(0) === '"' && value.charAt(len - 1) === '"') {
          value = value.replace(/\\n/gm, '\n');
        }

        // remove any surrounding quotes and extra spaces
        value = value.replace(/(^['"]|['"]$)/g, '').trim();

        obj[key] = value;
      }
    });

  return obj;
};

const getDotEnv = rootPath => {
  const filepath = `${rootPath}/.env`;
  if (!fs.existsSync(filepath)) return {};

  return parseDotEnv(files.getFileContents(filepath));
};

// Environment variables are layered. This is the hierarchy.
// The top variables over shadow the lower variables.
// - variables passed in as option
// - process.env variables
// - env.json variables
// - .env
//
const getAllEnvironmentVariables = (options = {}) => {
  const rootPath = getRootPath();

  return Object.assign(
    {},
    cleanForMerge(getDotEnv(rootPath)),
    cleanForMerge(getEnvJSON(rootPath)),
    cleanForMerge(getProcessEnvironmentVariables()),
    cleanForMerge(options.variables)
  );
};

module.exports = { getAllEnvironmentVariables };
