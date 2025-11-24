// advertise flag asks whether or not to show the core on the home page
export const cores = {
	ruffle: {
		advertise: true,
		id: 'ruffle',
		name: 'Ruffle',
		description: 'Flash Emulator',
		paramName: 'swf',
		scripts: ['https://unpkg.com/@ruffle-rs/ruffle'],
		initialize: async (container, contentUrl) => {
			if (window.RufflePlayer) {
				const ruffle = window.RufflePlayer.newest();
				const player = await ruffle.createPlayer();

				// Configure container
				container.innerHTML = '';
				container.appendChild(player);

				// Configure Player
				player.load(contentUrl);
				player.style.width = '100%';
				player.style.height = '100%';
				player.style.display = 'block';
			}
		}
	},
	jsdos: {
		advertise: true,
		id: 'jsdos',
		name: 'JS-DOS',
		description: 'DOS Emulator',
		paramName: 'jsdos',
		scripts: ['https://v8.js-dos.com/latest/js-dos.js'],
		initialize: async (container, contentUrl) => {
			if (typeof Dos !== 'undefined') {
				container.innerHTML = '';

				// Add CSS
				const styleLink = document.createElement('link');
				styleLink.rel = 'stylesheet';
				styleLink.href = 'https://v8.js-dos.com/latest/js-dos.css';
				document.head.appendChild(styleLink);

				await new Promise((resolve) => {
					styleLink.onload = resolve;
				});

				Dos(container, {
					url: contentUrl
				});
			}
		}
	},
	awayfl: {
		advertise: true,
		id: 'awayfl',
		name: 'AwayFL',
		description: 'Flash Emulator',
		paramName: 'swf',
		scripts: ['https://awayfl.github.io/awayfl-embed/dist/embed.js'],
		initialize: async (container, contentUrl) => {
			if (typeof swfObject !== 'undefined') {
				container.innerHTML = '';

				swfObject.embedSWF(contentUrl, container, container.offsetWidth, container.offsetHeight);
			}
		}
	},
	waflash: {
		advertise: false,
		id: 'waflash',
		name: 'WAFlash',
		description: 'Flash Emulator',
		paramName: 'swf',
		scripts: [''],
		module: true,
		initialize: async (container, contentUrl) => {}
	},
	forkphorus: {
		advertise: true,
		id: 'forkphorus',
		name: 'Forkphorus',
		description: 'Scratch Player',
		paramName: 'id',
		scripts: [
			'https://forkphorus.github.io/lib/scratch-sb1-converter.js',
			'https://forkphorus.github.io/lib/jszip.min.js',
			'https://forkphorus.github.io/lib/fontfaceobserver.standalone.js',
			'https://forkphorus.github.io/lib/canvg.min.js',
			'https://forkphorus.github.io/lib/purify.min.js',
			'https://forkphorus.github.io/phosphorus.dist.js',
			'https://forkphorus.github.io/common.js'
		],
		prescript: async (container, contentUrl) => {
			// Prepare Container
			container.innerHTML = '';
			container.id = 'player';

			// Insert CSS
			const cssUrl = 'https://forkphorus.github.io/phosphorus.css';
			const cssLink = document.createElement('link');
			cssLink.rel = 'stylesheet';
			cssLink.href = cssUrl;
			document.head.appendChild(cssLink);
		},
		initialize: async (container, contentUrl) => {
			// Redirect soundbank/asset URLs
			P.io.config.localPath = 'https://forkphorus.github.io/';

			// Initialize player
			const player = new P.player.Player();
			new P.player.ErrorHandler(player);

			// Configure player
			player.setOptions({
				...Common.playerOptions,
				theme: 'dark',
				focusOnLoad: false
			});

			// Load project
			document.querySelector('#player').appendChild(player.root);
			player.loadProjectById(Common.projectId).then(() => {
				player.stage.setZoom(window.innerWidth / 480);
			});

			// Wait for player to load
			await new Promise((resolve) => {
				player.onload.subscribe(resolve);
			});
		}
	},
	emujs: {
		advertise: true,
		id: 'emujs',
		name: 'EmulatorJS',
		description: 'Retroarch Implementation in JavaScript',
		paramName: 'rom',
		scripts: ['https://cdn.emulatorjs.org/stable/data/loader.js'],
		prescript: async (container, contentUrl) => {
			// Prepare Container
			container.innerHTML = '';
			container.id = 'game';

			// Secondary core url parameter
			const urlParams = new URLSearchParams(window.location.search);
			let coreName = urlParams.get('core') || 'not-found'; // Set it to a sentinel value if its actually not found

			// EmuJS Preparation
			window.EJS_pathtodata = 'https://cdn.emulatorjs.org/stable/data/';
			window.EJS_player = '#game';
			window.EJS_core = coreName;
			window.EJS_gameUrl = contentUrl;
		},
		initialize: async (container, contentUrl) => {
			if (window.EJS_core == 'not-found') {
				throw new Error('"core" parameter needed to load EmulatorJS');
			}
		}
	},
	webretro: {
		advertise: true,
		id: 'webretro',
		name: 'WebRetro',
		description: 'Retroarch Implementation powered by Emscripten',
		paramName: 'rom',
		scripts: ['https://binbashbanana.github.io/webretro/embed/embed.js'],
		initialize: async (container, contentUrl) => {
			// Secondary core url parameter
			const urlParams = new URLSearchParams(window.location.search);
			let coreName = urlParams.get('core') || 'not-found'; // Set it to a sentinel value if its actually not found

			if (coreName == 'not-found') {
				throw new Error('"core" parameter needed to load WebRetro');
			}

			// WebRetro
			const WEBRETRO_DATA = 'https://binbashbanana.github.io/webretro/';
			var frame = webretroEmbed(container, WEBRETRO_DATA, { system: coreName, rom: contentUrl });
		}
	}
};

export function getCoreById(id) {
	return cores[id] || null;
}

export function getContentUrl(core, searchParams) {
	return searchParams.get(core.paramName);
}
