<script>
    export let articles = [];
</script>

<style>
    :global(main) {
        padding: 2rem;
    }
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

<h1>recent articles</h1>

<ul>
    {#each articles as article}
        <li>
            <a rel='prefetch' href='articles/{article.slug}'>
                <article>
                    <h2>
                        {article.title}
                    </h2>
                    <!-- {process.env.BACKEND_URL} -->
                    {#if article.media}
                        <img src="{process.env.STRAPI_API_URL}{article.media.url}" alt="{article.title}">
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
    export async function preload({path}) {
        const res = await this.fetch('articles/index.json');
        const data = await res.json();

        if (res.status === 200) {
            return data;
        } else if (res.status === 401) {
            //TODO: Create helper to handle unauthorized content access
            const params = new URLSearchParams();
            params.set('redirect', path);
            this.redirect(302, `/login?${params.toString()}`);
        } else {
            this.error(res.status, data.message);
        }
    }
</script>
