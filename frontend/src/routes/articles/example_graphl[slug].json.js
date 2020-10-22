import ApolloClient, {gql} from 'apollo-boost';
import fetch from 'node-fetch';

// Query all blog-articles (PREVIEW mode showing drafts. LIVE is for production)
const GET_ARTICLES = gql`
query articles {  
  articles (publicationState: PREVIEW) {
    id
    title
    published_at
    slug
    lead
    Components {
      __typename
        ... on ComponentTeaserTeaserMedia {
          id
          Title
        	Media {url}
          Lead
          Label
        }
    }
    media {
      url
    }
    content
    author {
      username
    }
  }
}
`;

// Query a single blog article
const GET_ARTICLE = gql`
query articles($slug: String!) {
  articles: articles(where: { slug: $slug }) {
    id
    title
    published_at
    slug
    lead
    content
    author {
      username
    }
  }
}
`;

export async function get(req, res) {
  const {slug} = req.params;

  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL_URL,
    fetch
  });

  try {
    const results = await client.query({
      query: slug === 'index' ? GET_ARTICLES : GET_ARTICLE,
      variables: { slug }
    });

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({articles: results.data.articles}));
  } catch (e) {
    res.writeHead(500, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: e.message
    }));
  }
}
