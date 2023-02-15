<script lang="ts">
	import { SkillCardIconsEnum } from '$lib/enums/Enums';
    import { EnumHelper } from '$lib/helpers/EnumHelper';
    import type { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
	import { modalStore, RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import { writable, type Writable } from 'svelte/store';
    import ComicButton from './ComicButton.svelte';
    import SkillCardIcon from './SkillCardIcon.svelte';
	export let parent: any;

	export let theme: ThemeTemplatesEnum;
	export let icon: SkillCardIconsEnum = SkillCardIconsEnum.Move;
	
	const iconStore: Writable<string> = writable(icon);
	const iconList = EnumHelper.getKeys(SkillCardIconsEnum);

	function onFormSubmit(): void {
		if ($modalStore[0].response) $modalStore[0].response($iconStore);
		modalStore.close();
	}

	function removeIcon(): void {
		if ($modalStore[0].response) $modalStore[0].response(null);
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
		{#each iconList as i}
			<RadioItem bind:group={$iconStore} name={`radio-${i}`} value={i}>
				<SkillCardIcon {theme} icon={SkillCardIconsEnum[i]}></SkillCardIcon>
			</RadioItem>
		{/each}
	</RadioGroup>
	<footer class="modal-footer {parent.regionFooter}">
        <ComicButton text="Remove" icon="material-symbols:delete" callback={removeIcon}></ComicButton>
        <ComicButton text="Save" icon="material-symbols:save" callback={onFormSubmit}></ComicButton>
    </footer>
</div>