<script>
    export let content = [];
</script>

<style>
    ul, p {
        padding: 0;
        margin: 0 0 1em 0;
        line-height: 1.5;
        list-style: none;
    }
    li {
        max-width: 33.333%;
    }
</style>

<svelte:head>
    <title>articles</title>
</svelte:head>

<h1>Articles</h1>

<ul>
    {#each content as article}
        <li>
            <a rel='prefetch' href='articles/{article.slug}'>
                <article>
                    <h2>
                        {article.title}
                    </h2>
                    <!-- {process.env.BACKEND_URL} -->
                    {#if article.media_url}
                        <!-- <img src="{process.env.STRAPI_API_URL}{article.media}" alt="{article.title}"> -->
                        <img src="{article.media_url}" alt="{article.title}">
                    {/if}
                </article>
            </a>
        </li>
        {#if article.author}
            <p>
                {article.published_at ? article.published_at : 'DRAFT'} by {article.author.username}
            </p>
        {/if}
    {/each}
</ul>

<script context="module">
    import loginCheck from '../../_helpers/login-check';
    export async function preload({path}) {
        const res = await this.fetch('articles/index.json');
        const data = await res.json();
        return loginCheck.bind(this)(res, data, path);
    }
</script>
