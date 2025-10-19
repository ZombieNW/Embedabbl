<script>
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="/icon.png" />
	<title>Embedabbl - Content Embedder</title>
	<meta name="description" content="An easier way to embed content into your website." />
</svelte:head>

{@render children?.()}
