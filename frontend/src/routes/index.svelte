<script>
    export let content = [];
</script>

<svelte:head>
    <title>{content.title}</title>
</svelte:head>

<h1>{content.title}</h1>
{@html content.richtext_md}
<!-- TODO: Add example to handle dynamic zones & components -->

<script context="module">
    import loginCheck from '../_helpers/login-check';
    export async function preload({path}) {
        const res = await this.fetch('/index.json');
        const data = await res.json();
        return loginCheck.bind(this)(res, data, path);
    }
</script>