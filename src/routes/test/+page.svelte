<script>
	import { cores } from '$lib/cores/registry';
	import CoreLoader from '$lib/components/CoreLoader.svelte';

	const coreData = cores['ruffle'];
</script>

<CoreLoader core={coreData} contentUrl={'https://embedabbl.zombienw.com/ruffle/test.swf'} />
