<script lang="ts">
    import { applyAction, deserialize } from "$app/forms";
    import { RadioGroup, RadioItem, tooltip, type ToastSettings } from '@skeletonlabs/skeleton';
    import ComicButton from "./ComicButton.svelte";
    import { EnumHelper } from "$lib/helpers/EnumHelper";
    import { writable, type Writable } from "svelte/store";
    import PigeonPeteSays from "./PigeonPeteSays.svelte";
    import HeroEditorSheet from "./HeroEditorSheet.svelte";
    import { toastStore } from '@skeletonlabs/skeleton';
    import type { Hero } from "$lib/entities/Hero";
    import { FormHelper } from "$lib/helpers/FormHelper";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { ThemeTemplates } from "$lib/interfaces/templates/ThemeTemplates";
    import { goto } from "$app/navigation";
    import { instanceToInstance } from "class-transformer";
    import { DataHelper } from "$lib/helpers/DataHelper";
    import { ToastHelper } from "$lib/helpers/ToastHelper";
    import { page } from "$app/stores";

    const storeTab: Writable<"theme" | "details" | "more"> = writable("theme");

    export let hero: Hero;
    export let template = ThemeTemplates[hero.theme].heroSheet;
    let savedHero = instanceToInstance(hero);
    
    const themeSelection: Writable<string> = writable(hero.theme ?? ThemeTemplatesEnum.TMNT);
    themeSelection.subscribe(value => { 
        var theme = value as ThemeTemplatesEnum;

        if (hero.theme != theme) {
            hero.theme = theme;
            template = ThemeTemplates[theme].heroSheet;
        }
    });

    function isDirty() {
        return DataHelper.serialize(hero) !== DataHelper.serialize(savedHero);
    }

    async function handleSave() {
        const response = await fetch('/api/hero?/save', {
            method: 'POST',
            body: FormHelper.serializeFormData(hero)
        });

        const result = deserialize(await response.text());

        if (result.type === 'error' || result.type === 'redirect') {
            await applyAction(result);
            return;
        }

        ToastHelper.create('Saved!');

        const savedHeroId = result.data?.id;

        if (!hero.id && savedHeroId) {
            goto(`/homebrew/heroes/${savedHeroId}`);
            return;
        }
            
        hero = hero;
        savedHero = instanceToInstance(hero);
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
    .form {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    div[data-tab] {
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    div[data-tab]>div {
        display: flex;
        gap: 1rem;
    }
    div[data-tab]>div {
        display: flex;
    }
    div[data-tab]>div>:global(span) {
        flex: 1 100%;
    }
    .hero-editor {
        max-width: 1566px;  
		grid-template-columns: 700px 1fr;
        gap: 30px;
    }
    @media (max-width: 1250px) {
        .hero-editor {
            grid-template-columns: 1fr;
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
    .grid.gap-5.pt-2 {
        position: fixed;
        top: 80px;
        right: 20px;
        z-index: 100;
    }
    .tab-buttons button {
        flex: 1 100%;
        filter: grayscale(1);
    }
    .tab-buttons button[data-selected='true'] {
        filter: grayscale(0);
    }
    .tab-buttons button h1 {
        margin-left: 0;
    }
</style>

<div class="hero-editor m-auto grid gap-5">
    <div class="grid gap-5">
        <HeroEditorSheet bind:hero={hero} bind:template={template}></HeroEditorSheet>
    </div>
    <div class="form comic-form">
        <div class="tab-buttons flex gap-4">
            <button on:click={() => { $storeTab = "theme" }} data-selected={$storeTab === "theme"}>
            <header>
                <h1>Style</h1>
            </header>
            </button>
            <button on:click={() => { $storeTab = "details" }} data-selected={$storeTab === "details"}>
            <header>
                <h1>Details</h1>
            </header>
            </button>
            <button on:click={() => { $storeTab = "more" }} data-selected={$storeTab === "more"}>
            <header>
                <h1>More</h1>
            </header>
            </button>
        </div>
        {#if $storeTab === "theme"}
        <div data-tab="theme" >
            <div>
                <label>
                    <h1>Theme</h1>
                    <RadioGroup selected={themeSelection}>
                        {#each EnumHelper.getKeys(ThemeTemplatesEnum) as theme}
                            <RadioItem value={theme}>{theme}</RadioItem>
                        {/each}
                    </RadioGroup>
                    <select name="theme" bind:value={hero.theme} hidden>
                        {#each EnumHelper.getKeys(ThemeTemplatesEnum) as theme}
                            <option value={theme}>{theme}</option>
                        {/each}
                    </select>
                </label>
            </div>
            <div class="theme-fields-container">
                <label>
                    <h1>Sheet Color</h1>
                    <input type="color" name="sheetBackgroundColor" bind:value={hero.sheetBackgroundColor}>
                </label>
                <label>
                    <span>Dice Color</span>
                    <input type="color" name="actionDice.backgroundColor" bind:value={hero.actionDice.backgroundColor}>
                </label>
                <label>
                    <span>Dice Icon Color</span>
                    <input type="color" name="actionDice.iconColor" bind:value={hero.actionDice.iconColor}>
                </label>
            </div>
            <div>
                <label>
                    <span>Hero Image</span>
                    <input type="text" name="heroImage.url" bind:value={hero.heroImage.url}>
                </label>
                <label>
                    <span>Icon Image</span>
                    <input type="text" name="heroIcon.url" bind:value={hero.iconImage.url}>
                </label>
            </div>
        </div>
        {:else if $storeTab === "details"}
        <div data-tab="details">
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
                    <textarea name="description" rows="4" bind:value={hero.description} placeholder="Enter a description of your Hero here. Include details about any special mechanics related to your Hero. Feel free to leave details about the evolution of your Hero after playtesting and any other designer notes you may have. It's always interesting to learn about the designer's process and how the character came to be."></textarea>
                </label>
            </div>
        </div>
        {:else if $storeTab === "more"}
        <div data-tab="more">
            <div class="image-fields-container">
                <label use:tooltip={{ content: 'Use scrollwheel up/down while hovering to scale your Hero image. Hold shift for larger scaling.' }}>
                    <span>Image Scale</span>
                    <input type="number" name="heroImage.scale" bind:value={hero.heroImage.scale}>
                </label>
                <label use:tooltip={{ content: 'Drag your Hero image to position it!' }}>
                    <span>Image Left Position</span>
                    <input type="number" name="heroImage.positionLeft" bind:value={hero.heroImage.positionLeft}>
                </label>
                <label use:tooltip={{ content: 'Drag your Hero image to position it!' }}>
                    <span>Hero Top Position</span>
                    <input type="number" name="heroImage.positionTop" bind:value={hero.heroImage.positionTop}>
                </label>
            </div>
            <div class="font-fields-container">
                <label>
                    <span>Hero Name<br/>Font Size</span>
                    <input type="number" min="0" step="1" name="fontSizeHeroName" bind:value={hero.fontSizeHeroName} placeholder={template.name.font_size.toString()}>
                </label>
                <label>
                    <span>Keywords<br/>Font Size</span>
                    <input type="number" min="0" step="1" name="fontSizeKeywords" bind:value={hero.fontSizeKeywords} placeholder={template.traits.font_size.toString()}>
                </label>
                <label>
                    <span>Ability Name<br/>Font Size</span>
                    <input type="number" min="0" step="1" name="fontSizeAbilityName" bind:value={hero.fontSizeAbilityName} placeholder={template.ability_name.font_size.toString()}>
                </label>
                <label>
                    <span>Ability Effect<br/>Font Size</span>
                    <input type="number" min="0" step="1" name="fontSizeAbilityEffect" bind:value={hero.fontSizeAbilityEffect} placeholder={template.ability_effect.font_size.toString()}>
                </label>
            </div>
        </div>
        {/if}
        {#if !$page.data.session}
            <PigeonPeteSays>
                <p>You must be logged in to create a Hero!</p>
            </PigeonPeteSays>
        {:else if !hero.isValid()}
            <PigeonPeteSays>
                <p>To save your Hero, please complete the following fields:</p>
                <p class="text-warning-800 unstyled">{hero.validityErrors()}</p>
            </PigeonPeteSays>
        {:else if hero.id && isDirty()}        
            <PigeonPeteSays>
                <p>You have unsaved changes! Don't forget to save!</p>
                <p class="text-warning-800 unstyled">{hero.validityErrors()}</p>
            </PigeonPeteSays>
        {/if}
        <div>
            <div class="grid gap-5 pt-2">
                {#if hero.isValid() && isDirty() && $page.data.session}
                    <ComicButton text="Save" icon="material-symbols:save" callback={handleSave}></ComicButton>
                {:else}
                    <div class="disabled-button">
                        <ComicButton text="Save" icon="material-symbols:save"></ComicButton>
                    </div>
                {/if}        
            </div>
        </div>
    </div>
</div>