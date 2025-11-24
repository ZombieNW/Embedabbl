<script>
	import { cores } from '$lib/cores/registry';
	import Highlight from 'svelte-highlight';
	import { xml } from 'svelte-highlight/languages';
	import HighlightStyle from 'svelte-highlight/styles/github-dark';

	const coreList = Object.values(cores).filter((core) => typeof core.advertise === 'undefined' || core.advertise);

	function getExampleUrl(coreId, paramName) {
		const examples = {
			ruffle: 'https://embedabbl.zombienw.com/ruffle/test.swf',
			awayfl: 'https://embedabbl.zombienw.com/ruffle/test.swf',
			waflash: 'https://embedabbl.zombienw.com/ruffle/test.swf',
			emujs: 'https://embedabbl.zombienw.com/emujs/test.nes&core=nes',
			webretro: 'https://embedabbl.zombienw.com/emujs/test.nes',
			jsdos: 'https://embedabbl.zombienw.com/jsdos/test.jsdos',
			forkphorus: '191452192'
		};
		return `/${coreId}?${paramName}=${examples[coreId] || ''}`;
	}
</script>

<svelte:head>
	{@html HighlightStyle}
</svelte:head>

<div class="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-slate-950 via-slate-800 to-slate-950 text-slate-100">
	<div class="mx-auto">
		<!-- Header -->
		<div class="p-8 text-center">
			<!-- <img src="/logo.png" alt="Embdbl Wordmark within a window" class="mx-auto h-36" /> -->
			<h1
				class="mb-4 inline-block bg-gradient-to-t from-violet-300 to-indigo-800 bg-clip-text text-7xl font-bold text-transparent"
			>
				Embdbl
			</h1>
			<p class="text-lg">Easy iframe embedding for all sorts of online content. <br /> One URL, many options.</p>
		</div>

		<!-- Main Section -->
		<div class="mx-auto flex w-full flex-col justify-center p-8 lg:flex-row">
			<!-- Quick Start -->
			<div class="w-full rounded-lg border border-slate-700 bg-slate-800/50 p-6">
				<h2 class="mb-4 text-3xl font-bold text-white">Quick Start</h2>

				<div class="space-y-4">
					<div>
						<p class="mb-2 text-lg text-gray-300">Basic usage:</p>
						<div class="rounded-xl">
							<Highlight
								language={xml}
								code={`<iframe\n\twidth="800px"\n\theight="600px"\n\tsrc="https://embedabbl.zombienw.com/[core]?[file-type]=[content-url]"\n\tframeborder="0">\n</iframe>`}
							/>
						</div>
					</div>
					<div>
						<p class="mb-2 text-lg text-gray-300">Example:</p>
						<div class="rounded-xl">
							<Highlight
								language={xml}
								code={`<iframe\n\twidth="800px"\n\theight="600px"\n\tsrc="https://embedabbl.zombienw.com/jsdos?jsdos=https://embedabbl.zombienw.com/jsdos/test.jsdos"\n\tframeborder="0">\n</iframe>`}
							/>
						</div>
					</div>
				</div>
			</div>

			<!-- Cores -->
			<div class="mt-8 ml-0 w-full rounded-lg border border-slate-700 bg-slate-800/50 p-6 lg:mt-0 lg:ml-8">
				<h2 class="mb-4 text-3xl font-bold text-white">Cores & Examples:</h2>

				<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
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
		</div>

		<!-- Footer -->
		<div class="mb-6 text-center text-gray-500">
			<p>Embdbl v2 - EARLY ACCESS - ZombieNW</p>
			<p class="mt-1 text-sm">Made with ❤️ and SvelteKit</p>
		</div>
	</div>
</div>
