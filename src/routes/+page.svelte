<script>
	import Button from '../lib/components/button.svelte';
	import { stationList } from '../lib/stationlist';
</script>

<main>
	<h1 class="font-bold text-2xl">Book Your Ticket</h1>
	<form action="">
		<Button on:click={() => alert(1)}>Make Payment</Button>
	</form>
</main>
