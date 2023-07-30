<script lang="ts">
	import { goto, invalidate } from '$app/navigation';
	import Button from '$lib/components/ui/button.svelte';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { page } from '$app/stores';
	const { invoiceId } = $page.params;

	const fetchTicket = async () => {
		const response = await fetch(`${env.PUBLIC_BITCART_URL}/api/invoices/${invoiceId}`);
		const invoice = await response.json();
		return invoice;
	};

	const promise = fetchTicket();

	onMount(() => {
		const interval = setInterval(() => {}, 5000);

		return () => clearInterval(interval);
	});
</script>

{#await promise}
	<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
		<h1 class="text-2xl font-bold">Ticket</h1>
		<p class="mt-1">Ticket is stored via nft.storage</p>
		<div class="my-16 flex flex-col items-center">
			<div class="w-32 h-32 bg-neutral-400 animate-pulse" />
			<p class="font-mono text-base">Loading...</p>
		</div>
		<p class="mb-4">Note: Ticket Validity is 120 mins from the time of entry</p>
		<Button loading={false} on:click={() => goto('/')}>&leftarrow; Back</Button>
	</main>
{:then invoice}
	<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
		<h1 class="text-2xl font-bold">Ticket</h1>
		<p class="mt-1">Ticket is stored via nft.storage</p>
		<div class="my-16 flex flex-col items-center">
			<img
				src={`https://${invoice.notes}.ipfs.nftstorage.link`}
				alt="Ticket QRCode"
				class="w-32 h-32"
			/>
			<p class="font-mono text-base">{invoice.id}</p>
		</div>
		<p class="mb-4">Note: Ticket Validity is 120 mins from the time of entry</p>
		<Button loading={false} on:click={() => goto('/')}>&leftarrow; Back</Button>
	</main>
{:catch error}
	<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
		<h1 class="text-2xl font-bold">Ticket Not Found</h1>
	</main>
{/await}
