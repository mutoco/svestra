<script context="module">
    import ApolloClient, { gql } from 'apollo-boost';  
    
    const blogQuery = gql`
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
    export async function preload({params, query}) {
        const client = new ApolloClient({ 
            uri: `${process.env.STRAPI_API_URL}/graphql`,
            fetch: this.fetch
        });
        const results = await client.query({
            query: blogQuery,
            variables: {"slug" : params.slug} 
        })
        return {post: results.data.posts}
    }
</script>

<script>
    export let post;
</script>

<style>
    .content :global(h2) {
        font-size: 1.4em;
        font-weight: 500;
    }
    .content :global(pre) {
        background-color: #f9f9f9;
        box-shadow: inset 1px 1px 5px rgba(0,0,0,0.05);
        padding: 0.5em;
        border-radius: 2px;
        overflow-x: auto;
    }
    .content :global(pre) :global(code) {
        background-color: transparent;
        padding: 0;
    }
    .content :global(ul) {
        line-height: 1.5;
    }
    .content :global(li) {
        margin: 0 0 0.5em 0;
    }
</style>

<svelte:head>
<title>an amazing article</title>
</svelte:head>

{#each post as post}
<h2>{post.title}</h2>
<h3>{post.published} by {post.author.username}</h3>

<div class='content'>
    {@html post.content} </div>
    {/each}
    
    <p>⇺<a href="articles"> back to articles</a></p>