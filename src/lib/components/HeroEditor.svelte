<script lang="ts">
    import { applyAction, deserialize, enhance } from "$app/forms";
    import { modalStore, RadioGroup, RadioItem, tooltip, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
    import ComicButton from "./ComicButton.svelte";
    import { EnumHelper } from "$lib/helpers/EnumHelper";
    import { writable, type Writable } from "svelte/store";
    import PigeonPeteSays from "./PigeonPeteSays.svelte";
    import HeroEditorSheet from "./HeroEditorSheet.svelte";
    import { Hero } from "$lib/entities/Hero";
    import { FormHelper } from "$lib/helpers/FormHelper";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { ThemeTemplates } from "$lib/interfaces/templates/ThemeTemplates";
    import { goto } from "$app/navigation";
    import { DataHelper } from "$lib/helpers/DataHelper";
    import { ToastHelper } from "$lib/helpers/ToastHelper";
    import { page } from "$app/stores";
    import SkillCardEditor from "./SkillCardEditor.svelte";
    import { SkillCard } from "$lib/entities/SkillCard";
    import SkillCardForm from "./SkillCardForm.svelte";
    import { fade, fly, slide } from 'svelte/transition'
	import { quintOut } from 'svelte/easing';
    import { SkillCardTemplates } from "$lib/interfaces/templates/SkillCardTemplate";
    import PageButtonContainer from "./PageButtonContainer.svelte";
    import { onMount } from "svelte";
    import { Heroes, SkillCards } from "$lib/stores/DataStores";
    import { HeroCreateStore } from "$lib/stores/PageStores";

    export let hero: Hero = new Hero();
    const heroTheme = hero.theme ?? ThemeTemplatesEnum.TMNT;
    export let template = ThemeTemplates[heroTheme].heroSheet;
    hero.serializedSavedEntity = DataHelper.serialize(hero);

    let skillCardScale = 1.0;
    let sheetScale = 1.0;

    onMount(async () => {
        updateScales();
    });

    const updateScales = () => {
        sheetScale =  window.innerWidth < 300 ? 0.35 : window.innerWidth < 350 ? 0.4 : window.innerWidth < 375 ? 0.45 : window.innerWidth < 550 ? 0.5 : window.innerWidth < 800 ? 0.75 : 1.0;
        skillCardScale = window.innerWidth < 450 ? 0.4 : window.innerWidth < 800 ? 0.5 : window.innerWidth < 1400 ? 0.7 : 1.0;
    }
    
    const themeSelection: Writable<string> = writable(heroTheme);
    themeSelection.subscribe(value => { 
        const theme = value as ThemeTemplatesEnum;

        if (hero.theme != theme) {
            hero.theme = theme;
            template = ThemeTemplates[theme].heroSheet;
        }
    });

    async function handleSave() {
        if (await saveHero()) {
            ToastHelper.create('Saved!');
        }
    }

    async function saveHero() {
        const response = await fetch('/api/hero?/save', {
            method: 'POST',
            body: FormHelper.serializeFormData(hero)
        });

        const result = deserialize(await response.text());

        if (result.type === 'error' || result.type === 'redirect') {
            await applyAction(result);
            return false;
        }

        Heroes.invalidateAll();
        SkillCards.invalidateAll();
        const savedHero = DataHelper.deserialize(Hero, result.data?.hero);

        if (!hero.id && savedHero?.id) {
            await goto(`/homebrew/heroes/${savedHero.id}`);
            const newHero = new Hero();
            newHero.user = hero.user;
            HeroCreateStore.set(newHero);
            return true;
        }
            
        hero = savedHero;
        hero.serializedSavedEntity = DataHelper.serialize(hero);
        return true;
    }

    async function handleRestoreHero() {
        hero.isDeleted = false;
        await saveHero();
        ToastHelper.create('Restored!');
    }

    async function handleDeleteHero() {
        hero.isDeleted = true;
        await saveHero();
        ToastHelper.create('Deleted!');
    }

    function handleAddSkillCard() {
        if (!hero.skillCards) {
            hero.skillCards = [];
        }

        const skillCard = new SkillCard(!hero.user ? undefined : hero.user.id);
        hero.skillCards.push(skillCard);
        hero = hero;
    }

    function handleRemoveSkillCard(index: number) {
        hero.skillCards.splice(index, 1);
        hero = hero;
    }


    function handleSkillCardSelection() {
        const c: ModalComponent = { ref: SkillCardForm, props: { skillCards: hero.skillCards, userId: hero.user.id } };
        const d: ModalSettings = {
            type: 'component',
            component: c,
            modalClasses: '!max-w-[1200px]',
            response: (skillCards: SkillCard[]) => {
                if (!skillCards)
                    return;
                
                hero.skillCards = skillCards;
                hero = hero;
            }
        };
        modalStore.trigger(d);
    }
</script>

<style>
    :global(.positioned-container:hover .add-ability-button) {
        display: flex;
        justify-content: center;
    }
    label input {
        width: 100%;
    }
    @media (max-width: 1250px) {
        .hero-editor {
            grid-template-columns: 1fr;
        }
    }
    @media (max-width: 800px) {
        .hero-form-container>div {
            display: grid !important;
        }
    }
    :global(.ability-container *), :global(.hero-attribute-container *), :global(.hero-action-dice-container *) {
        z-index: 3;
    }
    .theme-fields-container label {
        pointer-events: none;
    }
    .theme-fields-container input {
        pointer-events: all;
    }
    .comic-body>div {
        display: flex;
        gap: 1rem;
        align-items: flex-end;
    }
    .comic-body>div>:global(span) {
        flex: 1 100%;
    }
    .hero-editor-container>div {
        max-width: 1600px;
    }
</style>

<svelte:window on:resize={updateScales} />

<div class="grid gap-5 hero-editor-container justify-center">
    <PageButtonContainer>
        {#if hero.isValid() && hero.isDirty() && $page.data.session && hero.user.userName.length > 0}
            <ComicButton text="Save" icon="material-symbols:save" callback={handleSave}></ComicButton>
        {:else}
            <div class="disabled-button">
                <ComicButton text="Save" icon="material-symbols:save"></ComicButton>
            </div>
        {/if}
        {#if hero.id}
            {#if hero.isDeleted}
            <ComicButton icon="material-symbols:restore-from-trash" callback={handleRestoreHero}></ComicButton>
            {:else}
            <ComicButton icon="material-symbols:delete" callback={handleDeleteHero}></ComicButton>
            {/if}
        {/if}
    </PageButtonContainer>
    <div class="hero-editor m-auto flex gap-5 flex-wrap pl-5 pr-5 justify-center">
        <div class="grid gap-5 justify-items-center">
            <HeroEditorSheet bind:hero={hero} bind:template={template} scale={sheetScale}></HeroEditorSheet>
            {#if !$page.data.session || !hero.user}
                <PigeonPeteSays>
                    <p>You must be logged in to save a Hero!</p>
                </PigeonPeteSays>
            {:else if !hero.user.userName || hero.user.userName.length === 0}
                <PigeonPeteSays>
                    <p>Please <a href={`/user/${hero.user.id}/edit`}>edit</a> your profile before creating a Hero!</p>
                </PigeonPeteSays>
            {:else if !hero.isValid()}
                <PigeonPeteSays>
                    <p>To save your Hero, please complete or fix the following fields:</p>
                    <p class="text-warning-700-200-token unstyled">{hero.validityErrors()}</p>
                </PigeonPeteSays>
            {:else if hero.id && hero.isDirty()}        
                <PigeonPeteSays>
                    <p>You have unsaved changes! Don't forget to save!</p>
                    <p class="text-warning-700-200-token unstyled">{hero.validityErrors()}</p>
                </PigeonPeteSays>
            {/if}
        </div>
        <div class="comic-form grid flex-1">
            <header>
                <h1>Edit your Hero</h1>
            </header>
            <div class="comic-body grid gap-5 hero-form-container">
                <div>
                    <label class="">
                        <h1>Theme</h1>
                        <RadioGroup active="variant-filled-primary" hover="hover:variant-soft-primary">
                            {#each EnumHelper.getKeys(ThemeTemplatesEnum) as theme}
                                <RadioItem bind:group={$themeSelection} name={`radio-${theme}`} value={theme}>{theme}</RadioItem>
                            {/each}
                        </RadioGroup>
                        <select class="unstyled" name="theme" bind:value={hero.theme} hidden>
                            {#each EnumHelper.getKeys(ThemeTemplatesEnum) as theme}
                                <option value={theme}>{theme}</option>
                            {/each}
                        </select>
                    </label>
                </div>
                <div class="theme-fields-container">
                    <label>
                        <h1>Sheet Background Color</h1>
                        <input class="unstyled" type="color" name="sheetBackgroundColor" bind:value={hero.sheetBackgroundColor}>
                    </label>
                    <label>
                        <span>Dice Background Color</span>
                        <input class="unstyled" type="color" name="actionDice.backgroundColor" bind:value={hero.actionDice.backgroundColor}>
                    </label>
                    <label>
                        <span>Dice Icon Color</span>
                        <input class="unstyled" type="color" name="actionDice.iconColor" bind:value={hero.actionDice.iconColor}>
                    </label>
                </div>
                <div class="general-fields-container">
                    {#if false}
                    <!-- TODO: Allow users to override the hero sheet image with their own
                    This would allow users to use their own themes and styles by loading the image specified here
                    instead of generating the hero sheet from the data provided -->
                    <label use:tooltip={{ content: 'Use this to display a static image for this Hero Sheet instead of one generated from the saved Hero data.'}}>
                        <span>Sheet Override</span>
                        <input type="text" name="originalImage" bind:value={hero.originalImage}>
                    </label>
                    {/if}
                    <label class="w-full">
                        <span>Hero Description</span>
                        <textarea class="unstyled" name="description" rows="4" bind:value={hero.description} placeholder="Enter a description of your Hero here. Include details about any special mechanics related to your Hero. Feel free to leave details about the evolution of your Hero after playtesting and any other designer notes you may have. It's always interesting to learn about the designer's process and how the character came to be."></textarea>
                    </label>
                </div>
                <div>
                    <label>
                        <span>Hero Image</span>
                        <input class="unstyled" type="text" name="heroImage.url" bind:value={hero.heroImage.url}>
                    </label>
                    <label>
                        <span>Icon Image</span>
                        <input class="unstyled" type="text" name="heroIcon.url" bind:value={hero.iconImage.url}>
                    </label>
                </div>
                <div class="image-fields-container">
                    <label use:tooltip={{ content: 'Use scrollwheel up/down while hovering to scale your Hero image. Hold shift for larger scaling.' }}>
                        <span>Hero Image Scale</span>
                        <input class="unstyled" type="number" name="heroImage.scale" bind:value={hero.heroImage.scale}>
                    </label>
                    <label use:tooltip={{ content: 'Drag your Hero image to position it!' }}>
                        <span>Hero Image Position Left</span>
                        <input class="unstyled" type="number" name="heroImage.positionLeft" bind:value={hero.heroImage.positionLeft}>
                    </label>
                    <label use:tooltip={{ content: 'Drag your Hero image to position it!' }}>
                        <span>Hero Image Position Top</span>
                        <input class="unstyled" type="number" name="heroImage.positionTop" bind:value={hero.heroImage.positionTop}>
                    </label>
                </div>
                <div class="font-fields-container">
                    <label>
                        <span>Hero Name<br/>Font Size</span>
                        <input class="unstyled" type="number" min="0" step="1" name="fontSizeHeroName" bind:value={hero.fontSizeHeroName} placeholder={template.name.fontSize.toString()}>
                    </label>
                    <label>
                        <span>Keywords<br/>Font Size</span>
                        <input class="unstyled" type="number" min="0" step="1" name="fontSizeKeywords" bind:value={hero.fontSizeKeywords} placeholder={template.keywords.fontSize.toString()}>
                    </label>
                    <label>
                        <span>Ability Name<br/>Font Size</span>
                        <input class="unstyled" type="number" min="0" step="1" name="fontSizeAbilityName" bind:value={hero.fontSizeAbilityName} placeholder={template.ability_name.fontSize.toString()}>
                    </label>
                    <label>
                        <span>Ability Effect<br/>Font Size</span>
                        <input class="unstyled" type="number" min="0" step="1" name="fontSizeAbilityEffect" bind:value={hero.fontSizeAbilityEffect} placeholder={template.ability_effect.fontSize.toString()}>
                    </label>
                </div>
            </div>            
        </div>
    </div>
    <div class="p-0 pl-5 pr-5">
        <header class="comic-header">
            <h1>Skill Cards</h1>
        </header>
        <div class="comic-body flex gap-5 items-center justify-center flex-wrap">
            {#if hero.skillCards}
            {#each hero.skillCards as skillCard, index}
                <div class="relative" in:slide="{{ delay: 0, duration: 300, easing: quintOut }}">
                    <iconify-icon class="absolute z-10 cursor-pointer mr-1 mt-1 hidden context-button top-0 right-0 p-1" style:font-size="1.2rem" icon="material-symbols:delete" on:click={() => handleRemoveSkillCard(index)} on:keydown={() =>  handleRemoveSkillCard(index)}></iconify-icon>
                    <SkillCardEditor scale={skillCardScale} backgroundColor={hero.sheetBackgroundColor} bind:skillCard={skillCard} heroName={hero.name} theme={hero.theme} template={SkillCardTemplates[hero.theme]}></SkillCardEditor>
                </div>
            {/each}
            {/if}
            <div class="flex-col">
                {#if $page.data.session}
                <div class="grid text-center">
                    <span>Existing </span>
                    <button title="Select From Existing Skill Cards" on:click|preventDefault={handleSkillCardSelection} style:width="{100}px" style:height="{100}px"><iconify-icon icon="mdi:ellipsis-horizontal-circle" style:font-size="6rem"></iconify-icon></button>
                </div>
                {/if}
                <div class="grid text-center">
                    <button title="Add A New Skill Card" on:click|preventDefault={handleAddSkillCard} style:width="{100}px" style:height="{100}px"><iconify-icon icon="material-symbols:add-circle-rounded" style:font-size="6rem"></iconify-icon></button>
                    <span>New</span>
                </div>
            </div>
            
        </div>
    </div>
</div>