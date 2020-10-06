import ApolloClient, {gql} from 'apollo-boost';
import fetch from 'node-fetch';

// Query all blog-posts
const GET_BLOGPOSTS = gql`
query Posts {  
  posts {
    id
    title
    published
    slug
    lead
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
    published
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
