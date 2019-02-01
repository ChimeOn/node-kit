// Return a copy of an object with undefined or null values
const compact = object => {
  return Object.keys(object).reduce((result, key) => {
    const value = object[key];

    if (value !== undefined && value !== null) {
      result[key] = value;
    }

    return result;
  }, {});
};

module.exports = { compact };
