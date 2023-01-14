<script lang="ts">
	export let parent: any;
	import { modalStore } from '@skeletonlabs/skeleton';
    import ComicButton from './ComicButton.svelte';

	const formData = {
		ability_name: '',
		ability_effect: ''
	};
	
	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response(formData);
		modalStore.close();
	}
</script>

<div class="modal-example-form space-y-4">
	<form class="modal-form border border-surface-500 p-4 space-y-4 rounded-container-token">
		<label>
			<span>Ability Name</span>
			<input type="text" bind:value={formData.ability_name} placeholder="Enter an Ability Name..." />
		</label>
		<label>
			<span>Abillity Effect</span>
			<input type="tel" bind:value={formData.ability_effect} placeholder="Enter an Ability Effect..." />
		</label>
	</form>
	<footer class="modal-footer {parent.regionFooter}">
        <ComicButton text="Cancel" callback={parent.onClose}></ComicButton>
        <ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
    </footer>
</div>