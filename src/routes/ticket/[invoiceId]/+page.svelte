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

	let invoice: any | null = null;
	let loading = true;
	let interval: ReturnType<typeof setInterval>;

	onMount(() => {
		const fetchTicketInInterval = async () => {
			// Fetch once
			invoice = await fetchTicket();
			loading = false;

			// If invoice exists and generating start interval
			if (invoice?.id && invoice?.notes === '') {
				interval = setInterval(async () => {
					loading = true;
					invoice = await fetchTicket();
					loading = false;
					if (invoice.notes) clearInterval(interval);
				}, 5000);
			}
		};

		fetchTicketInInterval();

		return () => {
			if (interval) clearInterval(interval);
		};
	});
</script>

{#if loading}
	<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
		<h1 class="text-2xl font-bold">Ticket</h1>
		<p class="mt-1">Ticket is stored via nft.storage</p>
		<div class="my-16 flex flex-col items-center">
			<div class="w-32 h-32 bg-neutral-400 animate-pulse mb-1" />
			<p class="font-mono text-base">Loading...</p>
		</div>
		<p class="mb-4">Note: Ticket Validity is 120 mins from the time of entry</p>
		<Button loading={false} on:click={() => goto('/')}>&leftarrow; Back</Button>
	</main>
{:else if invoice.id && invoice.notes !== ''}
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
{:else if invoice.id}
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
{:else}
	<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
		<h1 class="text-2xl font-bold mb-4">Invalid Ticket</h1>
		<Button loading={false} on:click={() => goto('/')}>&leftarrow; Back</Button>
	</main>
{/if}
