<script lang="ts">
	import { modalStore } from '@skeletonlabs/skeleton';
    import ComicButton from './ComicButton.svelte';
	import InputChip from '@skeletonlabs/skeleton/components/InputChip/InputChip.svelte'
    import { loadData } from '$lib/stores/KeywordsStore';

	export let parent: any;
	export let keywords: string[] = [];

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(keywords);
		modalStore.close();
	}

	const keywordsStore = loadData();
</script>

<style>
	:global(label.input-chip form) {flex: 1 100%;}
</style>


<div class="modal-example-form space-y-4">
	<form class="grid gap-5">		
		<header class="comic-header">
			<h1>Add Keywords</h1>
		</header>
		<InputChip placeholder="Add keyword..." class="h-full" bind:value={keywords} allowDuplicates={false}></InputChip>
	</form>
	{#await $keywordsStore}
		<p>Loading</p>
	{:then data}
		<p>Choose from existing Keywords:</p>
		<div class="flex gap-2 items-stretch">
		{#each data as keyword, index}
		<button on:click={() => {
			if(!keywords.includes(keyword)) {
				keywords.push(keyword)
				keywords = keywords;
			} else {
				keywords = keywords.filter(k => k !== keyword)
			}
		}}>
		<span class="chip chip-primary capitalize {keywords.includes(keyword) ? 'chip-active' : ''}">
			{#if keywords.includes(keyword)}
			<span class="chip-check"><iconify-icon icon="material-symbols:check"></iconify-icon></span>
			{/if}
			<span>{keyword}</span>
		</span>
		</button>
		{/each}
		</div>
	<footer class="modal-footer {parent.regionFooter}">
		<ComicButton text="Cancel" callback={parent.onClose}></ComicButton>
		<ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
	</footer>
	{/await}
</div>