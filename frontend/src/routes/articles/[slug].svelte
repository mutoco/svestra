<script>
  export let articles;
</script>

<style>
  img {
    max-width: 33.333%;
  }
</style>


<svelte:head>
  <title>{articles[0].title}</title>
</svelte:head>

{#each articles as article}

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
  {#if article.media_url}
    <!-- <img src="{process.env.STRAPI_API_URL}{article.media}" alt="{article.title}"> -->
    <img src="{article.media_url}" alt="{article.title}">
  {/if}
  {#if article.richtext_md}
    <div class='richtext'>
      {@html article.richtext_md}
    </div> 
  {/if}
{/each}

<p><a href="articles"> back to all articles</a></p>

<script context="module">
    import loginCheck from '../../_helpers/login-check';
    export async function preload({path}) {
        const res = await this.fetch(`${path}.json`);
        const data = await res.json();
        return loginCheck.bind(this)(res, data, path);
    }
</script>
