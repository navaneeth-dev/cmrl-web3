<script lang="ts">
	import { ethers } from 'ethers';
	let account: string;

	const connectWallet = async () => {
		const provider = new ethers.BrowserProvider(window.ethereum);
		const signer = await provider.getSigner();
		account = await signer.getAddress();
	};
</script>

{#if !account}
	<button class="hover:opacity-75" on:click={connectWallet}>Connect Wallet</button>
{:else}
	<p>Connected: {account}</p>
{/if}
