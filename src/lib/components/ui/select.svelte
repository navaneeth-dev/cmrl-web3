<script lang="ts">
	export let values: string[];
</script>

<select name="" id="" class="px-5 py-4 ring-1 ring-neutral-300 rounded-full text-ellipsis max-w-xs">
	{#each values as value}
		<option {value}>{value}</option>
	{/each}
</select>
