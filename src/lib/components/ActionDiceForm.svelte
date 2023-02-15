<script lang="ts">
	import { DiceIconsEnum } from '$lib/enums/Enums';
    import { EnumHelper } from '$lib/helpers/EnumHelper';
    import type { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
	import { modalStore, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { writable, type Writable } from 'svelte/store';
    import ActionDiceIcon from './ActionDiceIcon.svelte';
    import ComicButton from './ComicButton.svelte';
	export let parent: any;

	export let theme: ThemeTemplatesEnum;
	export let icon: DiceIconsEnum = DiceIconsEnum.Move;
	
	const actionDice: Writable<string> = writable(icon);
	const diceIconList = EnumHelper.getKeys(DiceIconsEnum);

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response($actionDice);
		modalStore.close();
	}
</script>

<style>
	:global(.radio-group) {
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		justify-content: center;
	}
</style>

<div class="modal-example-form space-y-4">
	<RadioGroup active="variant-filled-primary" regionList="border border-surface-500 p-4 rounded-container-token grid" class="grid">
		{#each diceIconList as diceIcon}
			<RadioItem bind:group={$actionDice} name={`radio-${diceIcon}`} value={diceIcon}>
				<ActionDiceIcon {theme} icon={DiceIconsEnum[diceIcon]}></ActionDiceIcon>
			</RadioItem>
		{/each}
	</RadioGroup>
	<footer class="modal-footer {parent.regionFooter}">
        <ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
    </footer>
</div>