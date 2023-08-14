<script lang="ts">
	export let values: [string, string][];
	export let name: string;
</script>

<select {name} id="" class="px-5 py-4 ring-1 ring-neutral-300 rounded-full text-ellipsis max-w-xs">
	{#each values as [key, value]}
		<option value={key}>{value}</option>
	{/each}
</select>
