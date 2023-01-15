<script lang="ts">
    import { applyAction, deserialize, enhance } from "$app/forms";
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
    import { page } from "$app/stores";

    export let hero: Hero;
    export let template = ThemeTemplates[hero.theme].heroSheet;
    
    const themeSelection: Writable<string> = writable(hero.theme ?? ThemeTemplatesEnum.TMNT);
    themeSelection.subscribe(value => { 
        var theme = value as ThemeTemplatesEnum;

        if (hero.theme != theme) {
            hero.theme = theme;
            template = ThemeTemplates[theme].heroSheet;
        }
    });

    async function handleSave() {
        const response = await fetch('/api/hero?/save', {
            method: 'POST',
            body: FormHelper.serializeFormData(hero)
        });

        const result = deserialize(await response.text());

        if (result.type === 'error') {
            await applyAction(result);
        }

        const savedHeroId = result.data.id;
        if (!hero.id && savedHeroId) {
            goto(`/homebrew/heroes/${savedHeroId}`);
        }
            
        hero = hero;
        const t: ToastSettings = {
            message: 'Saved',
            preset: 'success',
            autohide: true,
            timeout: 1000
        };
        toastStore.trigger(t);
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
    div.form>div {
        display: flex;
        gap: 1rem;
        align-items: flex-end;
    }
    div.form>div>* {
        flex: 1;
    }
    form {
        max-width: 1566px;  
		grid-template-columns: repeat(auto-fit, minmax(700px, 1fr));
        gap: 30px;
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
</style>

<form class="m-auto grid gap-5" on:submit|preventDefault={handleSave}>
    <input type="hidden" name="id" bind:value={hero.id}>
    <input type="hidden" name="user.id" bind:value={hero.user.id}>
    {#if hero.token}
    <input type="hidden"name="token.id" bind:value={hero.token.id}>
    {/if}    
    <input type="hidden" name="augsLicense" bind:value={hero.augsLicense}>
    <input type="hidden" name="dateCreated" bind:value={hero.dateCreated}>
    <input type="hidden" name="dateModified" bind:value={hero.dateModified}>

    <div class="grid gap-5">
        <HeroEditorSheet bind:hero={hero} bind:template={template}></HeroEditorSheet>
        {#if !hero.isValid()}
                    <PigeonPeteSays>
                        <p>To save your Hero, please complete the following fields:</p>
                        <p class="text-warning-800 unstyled">{hero.validityErrors()}</p>
                    </PigeonPeteSays>
        {/if}     
    </div>
    <div class="form comic-form">
        <header>
            <h1>Customize your Hero</h1>
        </header>
        <div>
            <label class="flex items-center gap-5">
                <span>Theme</span>
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
                <span>Sheet Background Color</span>
                <input type="color" name="sheetBackgroundColor" bind:value={hero.sheetBackgroundColor}>
            </label>
            <label>
                <span>Dice Background Color</span>
                <input type="color" name="actionDice.backgroundColor" bind:value={hero.actionDice.backgroundColor}>
            </label>
            <label>
                <span>Dice Icon Color</span>
                <input type="color" name="actionDice.iconColor" bind:value={hero.actionDice.iconColor}>
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
                <textarea name="description" rows="4" bind:value={hero.description} placeholder="Enter a description of your Hero here. Include details about any special mechanics related to your Hero. Feel free to leave details about the evolution of your Hero after playtesting and any other designer notes you may have. It's always interesting to learn about the designer's process and how the character came to be."></textarea>
            </label>
        </div>
        <div class="image-fields-container">
            <label>
                <span>Hero Image Scale</span>
                <input type="number" name="heroImage.scale" bind:value={hero.heroImage.scale}>
            </label>
            <label>
                <span>Hero Image Position Left</span>
                <input type="number" name="heroImage.positionLeft" bind:value={hero.heroImage.positionLeft}>
            </label>
            <label>
                <span>Hero Image Position Top</span>
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
        <div>
            <div class="grid gap-5 pt-2">
                {#if hero.isValid()}
                    <ComicButton text="Save" icon="material-symbols:save"></ComicButton>
                {:else}
                    <div class="disabled-button">
                        <ComicButton text="Save" icon="material-symbols:save"></ComicButton>
                    </div>
                {/if}        
            </div>
        </div>
    </div>
</form>