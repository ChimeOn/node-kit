const fs = require('fs');

const getFileContents = filepath => {
  return fs.readFileSync(filepath, 'utf8');
};

const getFileJSONContents = filepath => {
  return JSON.parse(getFileContents(filepath));
};

module.exports = { getFileContents, getFileJSONContents };
