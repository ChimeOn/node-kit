const SEPARATOR = '-';

const slugify = unsafeText => {
  const text = typeof unsafeText === 'string' ? unsafeText : '';

  return text
    .toLowerCase()
    .replace('&', 'and') // Replace & with URL friendly and
    .replace(/[^\x00-\x7F]/g, '') // Replace non ascii's
    .replace(/\s+/g, SEPARATOR) // Replace white spaces
    .replace(/[^-\w]+/g, '') // Replace all non word chars
    .replace(/-+/g, SEPARATOR) // No more than 1 separator in a row
    .replace(/(^-|-$)/g, ''); // Trim leading/trailing separator
};

module.exports = { slugify };
