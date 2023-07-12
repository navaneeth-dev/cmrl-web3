<script lang="ts">
	import { abi } from '$lib/contract';
	import { Contract, ethers } from 'ethers';
	let provider: ethers.BrowserProvider;
	let signer: Awaited<ReturnType<ethers.BrowserProvider['getSigner']>>;

	const connectWallet = async () => {
		provider = new ethers.BrowserProvider(window.ethereum);
		signer = await provider.getSigner();

		// const tx = await contract.store(200);
		// await tx.wait();

		const account = await signer.getAddress();
		return account.slice(0, 6) + '...' + account.slice(-4);
	};

	const test = async () => {
		const contract = new Contract('0xf8e81D47203A594245E36C48e151709F0C19fBe8', abi, signer);
		const tx2 = await contract.retrieve();
		const data = await tx2.wait();
		console.log(data);
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

<!-- <button on:click={test}>Test</button> -->
