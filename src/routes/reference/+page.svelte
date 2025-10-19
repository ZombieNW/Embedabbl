<script>
	import { cores } from '$lib/cores/registry';

	const coreList = Object.values(cores);

	function getExampleUrl(coreId, paramName) {
		const examples = {
			ruffle: 'https://embedabbl.zombienw.com/ruffle/test.swf',
			awayfl: 'https://embedabbl.zombienw.com/ruffle/test.swf',
			waflash: 'https://embedabbl.zombienw.com/ruffle/test.swf',
			emujs: 'https://embedabbl.zombienw.com/emujs/test.nes',
			webretro: 'https://embedabbl.zombienw.com/emujs/test.nes',
			jsdos: 'https://embedabbl.zombienw.com/jsdos/test.jsdos',
			forkphorus: '191452192'
		};
		return `/${coreId}?${paramName}=${examples[coreId]}`;
	}
</script>

<div class="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
	<div class="container mx-auto px-4 py-12">
		<!-- Header -->
		<div class="mb-12 text-center">
			<h1 class="mb-4 text-5xl font-bold text-white">
				Embed<span class="text-blue-500">abbl</span>
			</h1>
			<p class="mx-auto max-w-2xl text-lg text-gray-400">
				Easy iframe embedding for Flash, DOS, Scratch, and retro games. One URL, multiple emulation cores.
			</p>
		</div>

		<!-- Quick Start -->
		<div class="mx-auto mb-12 max-w-4xl rounded-lg border border-gray-700 bg-gray-800/50 p-6">
			<h2 class="mb-4 text-2xl font-bold text-white">Quick Start</h2>
			<div class="space-y-4">
				<div>
					<p class="mb-2 text-gray-300">Basic usage:</p>
					<code class="block overflow-x-auto rounded bg-gray-900 p-4 text-sm text-blue-400">
						https://yoursite.com/[core]?[param]=[content-url]
					</code>
				</div>
				<div>
					<p class="mb-2 text-gray-300">Example:</p>
					<code class="block overflow-x-auto rounded bg-gray-900 p-4 text-sm text-green-400">
						https://yoursite.com/jsdos?jsdos=https://example.com/game.jsdos
					</code>
				</div>
			</div>
		</div>

		<!-- Available Cores -->
		<div class="mx-auto max-w-6xl">
			<h2 class="mb-8 text-center text-3xl font-bold text-white">Available Cores</h2>

			<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each coreList as core}
					<div class="rounded-lg border border-gray-700 bg-gray-800/50 p-6 transition hover:border-blue-500">
						<h3 class="mb-2 text-xl font-bold text-white">{core.name}</h3>
						<p class="mb-4 text-gray-400">{core.description}</p>

						<div class="mb-4 space-y-2">
							<div class="text-sm">
								<span class="text-gray-500">URL Parameter:</span>
								<code class="ml-2 rounded bg-gray-900 px-2 py-1 text-blue-400">{core.paramName}</code>
							</div>
							<div class="text-sm">
								<span class="text-gray-500">Route:</span>
								<code class="ml-2 rounded bg-gray-900 px-2 py-1 text-green-400">/{core.id}</code>
							</div>
						</div>

						<a
							href={getExampleUrl(core.id, core.paramName)}
							class="inline-block rounded bg-blue-500 px-4 py-2 text-sm text-white transition hover:bg-blue-600"
						>
							View Example
						</a>
					</div>
				{/each}
			</div>
		</div>

		<!-- Integration Guide -->
		<div class="mx-auto mt-12 max-w-4xl rounded-lg border border-gray-700 bg-gray-800/50 p-6">
			<h2 class="mb-4 text-2xl font-bold text-white">Iframe Integration</h2>
			<p class="mb-4 text-gray-300">Embed content on your site using a simple iframe:</p>
			<code class="block overflow-x-auto rounded bg-gray-900 p-4 text-sm">
				<span class="text-blue-400">&lt;iframe</span>
				<span class="text-white"> src=</span><span class="text-green-400"
					>"https://yoursite.com/ruffle?swf=https://example.com/game.swf"</span
				>
				<span class="text-white"> width=</span><span class="text-green-400">"800"</span>
				<span class="text-white"> height=</span><span class="text-green-400">"600"</span>
				<span class="text-white"> frameborder=</span><span class="text-green-400">"0"</span>
				<span class="text-blue-400">&gt;&lt;/iframe&gt;</span>
			</code>
		</div>

		<!-- Footer -->
		<div class="mt-12 text-center text-gray-500">
			<p>Embedabbl v2.0 - Modernized with SvelteKit & Tailwind</p>
			<p class="mt-2 text-sm">Made for preserving web gaming history</p>
		</div>
	</div>
</div>
