<script>
	import { onMount, onDestroy } from 'svelte';

	export let core;
	export let contentUrl;

	let container;
	let loading = true;
	let error = '';

	async function loadScripts(scripts, isModule) {
		// Load scripts
		for (const src of scripts) {
			await new Promise((resolve, reject) => {
				// Check if the script is already loaded
				const existing = document.querySelector(`script[src="${src}"]`);
				if (existing) {
					resolve(null);
					return;
				}

				const script = document.createElement('script');
				script.src = src;
				script.type = isModule ? 'module' : 'text/javascript';
				script.onload = () => resolve(null);
				script.onerror = () => reject(new Error(`Failed to load ${src}`));
				document.head.appendChild(script);
				console.log('Script loaded:', src);
			});
		}
	}

	async function initializeCore() {
		try {
			loading = true;
			error = '';

			// Load scripts
			if (core.scripts && core.scripts.length > 0) {
				const isModule = typeof core.module === 'boolean' ? core.module : false;
				await loadScripts(core.scripts, isModule);
			}

			await core.initialize(container, contentUrl);
			loading = false;
		} catch (err) {
			console.error('Failed to initialize core:', err);
			error = err instanceof Error ? err.message : 'Failed to load content';
			loading = false;
		}
	}

	onMount(() => {
		initializeCore();
	});

	onDestroy(() => {
		// If the core has a cleanup function, call it
		if (core.cleanup) {
			core.cleanup();
		}
	});
</script>

<div class="relative h-screen w-full">
	{#if loading}
		<div class="absolute inset-0 flex items-center justify-center bg-gray-900">
			<div class="text-center">
				<div class="mb-4 inline-block h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
				<p class="text-gray-300">Loading {core.name}...</p>
			</div>
		</div>
	{/if}
	{#if error}
		<div class="absolute inset-0 flex items-center justify-center bg-slate-900">
			<div class="max-w-lg rounded-lg border border-violet-900 bg-violet-900/10 p-6">
				<h3 class="mb-2 text-lg font-bold text-red-500">Error Loading Content</h3>
				<p class="text-slate-300">{error}</p>
				<button on:click={initializeCore} class="mt-4 rounded bg-red-500 px-4 py-2 text-white transition hover:bg-red-600">
					Retry
				</button>
			</div>
		</div>
	{/if}

	<!-- Core container -->
	<div bind:this={container} class="h-full w-full" id="container"></div>
</div>
