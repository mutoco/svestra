<script>
  export let articles;
</script>

<style>
  img, video {
    max-width: 33.333%;
  }
</style>

<svelte:head>
  <title>an amazing article</title>
</svelte:head>


{#each articles as article}
  
  <!-- {console.log(article)} -->

  <h1>
    {article.title}
  </h1>
  {#if article.lead}
    <h2>
      {article.lead}
    </h2>
  {/if}
  {#if article.author}
    <p>{article.published_at ? article.published_at : 'DRAFT'} by {article.author.username}</p>
  {/if}
  {#if article.media}
    <img src="{process.env.STRAPI_API_URL}{article.media.url}" alt="{article.title}">
  {/if}
  {#if article.richtext_md}
    <div class='richtext'>
      {@html article.richtext_md}
    </div> 
  {/if}
{/each}

<p><a href="articles"> back to articles</a></p>

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
