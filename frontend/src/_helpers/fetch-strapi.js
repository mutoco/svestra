import fetch from 'node-fetch';
import parseMarkdown from './parse-markdown';

const STAGE = process.env.SAPPER_MODE === 'export' ? 'live' : 'preview';

export default async function fetchStrapi(req, res, route, contenttype) {
  const backendUrl = new URL(`${process.env.STRAPI_API_URL}/${route}`);
  backendUrl.searchParams.set('_publicationState', STAGE);

  if (STAGE === 'live') {
    backendUrl.searchParams.set('token', process.env.EXPORT_API_TOKEN);
  }
  
  const {slug} = req.params;
  
  try {
    if (contenttype === 'collection') {
        if (slug !== 'index') {
          backendUrl.searchParams.set('slug', slug);
        }
    }
    const headers = new fetch.Headers();

    if (STAGE !== 'live' && req.session) {
      headers.append('Authorization', `Bearer ${req.session.token}`);
    }
    const response = await fetch(backendUrl, {headers});
    let content = await response.json();

    res.writeHead(response.ok ? 200 : response.status, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({ content: parseMarkdown(content) }));
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