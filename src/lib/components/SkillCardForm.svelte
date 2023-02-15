<script lang="ts">
    import type { SkillCard } from '$lib/entities/SkillCard';
    import { loadData } from '$lib/stores/SkillCardsStore';
	import { modalStore, ProgressRadial } from '@skeletonlabs/skeleton';
    import ComicButton from './ComicButton.svelte';
    import SkillCardEditor from './SkillCardEditor.svelte';

	export let parent: any;
	export let userId: string;
	export let skillCards: SkillCard[] = [];

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(skillCards);
		modalStore.close();
	}

	const skillcardStore = loadData(userId);

	function handleToggleSelected(skillCard: SkillCard, event: any) {
		if(skillCards.includes(skillCard)) {
			skillCards = skillCards.filter(sc => sc.id !== skillCard.id);
			event.currentTarget.classList.remove('active');
		} else {
			skillCards.push(skillCard);
			event.currentTarget.classList.add('active');
		}
	}
</script>

<style>
	button.active {
		box-shadow: 0 0 0px 4px rgba(var(--color-secondary-500));
		border-radius: 5px;
	}
	button:not(.active) {
		opacity: 0.5;
	}
</style>


<div class="space-y-4">
	<form class="grid">		
		<header class="comic-header">
			<h1>Select Skill Cards</h1>
		</header>
		{#await $skillcardStore}
			<div style:height="40px" style:width="40px"><ProgressRadial></ProgressRadial></div>
		{:then data}
		<div class="comic-body flex flex-wrap gap-5 justify-center mb-2">		
			{#each data as skillCard, index}
			<button class="{skillCards.includes(skillCard) ? 'active' : ''}" on:click|preventDefault={event => handleToggleSelected(skillCard, event)}>			
				<iconify-icon class="context-button absolute" icon="material-symbols:check"></iconify-icon>
				<div class="read-only">
					<SkillCardEditor skillCard={skillCard} scale={0.3}></SkillCardEditor>
				</div>
			</button>
			{/each}
		</div>
		<footer class="modal-footer {parent.regionFooter}">
			<ComicButton text="Cancel" callback={parent.onClose}></ComicButton>
			<ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
		</footer>
		{/await}
	</form>
</div>