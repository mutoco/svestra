<script>
    export let id;
    export let Title;
    export let Lead;
    export let Date;
    export let Link;
</script>

<h1>Hello i'm the TeaserText component</h1>
<p>Here's the content i receive from Strapi:</p>
<p>
    {id}
    {Title}
    {Lead}
    {Date}
    {Link}
</p>