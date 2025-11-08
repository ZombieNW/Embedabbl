<script>
	import { page } from '$app/stores';
	import { cores, getContentUrl } from '$lib/cores/registry';
	import CoreLoader from '$lib/components/CoreLoader.svelte';
	import { onMount } from 'svelte';

	let contentUrl = null;
	$: coreId = $page.params.core;
	$: core = cores[coreId];
	$: contentUrl;

	// State Checks
	$: isValid = core && contentUrl && contentUrl != 'not-found';
	$: loading = core && !contentUrl;
	$: noContentUrl = core && contentUrl == 'not-found';

	onMount(() => {
		const urlParams = new URLSearchParams(window.location.search);
		contentUrl = urlParams.get(core.paramName) || 'not-found'; // Set it to a sentinel value if its actually not found
		console.log('Content URL:', contentUrl);
	});
</script>

<svelte:head>
	<title>{isValid ? `${core.name} - Embedabbl` : 'Embedabbl'}</title>
</svelte:head>

<div class="overflow-hidden">
	{#if isValid}
		<CoreLoader {core} {contentUrl} />
	{:else if loading}
		<div class="absolute inset-0 flex items-center justify-center bg-gray-900">
			<div class="text-center">
				<div class="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
				<p class="text-gray-300">Loading {core.name}...</p>
			</div>
		</div>
	{:else if noContentUrl}
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
