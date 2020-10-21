<script>
    export let articles = [];
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

<h1>recent articles</h1>

<ul>
    {#each articles as article}
        <!-- {console.log(article)} -->
        <li>
            <a class="main-title" rel='prefetch' href='articles/{article.slug}'>
                {article.title}
                <!-- {process.env.BACKEND_URL} -->
                {#if article.media}
                    <img src="{process.env.STRAPI_API_URL}{article.media.url}" alt="{article.title}">
                {/if}
            </a>
        </li>
        {#if article.author}
            <p>
                {article.published_at} by {article.author.username}
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
