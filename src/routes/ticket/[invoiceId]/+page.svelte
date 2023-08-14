<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button.svelte';
	import { onDestroy } from 'svelte';
	import { env } from '$env/dynamic/public';
	import { page } from '$app/stores';
	const { invoiceId } = $page.params;

	let fetchTicketInterval: ReturnType<typeof setInterval> | null = null;

	const fetchTicket = async () => {
		const response = await fetch(`${env.PUBLIC_BITCART_URL}/api/invoices/${invoiceId}`);
		const invoice = await response.json();
		// Clear interval if success
		if (invoice.notes.split('|')[0] === 'success') {
			if (fetchTicketInterval) {
				clearInterval(fetchTicketInterval);
			}
		}
		return invoice;
	};

	let fetchTicketPromise = fetchTicket();

	const updateTicket = () => {
		fetchTicketPromise = fetchTicket();
	};

	fetchTicketInterval = setInterval(updateTicket, 5000);

	onDestroy(() => {
		if (fetchTicketInterval) {
			clearInterval(fetchTicketInterval);
		}
	});
</script>

{#await fetchTicketPromise}
	<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
		<h1 class="text-2xl font-bold">Ticket</h1>
		<p class="mt-1">Ticket is stored via nft.storage</p>
		<div class="my-16 flex flex-col items-center">
			<div class="w-32 h-32 bg-neutral-400 animate-pulse mb-1" />
			<p class="font-mono text-base">Fetching ticket details...</p>
		</div>
		<p class="mb-4">Note: Ticket Validity is 120 mins from the time of entry</p>
		<Button loading={false} on:click={() => goto('/')}>&leftarrow; Back</Button>
	</main>
{:then invoice}
	{#if invoice.notes.split('|')[0] === 'success'}
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
	{:else}
		<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
			<h1 class="text-2xl font-bold">Ticket</h1>
			<p class="mt-1">Ticket is stored via nft.storage</p>
			<div class="my-16 flex flex-col items-center">
				<div class="w-32 h-32 bg-neutral-400 animate-pulse mb-1" />
				<p class="font-mono text-base">Generating Ticket: {invoice.id}</p>
			</div>
			<p class="mb-4">Note: Ticket Validity is 120 mins from the time of entry</p>
			<Button loading={false} on:click={() => goto('/')}>&leftarrow; Back</Button>
		</main>
	{/if}
{:catch err}
	<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
		<h1 class="text-2xl font-bold mb-4">Invalid Ticket</h1>
		<Button loading={false} on:click={() => goto('/')}>&leftarrow; Back</Button>
	</main>
{/await}
