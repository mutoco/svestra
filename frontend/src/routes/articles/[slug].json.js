import fetch from 'node-fetch';

// Query all blog-posts (preview mode showing drafts. LIVE is for production)
const GET_BLOGPOSTS = process.env.STRAPI_API_URL+'/posts?_publicationState=preview';

// Query a single blog post
const GET_BLOGPOST = process.env.STRAPI_API_URL+'/posts?slug=$slug';

export async function get(req, res) {
  const {slug} = req.params;
  try {
    const response = await fetch(slug === 'index' ? GET_BLOGPOSTS : GET_BLOGPOST);
    const posts = await response.json();

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({posts}));
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
