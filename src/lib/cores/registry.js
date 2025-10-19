export const cores = {
	ruffle: {
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
	}
};

export function getCoreById(id) {
	return cores[id] || null;
}

export function getContentUrl(core, searchParams) {
	return searchParams.get(core.paramName);
}
