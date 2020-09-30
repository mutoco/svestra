<script context="module">
    import ApolloClient, { gql } from 'apollo-boost';  
    
    const blogQuery = gql`
    query Posts($post_slug: String!) {
        posts: posts(where: { post_slug: $post_slug }) {
            id
            post_title
            post_published
            post_slug
            post_lead
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
            query: blogQuery,
            variables: {"post_slug" : params.slug} 
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
<h2>{post.post_title}</h2>
<h3>{post.post_published} by {post.post_author.username}</h3>

<div class='content'>
    {@html post.post_content} </div>
    {/each}
    
    <p>⇺<a href="articles"> back to articles</a></p>