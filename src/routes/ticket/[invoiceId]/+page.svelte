<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
	<h1 class="text-2xl font-bold">Tickets</h1>
	<img src={data.invoice.notes} alt="" />
	<p class="mt-1 font-mono">{data.invoice.id}</p>
</main>
