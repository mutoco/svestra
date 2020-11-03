<script>
	import Nav from '../components/MainNav/MainNav.svelte';

	export let segment;
</script>

<style lang="scss" global>
	@import "../scss/global.scss";
</style>

<Nav {segment}/>

<main>
	<slot></slot>
</main>