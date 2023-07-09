<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';
	import { cva, type VariantProps } from 'class-variance-authority';

	const buttonVariants = cva(
		'text-white rounded-full flex items-center justify-center gap-1 transition-[background-color,box-shadow]',
		{
			variants: {
				variant: {
					primary: 'bg-primary hover:bg-primary-300 active:ring active:ring-primary',
					secondary: 'bg-neutral-800'
				},
				size: {
					small: 'h-[20px] px-1',
					medium: 'h-[45px] px-4'
				}
			}
		}
	);

	interface $$Props extends HTMLButtonAttributes, VariantProps<typeof buttonVariants> {}
	export let variant: $$Props['variant'] = 'primary';
	export let size: $$Props['size'] = 'medium';
</script>

<button {...$$props} class={buttonVariants({ variant, size })}>
	<slot />
</button>
