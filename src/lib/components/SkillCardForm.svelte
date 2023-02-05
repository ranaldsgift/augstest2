<script lang="ts">
    import type { SkillCard } from '$lib/entities/SkillCard';
    import { loadData } from '$lib/stores/SkillCardsStore';
	import { modalStore, ProgressRadial } from '@skeletonlabs/skeleton';
    import ComicButton from './ComicButton.svelte';

	export let parent: any;
	export let userId: string;
	export let skillCards: SkillCard[] = [];

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(skillCards);
		modalStore.close();
	}

	const skillcardStore = loadData(userId);
</script>

<style>
</style>


<div class="modal-example-form space-y-4">
	<form class="grid gap-5">		
		<header class="comic-header">
			<h1>Select Skill Cards</h1>
		</header>
	</form>
	{#await $skillcardStore}
		<div style:height="40px" style:width="40px"><ProgressRadial></ProgressRadial></div>
	{:then data}
		{#each data as skillCard, index}
			<p>{skillCard.name}</p>
		{/each}
	<footer class="modal-footer {parent.regionFooter}">
		<ComicButton text="Cancel" callback={parent.onClose}></ComicButton>
		<ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
	</footer>
	{/await}
</div>