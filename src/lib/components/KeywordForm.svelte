<script lang="ts">
	import { modalStore, ProgressRadial } from '@skeletonlabs/skeleton';
    import ComicButton from './ComicButton.svelte';
	import InputChip from '@skeletonlabs/skeleton/components/InputChip/InputChip.svelte'
    import { Keywords } from '$lib/stores/DataStores';

	export let parent: any;
	export let keywords: string[] = [];

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(keywords);
		modalStore.close();
	}

	keywords = keywords.map(k => k.toLowerCase());

	const keywordsStore = Keywords.loadData();
</script>

<style>
	:global(label.input-chip form) {flex: 1 100%;}
	button {
		order: 2;
	}
	button.checked {
		order: 1;
	}
</style>


<div class="max-w-3xl space-y-4">
	<form class="grid">		
		<header class="comic-header">
			<h1>Add Keywords</h1>
		</header>
	<div class="comic-body grid gap-2">
		<InputChip name="keywords" placeholder="Add keyword..." bind:value={keywords} allowDuplicates={false}></InputChip>
	{#await keywordsStore}
		<div style:height="40px" style:width="40px"><ProgressRadial></ProgressRadial></div>
	{:then data}
		<p>Choose from existing Keywords:</p>
		<div class="flex flex-wrap gap-2 items-stretch">
		{#each data.items as keyword, index}
		<button class="{keywords.includes(keyword) ? 'checked' : ''}" on:click={() => {
			if(!keywords.includes(keyword)) {
				keywords.push(keyword)
				keywords = keywords;
			} else {
				keywords = keywords.filter(k => k !== keyword)
			}
		}}>
		<span class="chip variant-filled-primary capitalize h-[40px] {keywords.includes(keyword) ? 'chip-active' : ''}">
			{#if keywords.includes(keyword)}
			<span class="chip-check grid justify-center"><iconify-icon icon="material-symbols:check"></iconify-icon></span>
			{/if}
			<span class="p-[2px]">{keyword}</span>
		</span>
		</button>
		{/each}
		</div>
	<footer class="modal-footer mt-5 {parent.regionFooter}">
		<ComicButton text="Cancel" callback={parent.onClose}></ComicButton>
		<ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
	</footer>
	{/await}
	</div>
	</form>
</div>