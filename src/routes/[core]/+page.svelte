<script>
	import { page } from '$app/stores';
	import { cores, getContentUrl } from '$lib/cores/registry';
	import CoreLoader from '$lib/components/CoreLoader.svelte';
	import { onMount } from 'svelte';

	let contentUrl = null;
	$: coreId = $page.params.core;
	$: core = cores[coreId];
	$: isValid = core && contentUrl;
	$: contentUrl;

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		contentUrl = urlParams.get(core.paramName);
	});
</script>

<svelte:head>
	<title>{isValid ? `${core.name} - Embedabbl` : 'Embedabbl'}</title>
</svelte:head>

<div>
	{#if isValid}
		<CoreLoader {core} {contentUrl} />
	{:else if core && !contentUrl}
		<div class="absolute inset-0 flex items-center justify-center bg-slate-900">
			<div class="max-w-lg rounded-lg border border-violet-900 bg-violet-900/10 p-6">
				<h3 class="mb-2 text-lg font-bold text-red-500">Missing Content URL</h3>
				<p class="text-slate-300">Please provide a content URL using the {core.paramName} query parameter.</p>
			</div>
		</div>
	{:else}
		<div class="absolute inset-0 flex items-center justify-center bg-slate-900">
			<div class="max-w-lg rounded-lg border border-violet-900 bg-violet-900/10 p-6">
				<h3 class="mb-2 text-lg font-bold text-red-500">Core Not Found</h3>
				<p class="text-slate-300">The core {coreId} could not be found or no longer exists.</p>
				<a href="/" class="mt-4 rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"> View Available Cores </a>
			</div>
		</div>
	{/if}
</div>
