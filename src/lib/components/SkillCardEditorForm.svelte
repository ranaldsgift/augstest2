<script lang="ts">
    import { applyAction, deserialize } from "$app/forms";
    import { RadioGroup, RadioItem } from '@skeletonlabs/skeleton';
    import ComicButton from "./ComicButton.svelte";
    import { EnumHelper } from "$lib/helpers/EnumHelper";
    import { writable, type Writable } from "svelte/store";
    import PigeonPeteSays from "./PigeonPeteSays.svelte";
    import { FormHelper } from "$lib/helpers/FormHelper";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { ThemeTemplates } from "$lib/interfaces/templates/ThemeTemplates";
    import { goto } from "$app/navigation";
    import { DataHelper } from "$lib/helpers/DataHelper";
    import { ToastHelper } from "$lib/helpers/ToastHelper";
    import SkillCardEditor from "./SkillCardEditor.svelte";
    import { SkillCard } from "$lib/entities/SkillCard";
    import PageButtonContainer from "./PageButtonContainer.svelte";
    import { page } from "$app/stores";
    import { SkillCards } from "$lib/stores/DataStores";
    import { SkillCardCreateStore } from "$lib/stores/PageStores";

    export let skillCard: SkillCard = new SkillCard();
    skillCard.serializedSavedEntity = DataHelper.serialize(skillCard);
    const skillCardTheme = skillCard.hero?.theme ?? skillCard.theme ?? ThemeTemplatesEnum.TMNT;

    export let template = ThemeTemplates[skillCardTheme].skillCard;
    
    const themeSelection: Writable<string> = writable(skillCardTheme);
    themeSelection.subscribe(value => { 
        const theme = value as ThemeTemplatesEnum;

        if (skillCard.theme != theme) {
            skillCard.theme = theme;
            template = ThemeTemplates[theme].skillCard;
        }
    });

    async function handleSave() {
        if (await saveSkillCard()) {
            ToastHelper.create('Saved!');
        }
    }

    async function saveSkillCard() {
        const response = await fetch('/api/skillcard?/save', {
            method: 'POST',
            body: FormHelper.serializeFormData(skillCard)
        });

        const result = deserialize(await response.text());

        if (result.type === 'error' || result.type === 'redirect') {
            await applyAction(result);
            return false;
        }
        
        SkillCards.invalidateAll();

        const savedId = result.data?.id;

        if (!skillCard.id && savedId) {
            await goto(`/homebrew/skillcards/${savedId}`);
            const newSkillCard = new SkillCard();
            newSkillCard.user = skillCard.user;
            SkillCardCreateStore.set(newSkillCard);
            return true;
        }
            
        skillCard.serializedSavedEntity = DataHelper.serialize(skillCard);
        return true;
    }

    async function handleRestore() {
        skillCard.isDeleted = false;
        await saveSkillCard();
        ToastHelper.create('Restored!');
    }

    async function handleDelete() {
        skillCard.isDeleted = true;
        await saveSkillCard();
        ToastHelper.create('Deleted!');
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
    }
    .comic-body>div>:global(span) {
        flex: 1 100%;
    }
</style>

<div class="grid gap-5 skill-card-editor-container justify-center">
    <PageButtonContainer>
        {#if skillCard.isValid() && skillCard.isDirty() && $page.data.session && skillCard.user?.userName.length > 0}
            <ComicButton text="Save" icon="material-symbols:save" callback={handleSave}></ComicButton>
        {:else}
            <div class="disabled-button">
                <ComicButton text="Save" icon="material-symbols:save"></ComicButton>
            </div>
        {/if}
        {#if skillCard.id}
            {#if skillCard.isDeleted}
            <ComicButton icon="material-symbols:restore-from-trash" callback={handleRestore}></ComicButton>
            {:else}
            <ComicButton icon="material-symbols:delete" callback={handleDelete}></ComicButton>
            {/if}
        {/if}
    </PageButtonContainer>
    <div class="skill-card-editor m-auto grid gap-5 sm:grid-cols-2 pl-5 pr-5">
        <div class="grid gap-5 justify-items-center">
            <SkillCardEditor bind:skillCard={skillCard} bind:template={template} bind:backgroundColor={skillCard.backgroundColor} bind:theme={skillCard.theme}></SkillCardEditor>
            {#if !$page.data.session || !skillCard.user}
                <PigeonPeteSays>
                    <p>You must be logged in to save a Skill Card!</p>
                </PigeonPeteSays>
            {:else if !skillCard.user.userName || skillCard.user.userName.length === 0}
                <PigeonPeteSays>
                    <p>Please <a href={`/user/${skillCard.user.id}/edit`}>edit</a> your profile before creating a Skill Card!</p>
                </PigeonPeteSays>
            {:else if !skillCard.isValid()}
                <PigeonPeteSays>
                    <p>To save your Skill Card, please complete the following fields:</p>
                    <p class="text-warning-700-200-token unstyled">{skillCard.validityErrors()}</p>
                </PigeonPeteSays>
            {:else if skillCard.id && skillCard.isDirty()}        
                <PigeonPeteSays>
                    <p>You have unsaved changes! Don't forget to save!</p>
                    <p class="text-warning-700-200-token unstyled">{skillCard.validityErrors()}</p>
                </PigeonPeteSays>
            {/if}
        </div>
        <div class="comic-form flex flex-col flex-1">
            <header>
                <h1>Edit your Skill Card</h1>
            </header>
            <div class="comic-body grid gap-5">
                <div>
                    <label class="">
                        <h1>Theme</h1>
                        <RadioGroup active="variant-filled-primary">
                            {#each EnumHelper.getKeys(ThemeTemplatesEnum) as theme}
                                <RadioItem bind:group={$themeSelection} name={`radio-${theme}`} value={theme}>{theme}</RadioItem>
                            {/each}
                        </RadioGroup>
                        <select class="unstyled" name="theme" bind:value={skillCard.theme} hidden>
                            {#each EnumHelper.getKeys(ThemeTemplatesEnum) as theme}
                                <option value={theme}>{theme}</option>
                            {/each}
                        </select>
                    </label>
                </div>
                <div class="theme-fields-container">
                    <label>
                        <h1>Background Color</h1>
                        <input class="unstyled" type="color" name="backgroundColor" bind:value={skillCard.backgroundColor}>
                    </label>
                </div>
                <div class="general-fields-container">
                    {#if false}
                    <!-- TODO: Allow users to override the hero sheet image with their own
                    This would allow users to use their own themes and styles by loading the image specified here
                    instead of generating the hero sheet from the data provided -->
                    <label>
                        <span>Sheet Override</span>
                        <input type="text" name="originalImage" bind:value={skillCard.originalImage}>
                    </label>
                    {/if}
                    <label class="w-full">
                        <span>Skill Card Description</span>
                        <textarea class="unstyled" name="description" rows="7" bind:value={skillCard.description} placeholder="Enter a description of your Skill Card here. Include details about any special mechanics related to your Skill Card. Feel free to leave details about the evolution of your Skill Card after playtesting and any other designer notes you may have. It's always interesting to learn about the designer's process and how the character came to be."></textarea>
                    </label>
                </div>
            </div>            
        </div>
    </div>
</div>