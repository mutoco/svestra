<script>
	import TeaserMedia from '../TeaserMedia/TeaserMedia.svelte';
	import TeaserText from '../TeaserText/TeaserText.svelte';

	const moduleByName = (__component) => {
		switch (__component) {
			case 'teaser.teaser-media':
				return TeaserMedia;
			case 'teaser.teaser-text':
				return TeaserText;
		}
	};

	export let blocks;
</script>

{#each blocks as {__component, ...props}}
	<svelte:component this={moduleByName(__component)} {...props}></svelte:component>
{/each}

<!-- Use it like this: -->
<!-- <ContentBlocks blocks={article.components}></ContentBlocks> -->