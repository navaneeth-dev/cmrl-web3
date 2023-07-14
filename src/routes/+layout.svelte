<script>
	import '../app.css';
	import { PUBLIC_BITCART_URL } from '$env/static/public';
</script>

<svelte:head>
	<script src={PUBLIC_BITCART_URL + '/admin/modal/bitcart.js'}></script>
</svelte:head>

<slot />
