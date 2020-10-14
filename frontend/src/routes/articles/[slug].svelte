<script>
  export let posts;
</script>

<style>
    .content :global(h2) {
        font-size: 1.4em;
        font-weight: 500;
    }

    .content :global(pre) {
        background-color: #f9f9f9;
        box-shadow: inset 1px 1px 5px rgba(0, 0, 0, 0.05);
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

{#each posts as post}
  <h2>{post.title}</h2>
  {#if post.author}
    <h3>{post.published} by {post.author.username}</h3>
  {/if}
  {#if post.media}
    <img src="{process.env.STRAPI_API_URL}{post.media.url}" alt="{post.title}">
  {/if}
  <div class='content'>
    {@html post.content}
  </div>
{/each}

<p>⇺<a href="articles"> back to articles</a></p>

<script context="module">
    export async function preload({path}) {
        const res = await this.fetch(`${path}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return data;
        } else {
            this.error(res.status, data.message);
        }
    }
</script>
