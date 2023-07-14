<script lang="ts">
	import Button from '$lib/components/ui/button.svelte';
	import Ticket from '$lib/icons/Ticket.svelte';
	import Cart from '$lib/icons/Cart.svelte';
	import Select from '$lib/components/ui/select.svelte';
	import { stationList } from '$lib/stationlist';
	import WalletConnect from '$lib/components/wallet-connect.svelte';
	import type { ActionData } from './$types';
	import { onMount } from 'svelte';

	const stations = stationList.map((s) => s.Station_ShortName);
	export let form: ActionData;

	onMount(() => {
		if (form?.id) window.bitcart.showInvoice(form.id);
	});
</script>

<main class="h-screen flex flex-col items-center justify-center px-2 max-w-screen-sm mx-auto">
	<div class="mb-16">
		<h1 class="font-bold text-2xl text-center">Book Your Ticket <Ticket /></h1>
		<p class="text-neutral-700 mt-1">Buy Chennai metro tickets with crypto</p>
	</div>
	<form method="post" class="flex flex-col mb-16">
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
		<Button>Make Payment <Cart /></Button>
	</form>
	<WalletConnect />
</main>
