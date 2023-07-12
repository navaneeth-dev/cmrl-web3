<script lang="ts">
	import { ethers } from 'ethers';
	const connectWallet = async () => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		return await signer.getAddress();
	};
</script>

{#await connectWallet()}
	<p>Loading...</p>
{:then account}
	<p>Connected: {account}</p>
{:catch error}
	<button class="hover:opacity-75" on:click={connectWallet}>Connect Wallet</button>
{/await}
