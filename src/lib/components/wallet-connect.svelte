<script lang="ts">
	import { abi } from '$lib/contract';
	import { Contract, ethers } from 'ethers';
	let provider: ethers.BrowserProvider;
	let signer: Awaited<ReturnType<ethers.BrowserProvider['getSigner']>>;

	const connectWallet = async () => {
		provider = new ethers.BrowserProvider(window.ethereum);
		signer = await provider.getSigner();

		const account = await signer.getAddress();
		return account.slice(0, 6) + '...' + account.slice(-4);
	};
</script>

{#await connectWallet()}
	<p>Loading...</p>
{:then account}
	<p
		class="text-ellipsis max-w-xs overflow-hidden whitespace-nowrap px-4 bg-neutral-300 rounded-full"
	>
		{account}
	</p>
{:catch error}
	<button class="hover:opacity-75" on:click={connectWallet}>Connect Wallet</button>
{/await}
