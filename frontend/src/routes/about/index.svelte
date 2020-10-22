<svelte:head>
	<title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>

<script context="module">
    export async function preload({path}) {
        const res = await this.fetch('about.json');
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