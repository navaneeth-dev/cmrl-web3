<script>
	import Button from '$lib/components/ui/button.svelte';
	import Ticket from '$lib/icons/Ticket.svelte';
	import Cart from '$lib/icons/Cart.svelte';
	import Select from '$lib/components/ui/select.svelte';
</script>

<main class="h-screen flex flex-col items-center justify-center">
	<form action="" method="post" class="flex flex-col gap-16">
		<h1 class="font-bold text-2xl flex gap-2 text-center">Book Your Ticket <Ticket /></h1>
		<div>
			<Select />
		</div>
		<Button on:click={() => alert(1)}>Make Payment <Cart /></Button>
	</form>
</main>
