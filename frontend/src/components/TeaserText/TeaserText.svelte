<script>
    export let id;
    export let Title;
    export let Media_url;
    export let Label;
    export let Link;
    export let Media;
</script>

<h1>Hello i'm the TeaserText component</h1>
<p>Here's the content i receive from Strapi:</p>
<p>
    {id}
    {Title}
    {Media_url}
    {Label}
    {Link}
    {Media}
</p>