<script lang="ts">
    import { SkillCard } from '$lib/entities/SkillCard';
    import { SkillCards } from '$lib/stores/DataStores';
	import { modalStore, ProgressRadial } from '@skeletonlabs/skeleton';
    import { plainToInstance } from 'class-transformer';
    import ComicButton from './ComicButton.svelte';
    import SkillCardEditor from './SkillCardEditor.svelte';

	export let parent: any;
	export let userId: string;
	export let skillCards: SkillCard[] = [];

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(skillCards);
		modalStore.close();
	}

	let skills = SkillCards.loadData(`userId=${userId}&heroId=null`);

	function handleToggleSelected(skillCard: SkillCard, event: any) {
		if (!skillCards) {
			skillCards = [];
		}

		if(skillCards && skillCards.some(sc => sc.id === skillCard.id)) {
			skillCards = skillCards.filter(sc => sc.id !== skillCard.id);
			event.currentTarget.classList.remove('active');
		} else {
			let instance = plainToInstance(SkillCard, skillCard);
			instance.hero = undefined;
			skillCards.push(instance);
			event.currentTarget.classList.add('active');
		}
	}


    function handleReloadData(): any {
		skills = SkillCards.reload(`userId=${userId}&heroId=null`);
    }
</script>

<style>
	button.active {
		box-shadow: 0 0 0px 4px rgba(var(--color-secondary-500));
		border-radius: 5px;
	}
	.comic-body button:not(.active) {
		opacity: 0.5;
	}
</style>


<div class="space-y-4">
	<form class="grid">		
		<button class="context-button absolute right-10 top-3" on:click|preventDefault={handleReloadData}>
			<iconify-icon icon="material-symbols:refresh"></iconify-icon>
		</button>
		<header class="comic-header">
			<h1>Select Skill Cards</h1>
		</header>
		{#await skills}
			<div style:height="40px" style:width="40px"><ProgressRadial></ProgressRadial></div>
		{:then data}
		<div class="comic-body flex flex-wrap gap-5 justify-center mb-2">
			{#each data.items as skillCard, index}
			<button class="{skillCards && skillCards.some(sc => sc.id === skillCard.id) ? 'active' : ''}" on:click|preventDefault={event => handleToggleSelected(skillCard, event)}>			
				<iconify-icon class="context-button absolute" icon="material-symbols:check"></iconify-icon>
				<div class="read-only">
					<SkillCardEditor skillCard={skillCard} scale={0.3}></SkillCardEditor>
				</div>
			</button>
			{/each}
			<footer class="modal-footer {parent.regionFooter}">
				<ComicButton text="Cancel" callback={parent.onClose}></ComicButton>
				<ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
			</footer>
		</div>
		{/await}
	</form>
</div>