import ApolloClient, {gql} from 'apollo-boost';
import fetch from 'node-fetch';

// Query all blog-posts (preview mode showing drafts. LIVE is for production)
const GET_BLOGPOSTS = gql`
query Posts {  
  posts (publicationState: PREVIEW) {
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

// Query a single blog post
const GET_BLOGPOST = gql`
query Posts($slug: String!) {
  posts: posts(where: { slug: $slug }) {
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
      query: slug === 'index' ? GET_BLOGPOSTS : GET_BLOGPOST,
      variables: { slug }
    });

    res.writeHead(200, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({posts: results.data.posts}));
  } catch (e) {
    res.writeHead(500, {
      'Content-Type': 'application/json'
    });

    res.end(JSON.stringify({
      message: e.message
    }));
  }
}
