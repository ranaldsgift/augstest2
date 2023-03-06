<script lang="ts">
    import type { CompetitiveVillainAttributes } from '$lib/entities/CompetitiveVillainAttributes';
	import { modalStore, ProgressRadial } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import ComicButton from './ComicButton.svelte';

	export let parent: any;
	export let attributes: CompetitiveVillainAttributes;
	export let focus: string;

	let moveInput: HTMLInputElement;
	let attackInput: HTMLInputElement;
	let defendInput: HTMLInputElement;
	let lifeInput: HTMLInputElement;
	let awakeningInput: HTMLInputElement;

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(attributes);
		modalStore.close();
	}

	onMount(() => {
		switch(focus) {
			case 'move':
				moveInput.focus();
				break;
			case 'attack':
				attackInput.focus();
				break;
			case 'defend':
				defendInput.focus();
				break;
			case 'life':
				lifeInput.focus();
				break;
		}
	});
</script>

<style>
	.comic-label {
		max-width: 105px;
	}
</style>


<div class="space-y-4">
	<form class="grid">		
		<header class="comic-header z-[1]">
			<h1>Edit Attributes</h1>
		</header>
		<div class="comic-body variant-glass-primary">
		<div class="!flex !flex-row flex-wrap justify-center mb-2">
			<label class="comic-label">
				<span>Move</span>
				<input bind:this={moveInput} type="number" bind:value={attributes.move} step="1" min="0">
			</label>
			<label class="comic-label">
				<span>Attack</span>
				<input bind:this={attackInput} type="number" bind:value={attributes.attack} step="1" min="0">
			</label>
			<label class="comic-label">
				<span>Defend</span>
				<input bind:this={defendInput} type="number" bind:value={attributes.defend} step="1" min="0">
			</label>
			<label class="comic-label">
				<span>Life</span>
				<input bind:this={lifeInput} type="number" bind:value={attributes.life} step="1" min="0">
			</label>
			<label class="comic-label">
				<span>Awakening</span>
				<input bind:this={awakeningInput} type="number" bind:value={attributes.awakening} step="1" min="0">
			</label>
		</div>
		<footer class="modal-footer {parent.regionFooter}">
			<ComicButton text="Cancel" callback={parent.onClose}></ComicButton>
			<ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
		</footer>
		</div>
	</form>
</div>