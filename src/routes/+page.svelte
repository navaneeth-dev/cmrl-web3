<script>
	import Button from '../lib/components/button.svelte';
	import Ticket from '../lib/icons/Ticket.svelte';
	import { stationList } from '../lib/stationlist';
</script>

<main class="h-screen flex flex-col items-center justify-center">
	<h1 class="font-bold text-2xl flex gap-2">Book Your Ticket <Ticket /></h1>
	<form action="">
		<Button on:click={() => alert(1)}>Make Payment</Button>
	</form>
</main>
