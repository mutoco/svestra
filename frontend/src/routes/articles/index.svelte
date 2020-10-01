<script context="module">
    import ApolloClient, { gql } from 'apollo-boost';  
    
    const blogQuery = gql`
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
    export async function preload({params, query}) {
        const client = new ApolloClient({ 
            uri: `${process.env.STRAPI_API_URL}/graphql`,
                fetch: this.fetch
            });
            const results = await client.query({
                query: blogQuery
            })
            return {posts: results.data.posts}
        }
</script>

<script>
    export let posts;
</script>
    
<style>
    ul, p {
        margin: 0 0 1em 0;
        line-height: 1.5;
    }
    li {
        max-width: 33.333%;
    }
    .main-title {
        font-size: 25px;
    }
</style>
    
<svelte:head>
    <title>articles</title>
</svelte:head>

<h1>recent posts</h1>

<ul>
    {#each posts as post}
    <li>
        <a class="main-title" rel='prefetch' href='articles/{post.slug}'>
            {post.title}
            <!-- {process.env.BACKEND_URL} -->
            <img src="{process.env.STRAPI_API_URL}{post.media.url}" alt="{post.title}">
        </a>
    </li>
    <p> 
        {post.published} by {post.author.username} 
    </p>
    {/each}
</ul>