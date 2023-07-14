<script>
	import '../app.css';
	import { env } from '$env/dynamic/public';
</script>

<svelte:head>
	<script src={env.PUBLIC_BITCART_URL + '/admin/modal/bitcart.js'}></script>
</svelte:head>

<slot />
