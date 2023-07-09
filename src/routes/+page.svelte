<script>
	import Button from '$lib/components/ui/button.svelte';
	import Ticket from '$lib/icons/Ticket.svelte';
	import Cart from '$lib/icons/Cart.svelte';
	import Select from '$lib/components/ui/select.svelte';
	import { stationList } from '$lib/stationlist';

	const stations = stationList.map((s) => s.Station_ShortName);
</script>

<main class="h-screen flex flex-col items-center justify-center">
	<form action="" method="post" class="flex flex-col gap-16">
		<h1 class="font-bold text-2xl flex gap-2 text-center">Book Your Ticket <Ticket /></h1>
		<div class="flex flex-col gap-5">
			<div>
				<p>Origin:</p>
				<Select values={stations} />
			</div>
			<div>
				<p>Destination:</p>
				<Select values={stations} />
			</div>
		</div>
		<Button on:click={() => alert(1)}>Make Payment <Cart /></Button>
	</form>
</main>
