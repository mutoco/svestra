import marked from 'marked';

// Recursively parses an object or array and converts all fields ending with `_md` from markdown to html
export default function parseMarkdown(obj) {
  if (Array.isArray(obj)) {
    return obj.map(parseMarkdown);
  }

  if (obj instanceof Object) {
    return Object.keys(obj).reduce((accum, key) => {
      if (key.endsWith('_md') && typeof obj[key] === 'string') {
        accum[key] = marked(obj[key]);
      } else {
        accum[key] = parseMarkdown(obj[key]);
      }
      return accum;
    }, {});
  }

  return obj;
}
