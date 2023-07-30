<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Ticket from '$lib/icons/Ticket.svelte';
	import Cart from '$lib/icons/Cart.svelte';
	import Select from '$lib/components/ui/select.svelte';
	import { stationList } from '$lib/stationlist';
	import WalletConnect from '$lib/components/wallet-connect.svelte';
	import type { ActionData, SubmitFunction } from './$types';
	import { onMount } from 'svelte';
	import Spinner from '$lib/icons/Spinner.svelte';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';

	const stations = stationList.map((s) => s.Station_ShortName);
	let submitting = false;

	export let form: ActionData;

	onMount(() => {
		window.bitcart.onModalReceiveMessage((event: any) => {
			if (event?.data?.status === 'complete') {
				goto(`/ticket/${event.data.invoice_id}`);
			}
		});
	});

	const handleSubmit: SubmitFunction = () => {
		submitting = true;

		return async ({ result, update }) => {
			submitting = false;
			if (result.type === 'success') {
				window.bitcart.showInvoice(result.data?.id);
			}
			await update();
		};
	};
</script>

<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
	<div class="mb-16">
		<h1 class="font-bold text-2xl text-center">Book Your Ticket <Ticket /></h1>
		<p class="text-neutral-700 mt-1">Buy Chennai metro tickets with crypto</p>
	</div>
	{#if form}
		<div class="mb-16 text-center flex flex-col items-center">
			<Spinner />
			<p class="mt-1 mb-4">Awaiting Payment</p>
		</div>
	{:else}
		<form method="post" class="flex flex-col mb-16" use:enhance={handleSubmit}>
			<div class="flex flex-col gap-5 mb-16">
				<div>
					<p class="mb-6">Origin:</p>
					<Select values={stations} />
				</div>
				<div>
					<p class="mb-6">Destination:</p>
					<Select values={stations} />
				</div>
			</div>
			<Button disabled={submitting} loading={submitting}>Make Payment <Cart /></Button>
		</form>
	{/if}
	<WalletConnect />
</main>
