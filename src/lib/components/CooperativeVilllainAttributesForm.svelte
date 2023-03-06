<script lang="ts">
    import type { CooperativeVillainAttributes } from '$lib/entities/CooperativeVillainAttributes';
	import { modalStore } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
    import ComicButton from './ComicButton.svelte';

	export let parent: any;
	export let attributes: CooperativeVillainAttributes;
	export let focus: string;

	let moveInput: HTMLInputElement;
	let hitsInput: HTMLInputElement;
	let blocksInput: HTMLInputElement;
	let lifeInput: HTMLInputElement;

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(attributes);
		modalStore.close();
	}

	onMount(() => {
		switch(focus) {
			case 'move':
				moveInput.focus();
				break;
			case 'hits':
				hitsInput.focus();
				break;
			case 'blocks':
				blocksInput.focus();
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
		<header class="comic-header">
			<h1>Edit Attributes</h1>
		</header>
		<div class="comic-body !flex !flex-row flex-wrap justify-center mb-2">
			<label class="comic-label">
				<span>Move</span>
				<input bind:this={moveInput} type="number" bind:value={attributes.move} step="1" min="0">
			</label>
			<label class="comic-label">
				<span>Attack</span>
				<input bind:this={hitsInput} type="number" bind:value={attributes.hits} step="1" min="0">
			</label>
			<label class="comic-label">
				<span>Defend</span>
				<input bind:this={blocksInput} type="number" bind:value={attributes.blocks} step="1" min="0">
			</label>
			<label class="comic-label">
				<span>Life</span>
				<input bind:this={lifeInput} type="number" bind:value={attributes.life} step="1" min="0">
			</label>
		</div>
		<footer class="modal-footer {parent.regionFooter}">
			<ComicButton text="Cancel" callback={parent.onClose}></ComicButton>
			<ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
		</footer>
	</form>
</div>