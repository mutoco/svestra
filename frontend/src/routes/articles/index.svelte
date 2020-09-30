<script context="module">
    import ApolloClient, { gql } from 'apollo-boost';  

    let api_url = process.env.STRAPI_API_URL;
    
    const blogQuery = gql`
    query Posts {  
        posts {
            id
            post_title
            post_published
            post_slug
            post_lead
          	post_media {
              url
            }
            post_content
            post_author {
                username
            }
        }
    }
    `;
    export async function preload({params, query}) {
        const client = new ApolloClient({ 
            uri: 'http://localhost:1337/graphql',
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
        <a class="main-title" rel='prefetch' href='articles/{post.post_slug}'>
            {post.post_title}
            <!-- {process.env.BACKEND_URL} -->
            <img src="{api_url}{post.post_media.url}" alt="{post.post_title}">
        </a>
    </li>
    <p> 
        {post.post_published} by {post.post_author.username} 
    </p>
    {/each}
</ul>