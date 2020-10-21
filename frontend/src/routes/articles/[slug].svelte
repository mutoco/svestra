<script>
  export let articles;
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

{#each articles as article}
  <h2>{article.title}</h2>
  {#if article.author}
    <h3>{article.published} by {article.author.username}</h3>
  {/if}
  {#if article.media}
    <img src="{process.env.STRAPI_API_URL}{article.media.url}" alt="{article.title}">
  {/if}
  <div class='content'>
    {@html article.content}
  </div>
{/each}

<p>⇺<a href="articles"> back to articles</a></p>

<script context="module">
    export async function preload({path}) {
        const res = await this.fetch(`${path}.json`);
        const data = await res.json();

        if (res.status === 200) {
            return data;
        } else if (res.status === 401) {
            const params = new URLSearchParams();
            params.set('redirect', path);
            this.redirect(302, `/login?${params.toString()}`);
        } else {
            this.error(res.status, data.message);
        }
    }
</script>
