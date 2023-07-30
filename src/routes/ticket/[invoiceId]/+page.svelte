<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

{#if data.invoice.id}
	<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
		<h1 class="text-2xl font-bold">Ticket</h1>
		<p>Ticket is stored via nft.storage</p>
		<div class="my-16 flex flex-col items-center">
			<img
				src={`https://${data.invoice.notes}.ipfs.nftstorage.link`}
				alt="Ticket QRCode"
				class="w-32 h-32"
			/>
			<p class="font-mono text-base">{data.invoice.id}</p>
		</div>
		<p class="mb-4">Note: Ticket Validity is 120 mins from the time of entry</p>
		<Button loading={false} on:click={() => goto('/')}>&leftarrow; Back</Button>
	</main>
{:else}
	<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
		<h1 class="text-2xl font-bold">Ticket Not Found</h1>
	</main>
{/if}
