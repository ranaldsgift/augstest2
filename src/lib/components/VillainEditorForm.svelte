<script lang="ts">
    import { EnumHelper } from "$lib/helpers/EnumHelper";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { VillainTemplates } from "$lib/interfaces/templates/VillainTemplates";
    import { Accordion, AccordionItem, popup, RadioGroup, RadioItem, SlideToggle, Tab, TabGroup } from "@skeletonlabs/skeleton";
    import { writable, type Writable } from "svelte/store";
    import CompetitiveVillainEditor from "./CompetitiveVillainEditor.svelte";
    import CooperativeVillainEditor from "./CooperativeVillainEditor.svelte";
    import { Villain } from "$lib/entities/Villain";
    import ComicButton from "./ComicButton.svelte";
    import { CooperativeVillain } from "$lib/entities/CooperativeVillain";
    import { CompetitiveVillain } from "$lib/entities/CompetitiveVillain";
    import PageButtonContainer from "./PageButtonContainer.svelte";
    import { page } from "$app/stores";
    import { ToastHelper } from "$lib/helpers/ToastHelper";
    import { FormHelper } from "$lib/helpers/FormHelper";
    import { applyAction, deserialize } from "$app/forms";
    import { DataHelper } from "$lib/helpers/DataHelper";
    import { goto } from "$app/navigation";
    import { VillainCreateStore } from "$lib/stores/PageStores";
    import PigeonPeteSays from "./PigeonPeteSays.svelte";
    import { onMount } from "svelte";


    export let villain: Villain = new Villain();
    $: villainTheme = villain.theme ?? ThemeTemplatesEnum.TMNT;
    $: template = VillainTemplates[villainTheme];
    villain.serializedSavedEntity = DataHelper.serialize(villain);
    
    const themeSelection: Writable<string> = writable(villain.theme ?? ThemeTemplatesEnum.TMNT);
    themeSelection.subscribe(value => { 
        const theme = value as ThemeTemplatesEnum;

        if (villain.theme != theme) {
            villain.theme = theme;
            villain = villain;
        }
    });

    let villainTabs: number = 0;
    let coopVillain: CooperativeVillain | null;
    let compVillain: CompetitiveVillain | null;
    let useCoopVillain: boolean = villain.cooperative ? true : false;
    let useCompVillain: boolean = villain.competitive ? true : false;
    let useAwakening: boolean = !villain.competitive?.attributes?.awakening || villain.competitive?.attributes?.awakening === 0 ? false : true;
    let lastAwakening: number = villain.competitive?.attributes?.awakening ?? 1;
    let abilityCardScale = 1.0;
    let sheetScale = 1.0;

    onMount(async () => {
        updateScales();
    });

    const updateScales = () => {
        sheetScale =  window.innerWidth < 300 ? 0.35 : window.innerWidth < 350 ? 0.4 : window.innerWidth < 375 ? 0.45 : window.innerWidth < 550 ? 0.5 : window.innerWidth < 800 ? 0.75 : 1.0;
        abilityCardScale = window.innerWidth < 450 ? 0.4 : window.innerWidth < 800 ? 0.5 : window.innerWidth < 1400 ? 0.7 : 1.0;
    }

    function handleAwakeningToggle(e: Event): void {
        if (!villain.competitive || !villain.competitive.attributes)
            return;

        if (useAwakening) {
            villain.competitive.attributes.awakening = 1;
            lastAwakening = 1;
        }
        else {
            lastAwakening = villain.competitive.attributes.awakening;
            if (lastAwakening === 0)
                lastAwakening = 1;
            villain.competitive.attributes.awakening = 0;
        }
    }

    function handleCooperativeToggle(e: Event): void {
        if (useCoopVillain) {
            if (!coopVillain) {
                coopVillain = new CooperativeVillain();
            }
            villain.cooperative = coopVillain;
        }
        else {
            coopVillain = villain.cooperative;
            villain.cooperative = null;
        }
    }

    function handleCompetitiveToggle(e: Event): void {
        if (useCompVillain) {
            if (!compVillain) {
                compVillain = new CompetitiveVillain();
            }
            villain.competitive = compVillain;
        }
        else {
            compVillain = villain.competitive;
            villain.competitive = null;
        }
    }
    
    async function handleSave() {
        if (await save()) {
            ToastHelper.create('Saved!');
        }
    }

    async function save() {
        const response = await fetch('/api/villain?/save', {
            method: 'POST',
            body: FormHelper.serializeFormData(villain)
        });

        const result = deserialize(await response.text());

        if (result.type === 'error' || result.type === 'redirect') {
            await applyAction(result);
            return false;
        }

        // TODO: Add this line below when Villain cache implemented
        //Villains.invalidateAll();
        const savedVillain = DataHelper.deserialize(Villain, result.data?.villain);

        if (!villain.id && savedVillain?.id) {
            await goto(`/homebrew/villains/${savedVillain.id}`);
            const newHero = new Villain();
            newHero.user = villain.user;
            VillainCreateStore.set(newHero);
            return true;
        }
            
        villain = savedVillain;
        villain.serializedSavedEntity = DataHelper.serialize(villain);
        return true;
    }

    async function handleRestore() {
        villain.isDeleted = false;
        await save();
        ToastHelper.create('Restored!');
    }

    async function handleDelete() {
        villain.isDeleted = true;
        await save();
        ToastHelper.create('Deleted!');
    }
</script>

<style>
    .villain-form-container {
        bottom: 0;
        z-index: 10;
        position: fixed;
        max-height: 48px;
        transition: max-height 1s;
    }
    .villain-form-container:hover {
        max-height: 1000px;
        transition: max-height 2s;
    }
</style>

<svelte:window on:resize={updateScales} />

<div class="villain-editor-form grid gap-5 items-center justify-center justify-items-center" >  
    <PageButtonContainer>
        {#if villain.isValid() && villain.isDirty() && $page.data.session && villain.user.userName.length > 0}
            <ComicButton text="Save" icon="material-symbols:save" callback={handleSave}></ComicButton>
        {/if}
        {#if villain.id}
            {#if villain.isDeleted}
            <ComicButton icon="material-symbols:restore-from-trash" callback={handleRestore}></ComicButton>
            {:else}
            <ComicButton icon="material-symbols:delete" callback={handleDelete}></ComicButton>
            {/if}
        {/if}
    </PageButtonContainer>
    <div>
        <header class="comic-header">
            <h1>Edit Your Villain</h1>
        </header>
        <div class="comic-body grid gap-5 justify-center justify-items-center">
            <div class="comic-form flex flex-wrap gap-5">
                <label>
                    <h1>Theme</h1>
                    <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                        {#each EnumHelper.getKeys(ThemeTemplatesEnum) as theme}
                            <RadioItem bind:group={$themeSelection} name={`radio-${theme}`} value={theme}>{theme}</RadioItem>
                        {/each}
                    </RadioGroup>
                    <select class="unstyled" name="theme" bind:value={villain.theme} hidden>
                        {#each EnumHelper.getKeys(ThemeTemplatesEnum) as theme}
                            <option value={theme}>{theme}</option>
                        {/each}
                    </select>
                </label>
                <label class="comic-label">
                    <h1>Sheet Background Color</h1>
                    <input type="color" name="sheetBackgroundColor" bind:value={villain.backgroundColor}>
                </label>
                <SlideToggle active="bg-primary-500" border="border-white border-2" name="Cooperative Villain Sheet Toggle" bind:checked={useCoopVillain} on:change={handleCooperativeToggle}>Cooperative</SlideToggle>
                <SlideToggle active="bg-primary-500" border="border-white border-2" name="Competitive Villain Sheet Toggle" bind:checked={useCompVillain} on:change={handleCompetitiveToggle}>Competitive</SlideToggle>
                {#if useCompVillain}                
                <SlideToggle active="bg-primary-500" border="border-white border-2" name="Cooperative Villain Sheet Toggle" bind:checked={useAwakening} on:change={handleAwakeningToggle}>Awakening</SlideToggle>
                {/if}
            </div>
            <div class="flex gap-5">
                {#if villain.cooperative}
                <div class="flex flex-wrap">
                    <CooperativeVillainEditor bind:villain={villain} scale={sheetScale}></CooperativeVillainEditor>
                    <div></div>
                </div>
                {/if}
                {#if villain.competitive}
                <div class="flex flex-wrap">
                    <CompetitiveVillainEditor bind:villain={villain} scale={sheetScale}></CompetitiveVillainEditor>
                    <div></div>
                </div>
                {/if}
            </div>
            <div>
                {#if !$page.data.session || !villain.user}
                    <PigeonPeteSays>
                        <p>You must be logged in to save a Villain!</p>
                    </PigeonPeteSays>
                {:else if !villain.user.userName || villain.user.userName.length === 0}
                    <PigeonPeteSays>
                        <p>Please <a href={`/user/${villain.user.id}/edit`}>edit</a> your profile before creating a Villain!</p>
                    </PigeonPeteSays>
                {:else if !villain.isValid()}
                    <PigeonPeteSays>
                        <p>To save your Villain, please complete or fix the following fields:</p>
                        <p class="text-warning-700-200-token unstyled">{@html villain.validityErrors()}</p>
                    </PigeonPeteSays>
                {:else if villain.id && villain.isDirty()}        
                    <PigeonPeteSays>
                        <p>You have unsaved changes! Don't forget to save!</p>
                        <p class="text-warning-700-200-token unstyled">{villain.validityErrors()}</p>
                    </PigeonPeteSays>
                {/if}
            </div>
            <div class="grid items-center justify-center gap-5 villain-form-container variant-glass-primary border-t-2 border-x-2 border-black rounded-t-lg z-[51]">        
                <TabGroup     
                        class="!overflow-visible max-w-5xl"       
                        justify="justify-center"
                        active="variant-filled-primary rounded-t-lg"
                        hover="hover:variant-soft-primary"
                        flex="flex-1"
                        regionPanel="px-5 pb-5"
                        rounded=""
                        >
                    <Tab bind:group={villainTabs} name="Notes" value={0}>
                        <svelte:fragment slot="lead"><iconify-icon icon="material-symbols:edit-note-sharp"></iconify-icon></svelte:fragment>
                    </Tab>
                    <Tab bind:group={villainTabs} name="Fonts" value={1}>
                        <svelte:fragment slot="lead"><iconify-icon icon="material-symbols:text-fields"></iconify-icon></svelte:fragment>
                    </Tab>
        
                    <svelte:fragment slot="panel">
                        {#if villainTabs === 0}
                        <div class="general-fields-container md:min-w-[600px]">
                            <label class="w-full comic-label">
                                <span>Villain Notes</span>
                                <textarea class="unstyled" name="description" rows="5" bind:value={villain.description} placeholder="Enter a description of your Villain here. Include details about any special mechanics related to your Villain. Feel free to leave details about the evolution of your Villain after playtesting and any other designer notes you may have. It's always interesting to learn about the designer's process and how the character came to be."></textarea>
                            </label>
                        </div>
                        {:else if villainTabs === 1}
                        <div class="font-fields-container grid gap-5 grid-cols-2">
                            <label class="comic-label">
                                <span>Name</span>
                                <input class="unstyled" type="number" min="0" step="1" name="fontSizeVillainName" bind:value={villain.fontSizeVillainName} placeholder={template.name.fontSize.toString()}>
                            </label>
                            <label class="comic-label">
                                <span>Keywords</span>
                                <input class="unstyled" type="number" min="0" step="1" name="fontSizeKeywords" bind:value={villain.fontSizeKeywords} placeholder={template.keywords.fontSize.toString()}>
                            </label>
                            {#if villain.competitive}
                            <label class="comic-label">
                                <span>Competitive Ability Name</span>
                                <input class="unstyled" type="number" min="0" step="1" name="Competitive Villain Ability Name Font Size" bind:value={villain.competitive.fontSizeAbilityName} placeholder={template.competitive.ability_name.fontSize.toString()}>
                            </label>
                            <label class="comic-label">
                                <span>Competitive Ability Effect</span>
                                <input class="unstyled" type="number" min="0" step="1" name="Competitive Villain Ability Effect Font Size" bind:value={villain.competitive.fontSizeAbilityEffect} placeholder={template.competitive.ability_effect.fontSize.toString()}>
                            </label>
                            {/if}
                            {#if villain.cooperative}
                            <label class="comic-label">
                                <span>Cooperative Ability Name</span>
                                <input class="unstyled" type="number" min="0" step="1" name="Cooperative Villain Ability Name Font Size" bind:value={villain.cooperative.fontSizeAbilityName} placeholder={template.cooperative.ability_name.fontSize.toString()}>
                            </label>
                            <label class="comic-label">
                                <span>Cooperative Ability Effect</span>
                                <input class="unstyled" type="number" min="0" step="1" name="Cooperative Villain Ability Effect Font Size" bind:value={villain.cooperative.fontSizeAbilityEffect} placeholder={template.cooperative.ability_effect.fontSize.toString()}>
                            </label>
                            {/if}
                        </div>
                        {/if}
                    </svelte:fragment>
                </TabGroup>
            </div>    
        </div>
    </div>
    
</div>