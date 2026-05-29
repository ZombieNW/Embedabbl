<script>
	import { cores } from '$lib/cores/registry';
	import Highlight from 'svelte-highlight';
	import { xml } from 'svelte-highlight/languages';
	import HighlightStyle from 'svelte-highlight/styles/circus';

	const coreList = Object.values(cores).filter((core) => typeof core.advertise === 'undefined' || core.advertise);

	function getExampleUrl(coreId, paramName) {
		const examples = {
			ruffle: 'https://embedabbl.zombienw.com/examples/test.swf',
			awayfl: 'https://embedabbl.zombienw.com/examples/test.swf',
			waflash: 'https://embedabbl.zombienw.com/examples/test.swf',
			emujs: 'https://embedabbl.zombienw.com/examples/test.nes&core=nes',
			webretro: 'https://embedabbl.zombienw.com/examples/test.nes&core=nes',
			jsdos: 'https://embedabbl.zombienw.com/examples/test.jsdos',
			forkphorus: '191452192'
		};
		return `/${coreId}?${paramName}=${examples[coreId] || ''}`;
	}
</script>

<svelte:head>
	{@html HighlightStyle}
</svelte:head>

<div
	class="relative min-h-screen w-full overflow-x-hidden bg-slate-950 bg-gradient-to-t from-slate-950 to-indigo-950/60 text-slate-100"
>
	<!-- Content Wrapper -->
	<div class="mx-auto flex flex-col items-center px-4 md:max-w-3/4">
		<!-- Hero -->
		<div class="my-12 flex flex-col items-center gap-4">
			<h1 class="bg-gradient-to-t from-indigo-400 to-violet-300 bg-clip-text text-6xl font-bold text-transparent">Embedabbl</h1>
			<p class="text-slate-400">Easy iFrame embedding for all sorts of online content. One URL, many cores.</p>
		</div>
		<!-- Main Grid -->
		<div class="mb-6 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
			<!-- Quick Start -->
			<div class="h-full w-full rounded-lg border-1 border-slate-800 bg-slate-900/50 p-4">
				<h2 class="mb-2 rounded-sm border-l-4 border-l-indigo-500 pl-2 text-sm font-bold text-indigo-500">QUICK START</h2>
				<p class="my-2 text-slate-400">Basic Usage</p>
				<div class="my-2 rounded-lg border-1 border-slate-800">
					<Highlight
						language={xml}
						code={`<iframe\n\twidth="800px"\n\theight="600px"\n\tsrc="https://embedabbl.zombienw.com/[core]?[file-type]=[content-url]"\n\tframeborder="0">\n</iframe>`}
					/>
				</div>
				<p class="my-2 text-slate-400">Example - DOS Game</p>
				<div class="my-2 rounded-lg border-1 border-slate-800">
					<Highlight
						language={xml}
						code={`<iframe\n\twidth="800px"\n\theight="600px"\n\tsrc="https://embedabbl.zombienw.com/jsdos?jsdos=https://embedabbl.zombienw.com/jsdos/test.jsdos"\n\tframeborder="0">\n</iframe>`}
					/>
				</div>
			</div>
			<!-- How It Works -->
			<div class="h-full w-full rounded-lg border-1 border-slate-800 bg-slate-900/50 p-4">
				<h2 class="rounded-sm border-l-4 border-l-indigo-500 pl-2 text-sm font-bold text-indigo-500">HOW IT WORKS</h2>
				<h3 class="my-2 text-lg font-semibold text-slate-200">Users</h3>
				<p class="my-1 pl-2 text-slate-400">
					<span class="font-semibold text-indigo-500">1.</span> Choose a core that matches what you want to play: Flash, DOS, NES,
					etc.
				</p>
				<p class="my-1 pl-2 text-slate-400">
					<span class="font-semibold text-indigo-500">2.</span> Combine the core URL with your resource/rom url.
				</p>
				<p class="my-1 pl-2 text-slate-400">
					<span class="font-semibold text-indigo-500">3.</span> Paste the URL as the source of an iFrame.
				</p>
				<p class="my-1 pl-2 text-slate-400">
					<span class="font-semibold text-indigo-500">4.</span> Have fun!
				</p>

				<h3 class="my-2 text-lg font-semibold text-slate-200">Technical</h3>
				<p class="text-slate-400">
					Each "core" is a script that optimizes the boot-strapping of each runtime to work based off url parameters. Embedabbl
					reads the parameters and pieces together what it can. Nothing crazy.
				</p>
			</div>
			<!-- Cores -->
			<div class="h-full w-full rounded-lg border-1 border-slate-800 bg-slate-900/50 p-4 md:col-span-2">
				<h2 class="rounded-sm border-l-4 border-l-indigo-500 pl-2 text-sm font-bold text-indigo-500">AVAILABLE CORES</h2>
				<!-- Core Grid -->
				<div class="my-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
					{#each coreList as core, i (core)}
						<div
							class="flex flex-col justify-between rounded-lg border border-slate-800 bg-slate-900/75 p-4 transition-all duration-100 hover:-translate-y-1 hover:border-indigo-800"
						>
							<div>
								<h2 class="font-semibold text-slate-300">{core.name}</h2>
								<h3 class="text-sm text-slate-400">{core.description}</h3>

								<div class="my-2 flex flex-col gap-2 text-sm text-slate-500">
									<span>
										param:
										<code class="rounded-lg border border-emerald-500/50 bg-emerald-500/20 px-1 py-0.5 text-slate-300">
											{core.paramName}
										</code>
									</span>
									<span>
										route:
										<code class="rounded-lg border border-sky-500/50 bg-sky-500/20 px-1 py-0.5 text-slate-300">
											/{core.id}
										</code>
									</span>
								</div>
							</div>

							<a
								href={getExampleUrl(core.id, core.paramName)}
								class="mt-auto mr-auto w-auto rounded-lg border border-rose-500/50 bg-rose-500/10 px-2 py-0.5 text-center"
							>
								↗ Example
							</a>
						</div>
					{/each}
				</div>
			</div>
		</div>
		<!-- Footer -->
		<div class="my-4 mb-12 flex flex-col items-center justify-center text-slate-400">
			<p>Embedabbl v2.1 - Early Access</p>
			<a href="https://zombienw.com"> by ZombieNW with ❤️</a>
		</div>
	</div>
</div>

<style lang="postcss">
	/*Scrollbar Stuff*/
	:global(::-webkit-scrollbar) {
		width: 10px;
		height: 10px;
	}

	:global(::-webkit-scrollbar-track) {
		background: var(--color-slate-950);
	}

	:global(::-webkit-scrollbar-thumb) {
		background: var(--color-slate-800);
		border-radius: 5px;
		border: 2px solid var(--color-slate-950);
	}

	:global(::-webkit-scrollbar-thumb:hover) {
		background: var(--color-indigo-500);
	}

	:global(html) {
		scrollbar-color: var(--color-slate-800) var(--color-slate-950);
		scrollbar-width: thin;
	}
</style>
