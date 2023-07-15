<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cva, type VariantProps } from 'class-variance-authority';
	import Spinner from '$lib/icons/Spinner.svelte';

	const buttonVariants = cva(
		'text-white rounded-full flex items-center justify-center gap-1 transition-[background-color,box-shadow] disabled:cursor-not-allowed',
		{
			variants: {
				variant: {
					primary: 'bg-primary hover:bg-primary-300',
					secondary: 'bg-neutral-800'
				},
				size: {
					small: 'h-[20px] px-1',
					medium: 'h-[45px] px-4'
				}
			}
		}
	);

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof buttonVariants> {
		loading: boolean;
	}
	export let variant: $$Props['variant'] = 'primary';
	export let size: $$Props['size'] = 'medium';
	export let loading = false;
</script>

<button on:click {...$$props} class={buttonVariants({ variant, size })}>
	{#if loading}
		<Spinner />
	{:else}
		<slot />
	{/if}
</button>
