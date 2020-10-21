import fetch from 'node-fetch';
import marked from 'marked'

const STAGE = process.env.SAPPER_MODE === 'export' ? 'live' : 'preview';

const parseMarkdown = (obj) => {
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

export async function get(req, res) {
  const backendUrl = new URL(`${process.env.STRAPI_API_URL}/articles`);
  backendUrl.searchParams.set('_publicationState', STAGE);

  if (STAGE === 'live') {
    backendUrl.searchParams.set('token', process.env.EXPORT_API_TOKEN);
  }

  const {slug} = req.params;
  try {
    if (slug !== 'index') {
      backendUrl.searchParams.set('slug', slug);
    }
    const headers = new fetch.Headers();

    if (STAGE !== 'live' && req.session) {
      headers.append('Authorization', `Bearer ${req.session.token}`);
    }
    const response = await fetch(backendUrl, {headers});
    let articles = await response.json();

    res.writeHead(response.ok ? 200 : response.status, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify(parseMarkdown(articles)));
  }
  catch (e) {
    res.writeHead(500, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: e.message
    }));
  }
}
