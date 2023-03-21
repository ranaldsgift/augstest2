<script lang="ts">
    import type { Villain } from "$lib/entities/Villain";
    import { CompetitiveVillainAbility } from "$lib/entities/CompetitiveVillainAbility";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { VillainTemplates } from "$lib/interfaces/templates/VillainTemplates";
    import { modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
    import ComicButton from "./ComicButton.svelte";
    import ImageEditor from "./ImageEditor.svelte";
    import KeywordForm from "./KeywordForm.svelte";
    import PositionedContainer from "./PositionedContainer.svelte";
    import TextEditor from "./TextEditor.svelte";
    import TextViewer from "./TextViewer.svelte";

    export let competitiveVillainSheet: HTMLElement | null = null;
    export let villain: Villain;
    export let scale: number = 1;
    $: villainTheme = villain.theme ?? ThemeTemplatesEnum.TMNT;

    $: template = VillainTemplates[villainTheme];

    function handleEditKeywords() {

        const c: ModalComponent = { ref: KeywordForm, props: { keywords: villain.keywords } };
        const d: ModalSettings = {
            type: 'component',
            component: c,
            response: (keywords: string[]) => {
                if (!keywords || keywords.length === 0)
                    return
                
                villain.keywords = [ ...new Set(keywords.map(keyword => keyword.toLowerCase())) ];
                villain = villain;
            }
        };
        modalStore.trigger(d);
    }

    function handleChangeAttribute(increment: number, attribute: "move" | "attack" | "defend" | "life" | "awakening" ) {
        switch (attribute) {
            case "move":
                villain.competitive!.attributes.move += increment;
                if (villain.competitive!.attributes.move < 0)
                    villain.competitive!.attributes.move = 0;
                break;
            case "attack":
                villain.competitive!.attributes.attack += increment;
                if (villain.competitive!.attributes.attack < 0)
                    villain.competitive!.attributes.attack = 0;
                break;
            case "defend":
                villain.competitive!.attributes.defend += increment;
                if (villain.competitive!.attributes.defend < 0)
                    villain.competitive!.attributes.defend = 0;
                break;
            case "life":
                villain.competitive!.attributes.life += increment;
                if (villain.competitive!.attributes.life < 0)
                    villain.competitive!.attributes.life = 0;
                break;
            case "awakening":
                villain.competitive!.attributes.awakening += increment;
                if (villain.competitive!.attributes.awakening < 0)
                    villain.competitive!.attributes.awakening = 0;
                break;
        }

        villain = villain;
    }
    
    function handleAddAbility() {
        const ability = new CompetitiveVillainAbility();
        ability.name = '';
        ability.effect = '';

        if (!villain.competitive!.abilities) {
            villain.competitive!.abilities = [];
        }

        villain.competitive!.abilities.push(ability);
        villain = villain;
    }

    function handleRemoveAbility(index: number) {
        if (!villain.competitive!.abilities || villain.competitive!.abilities.length <= index) {
            return;
        }

        villain.competitive!.abilities.splice(index, 1);
        villain = villain;
    }
</script>

<style>
    .villain-competitive-sheet-container {
        background-repeat: no-repeat;
        width: calc(700px * var(--scale));
        height: calc(566px * var(--scale));
        box-shadow: black 0 0 3px 1px;
        border-radius: 10px;
        position: relative;
        background-size: 100% 100%;
        overflow: hidden;
    }
</style>

{#if villain.competitive}
<div bind:this={competitiveVillainSheet} class="villain-competitive-sheet-container" style:--scale={scale} data-theme={villainTheme} style:background-color={villain.backgroundColor}>
    <img class="absolute w-full h-full pointer-events-none" src={villain.competitive.attributes.awakening === 0 ? template.competitive.background_image : template.competitive.leaderBackgroundImage} alt="Background">
    {#if villain.theme === ThemeTemplatesEnum.BTAS}
    <img class="absolute w-full h-full mix-blend-color-burn pointer-events-none" src="/images/overlays/paper.png" alt="name">
    {/if}
    {#if template.competitive.overlay_image}
    <div class="villain-overlay-image w-full h-full absolute z-[2] pointer-events-none" style:background-image="url('{villain.competitive.attributes.awakening === 0 ? template.competitive.overlay_image : template.competitive.leaderOverlayImage}')" style:background-size="100% 100%"></div>
    {/if}
    <PositionedContainer template={template.image} classList="!overflow-visible">
        <ImageEditor bind:image={villain.image} {scale} scaleAxis="height"></ImageEditor>
    </PositionedContainer>
    <PositionedContainer template={template.icon}>
        <ImageEditor bind:image={villain.iconImage} {scale}></ImageEditor>
    </PositionedContainer>
    <PositionedContainer classList="flex justify-end !overflow-visible " template={template.nameContainer}>
        <TextEditor bind:text={villain.name} placeholder="Name" classList={template.name.classList} template={template.name} bind:fontSize={villain.fontSizeVillainName}></TextEditor>
    </PositionedContainer>
    <PositionedContainer classList="keywords-container z-[2]" template={template.keywordsContainer}>
        <button on:click|preventDefault={handleEditKeywords}>
            <div
                style:text-align="left"
                style:font-size="{!villain.fontSizeKeywords || villain.fontSizeKeywords === 0 ? template.keywords.fontSize * scale : villain.fontSizeKeywords * scale}px"
                style:font-family={template.keywords.font}
                style:color={template.keywords.fontColor}
                style:line-height="{!villain.fontSizeKeywords || villain.fontSizeKeywords === 0 ? template.keywords.fontSize * scale : villain.fontSizeKeywords * scale}px"
                style:letter-spacing="calc(1px*var(--scale))">
                
                {#if villain.keywords && villain.keywords.length > 0}
                {#each villain.keywords as keyword, index}
                    <span class="template-text">{keyword}</span>
                    {#if index < villain.keywords.length - 1}
                    <span>•&nbsp;</span>
                    {/if}
                {/each}
                {:else}
                <span class="template-text">Factions • Keywords</span>
                {/if}                
            </div>
        <iconify-icon icon="material-symbols:add" class="context-button p-1 absolute right-0 top-0" hidden></iconify-icon>
    </button>
    </PositionedContainer>
    <div class="villain-attribute-container absolute z-[3]">
        <PositionedContainer template={template.competitive.attributes.moveContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'move')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if villain.competitive.attributes.move > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'move') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={villain.competitive.attributes.move.toString()} template={template.competitive.attributes.move}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.competitive.attributes.attackContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'attack')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if villain.competitive.attributes.attack > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'attack') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={villain.competitive.attributes.attack.toString()} template={template.competitive.attributes.attack}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.competitive.attributes.defendContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'defend')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if villain.competitive.attributes.defend > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'defend') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={villain.competitive.attributes.defend.toString()} template={template.competitive.attributes.defend}></TextViewer>
        </PositionedContainer>
        {#if villain.competitive.attributes.awakening === 0}        
        <PositionedContainer template={template.competitive.attributes.lifeContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'life')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if villain.competitive.attributes.life > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'life') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={villain.competitive.attributes.life.toString()} template={template.competitive.attributes.life}></TextViewer>
        </PositionedContainer>
        {:else}
        <PositionedContainer template={template.competitive.attributes.leaderLifeContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'life')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if villain.competitive.attributes.life > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'life') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={villain.competitive.attributes.life.toString()} template={template.competitive.attributes.leaderLife}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.competitive.attributes.leaderAwakeningContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'awakening')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if villain.competitive.attributes.awakening > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'awakening') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={villain.competitive.attributes.awakening.toString()} template={template.competitive.attributes.leaderAwakening}></TextViewer>
        </PositionedContainer>
        {/if}
        
    </div>
    <PositionedContainer classList="ability-container" template={template.competitive.ability_container}>
        {#if villain.competitive.abilities && villain.competitive.abilities.length > 0}
            {#each villain.competitive.abilities as ability, index}
            <div class="relative grid">
                <TextEditor 
                    template={template.competitive.ability_name} 
                    fontSize={villain.competitive.fontSizeAbilityName}
                    placeholder="Ability Name"
                    classList="pb-[calc(4px*var(--scale))]"
                    bind:text={ability.name}>
                </TextEditor>
                <TextEditor
                    template={template.competitive.ability_effect} 
                    fontSize={villain.competitive.fontSizeAbilityEffect}
                    placeholder="Ability Effect"
                    classList="pb-[calc(16px*var(--scale))]"
                    bind:text={ability.effect}>
                </TextEditor>
                <button class="absolute right-0 top-0 context-button z-50 content-center justify-center align-middle" on:click|preventDefault={() => handleRemoveAbility(index)}>      
                    <iconify-icon icon="material-symbols:delete"></iconify-icon>
                </button>
            </div>
            {/each}
        {:else}
            <div class="absolute w-full h-full flex justify-center items-center">
                <ComicButton text="Ability" callback={handleAddAbility} icon="material-symbols:add-circle-rounded"></ComicButton>
            </div>
        {/if}
        <button class="absolute left-0 top-0 context-button z-50 content-center justify-center align-middle" on:click|preventDefault={handleAddAbility}>      
            <iconify-icon icon="material-symbols:add-circle-rounded"></iconify-icon>
        </button>
    </PositionedContainer>
    
    <PositionedContainer classList="!overflow-visible flex justify-center text-center" template={template.competitive.flavorTextContainer}>
        <TextEditor bind:text={villain.competitive.flavorText} placeholder="Flavor Text" classList={template.competitive.flavorText.classList} template={template.competitive.flavorText} bind:fontSize={villain.fontSizeVillainName}></TextEditor>
    </PositionedContainer>
</div>
{/if}