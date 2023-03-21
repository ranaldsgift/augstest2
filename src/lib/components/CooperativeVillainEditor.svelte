<script lang="ts">
    import { CooperativeVillainAbility } from "$lib/entities/CooperativeVillainAbility";
    import type { CooperativeVillainAttributes } from "$lib/entities/CooperativeVillainAttributes";
    import type { Villain } from "$lib/entities/Villain";
    import { DiceIconsEnum, VillainTargetAttributeEnum, VillainTargetPriorityEnum } from "$lib/enums/Enums";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { VillainTemplates } from "$lib/interfaces/templates/VillainTemplates";
    import { modalStore, popup, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
    import ActionDiceIcon from "./ActionDiceIcon.svelte";
    import ComicButton from "./ComicButton.svelte";
    import CooperativeVillainAttributesForm from "./CooperativeVilllainAttributesForm.svelte";
    import ImageEditor from "./ImageEditor.svelte";
    import KeywordForm from "./KeywordForm.svelte";
    import PositionedContainer from "./PositionedContainer.svelte";
    import TextEditor from "./TextEditor.svelte";
    import TextViewer from "./TextViewer.svelte";
    import VillainTargetAttributeIcon from "./VillainTargetAttributeIcon.svelte";

    export let cooperativeVillainSheet: HTMLElement | null = null;
    export let villain: Villain;
    export let scale: number = 1;
    $: villainTheme = villain.theme ?? ThemeTemplatesEnum.TMNT;

    $: template = VillainTemplates[villainTheme];

    function handleChangeOSR(increment: number) {
        villain.cooperative!.optimalStrikeRange += increment;
        if (villain.cooperative!.optimalStrikeRange < 1)
            villain.cooperative!.optimalStrikeRange = 1;
        villain = villain;
    }

    function handleChangeAttribute(increment: number, attribute: "move" | "hits" | "blocks" | "life" ) {
        switch (attribute) {
            case "move":
                villain.cooperative!.attributes.move += increment;
                if (villain.cooperative!.attributes.move < 0)
                    villain.cooperative!.attributes.move = 0;
                break;
            case "hits":
                villain.cooperative!.attributes.hits += increment;
                if (villain.cooperative!.attributes.hits < 0)
                    villain.cooperative!.attributes.hits = 0;
                break;
            case "blocks":
                villain.cooperative!.attributes.blocks += increment;
                if (villain.cooperative!.attributes.blocks < 0)
                    villain.cooperative!.attributes.blocks = 0;
                break;
            case "life":
                villain.cooperative!.attributes.life += increment;
                if (villain.cooperative!.attributes.life < 0)
                    villain.cooperative!.attributes.life = 0;
                break;
        }

        villain = villain;
    }

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

    function handleEditAttributes(event: any, focusedAttribute: string) {
        const c: ModalComponent = { ref: CooperativeVillainAttributesForm, props: { attributes: villain.cooperative!.attributes, focus: focusedAttribute } };
        const d: ModalSettings = {
            type: 'component',
            component: c,
            response: (attributes: CooperativeVillainAttributes) => {
                if (!attributes)
                    return
                
                villain.cooperative!.attributes = attributes;
                villain = villain;
            }
        };
        modalStore.trigger(d);
    }
    
    function handleAddAbility() {
        const ability = new CooperativeVillainAbility();
        ability.name = '';
        ability.effect = '';

        if (!villain.cooperative!.abilities) {
            villain.cooperative!.abilities = [];
        }

        villain.cooperative!.abilities.push(ability);
        villain = villain;
    }

    function handleRemoveAbility(index: number) {
        if (!villain.cooperative!.abilities || villain.cooperative!.abilities.length <= index) {
            return;
        }

        villain.cooperative!.abilities.splice(index, 1);
        villain = villain;
    }

    function handleCycleTargetPriority() {
        villain.cooperative!.targetPriority = villain.cooperative?.targetPriority === VillainTargetPriorityEnum.Highest ? VillainTargetPriorityEnum.Lowest : VillainTargetPriorityEnum.Highest;
    }

    function handleCycleTargetAttribute() {
        villain.cooperative!.targetAttribute = villain.cooperative?.targetAttribute === VillainTargetAttributeEnum.Focus ? VillainTargetAttributeEnum.Life : villain.cooperative?.targetAttribute === VillainTargetAttributeEnum.Life ? VillainTargetAttributeEnum.Skill : VillainTargetAttributeEnum.Focus;
    }

    let villainCoopPaletteButton: HTMLElement;
    let villainCoopTextButton: HTMLElement;
</script>

<style>
    .villain-cooperative-sheet-container {
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

{#if villain.cooperative}
<div bind:this={cooperativeVillainSheet} class="villain-cooperative-sheet-container" style:--scale={scale} data-theme={villainTheme} style:background-color={villain.backgroundColor}>
    <!-- TODO: Look into this when Skeleton.dev updates -->
    <!-- <iconify-icon bind:this={villainCoopPaletteButton} use:popup={{ event: 'click', target: 'villainCoopPalette', state(event) {
        if (event.state) {
            villainCoopPaletteButton.classList.add('!flex', 'active', 'z-[3]');
        }
        else {
            villainCoopPaletteButton.classList.remove('!flex', 'active', 'z-[3]');
        }
    }, }} icon="material-symbols:palette" class="context-button p-1 absolute right-10 bottom-1"></iconify-icon>    
    <div data-popup="villainCoopPalette" class="z-[3] variant-glass-primary border-primary-500 border-2 rounded-lg">
        <div class="grid gap-5 p-5">
            <label class="comic-label">
                <h1>Sheet Background Color</h1>
                <input type="color" name="sheetBackgroundColor" bind:value={villain.sheetBackgroundColor}>
            </label>
        </div>
    </div>
    <iconify-icon bind:this={villainCoopTextButton} use:popup={{ event: 'click', target: 'villainCoopText', state(event) {
        if (event.state) {
            villainCoopTextButton.classList.add('!flex', 'active', 'z-[3]');
        }
        else {
            villainCoopTextButton.classList.remove('!flex', 'active', 'z-[3]');
        }
    }, }} icon="material-symbols:text-fields" class="context-button p-1 absolute right-1 bottom-1"></iconify-icon>    
    <div data-popup="villainCoopText" class="z-[4] variant-glass-primary border-primary-500 border-2 rounded-lg">
        <div class="grid gap-5 p-5">
            <label class="comic-label">
                <span>Name</span>
                <input class="unstyled" type="number" min="0" step="1" name="fontSizeVillainName" bind:value={villain.fontSizeVillainName} placeholder={template.name.fontSize.toString()}>
            </label>
            <label class="comic-label">
                <span>Keywords</span>
                <input class="unstyled" type="number" min="0" step="1" name="fontSizeKeywords" bind:value={villain.fontSizeKeywords} placeholder={template.keywords.fontSize.toString()}>
            </label>

        </div>
    </div> -->

    <img class="absolute w-full h-full pointer-events-none" src={template.cooperative.background_image} alt="Background">
    {#if villain.theme === ThemeTemplatesEnum.BTAS}
    <img class="absolute w-full h-full mix-blend-color-burn pointer-events-none" src="/images/overlays/paper.png" alt="Paper Background Effect">
    {/if}
    {#if template.cooperative.overlay_image}
    <div class="villain-overlay-image w-full h-full absolute z-[2] pointer-events-none" style:background-image="url('{template.cooperative.overlay_image}')" style:background-size="100% 100%"></div>
    {/if}
    <PositionedContainer template={template.image} classList="!overflow-visible">
        <ImageEditor bind:image={villain.image} {scale} scaleAxis="height"></ImageEditor>
    </PositionedContainer>
    <PositionedContainer template={template.icon}>
        <ImageEditor bind:image={villain.iconImage} {scale}></ImageEditor>
    </PositionedContainer>
    <PositionedContainer classList="flex justify-end !overflow-visible " template={template.nameContainer}>
        <TextEditor bind:text={villain.name} placeholder="Name" template={template.name} bind:fontSize={villain.fontSizeVillainName}></TextEditor>
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
    <div class="villain-attribute-container absolute z-[3] context-button-container">
        <PositionedContainer template={template.cooperative.attributes.moveContainer} classList="!overflow-visible">
            <button class="p-1 absolute -right-8 -top-4 context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'move')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if villain.cooperative.attributes.move > 1}
            <button class="p-1 absolute -right-8 top-4 context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'move') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={villain.cooperative.attributes.move.toString()} template={template.cooperative.attributes.move}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.cooperative.attributes.hitsContainer} classList="!overflow-visible">
            <button class="p-1 absolute -right-8 -top-4 context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'hits')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if villain.cooperative.attributes.hits > 1}
            <button class="p-1 absolute -right-8 top-4 context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'hits') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={villain.cooperative.attributes.hits.toString()} template={template.cooperative.attributes.hits}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.cooperative.attributes.blocksContainer} classList="!overflow-visible">
            <button class="p-1 absolute -right-8 -top-4 context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'blocks')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if villain.cooperative.attributes.blocks > 1}
            <button class="p-1 absolute -right-8 top-4 context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'blocks') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={villain.cooperative.attributes.blocks.toString()} template={template.cooperative.attributes.blocks}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.cooperative.attributes.lifeContainer} classList="!overflow-visible">
            <button class="p-1 absolute -right-8 -top-4 context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'life')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if villain.cooperative.attributes.life > 1}
            <button class="p-1 absolute -right-8 top-4 context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'life') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={villain.cooperative.attributes.life.toString()} template={template.cooperative.attributes.life}></TextViewer>
        </PositionedContainer>
    </div>
    <PositionedContainer classList="ability-container" template={template.cooperative.ability_container}>
        {#if villain.cooperative.abilities && villain.cooperative.abilities.length > 0}
            {#each villain.cooperative.abilities as ability, index}
            <div class="relative grid">
                <TextEditor 
                    template={template.cooperative.ability_name} 
                    fontSize={villain.cooperative.fontSizeAbilityName}
                    placeholder="Ability Name"
                    classList="pb-[calc(4px*var(--scale))]"
                    bind:text={ability.name}>
                </TextEditor>
                <TextEditor
                    template={template.cooperative.ability_effect} 
                    fontSize={villain.cooperative.fontSizeAbilityEffect}
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
    <PositionedContainer template={template.cooperative.optimalStrikeRangeContainer}>
        <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeOSR(1)}
            style:left="calc(4px*var(--scale))"
            style:top="calc(-4px*var(--scale))">
            <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
        </button>
        {#if villain.cooperative.optimalStrikeRange > 1}
        <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeOSR(-1) }}
            style:left="calc(4px*var(--scale))"
            style:top="calc(24px*var(--scale))">
            <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
        </button>
        {/if}
        {#if villain.cooperative.optimalStrikeRange <= 1}
        <div style:width="calc({template.cooperative.meleeStrikeRangeContainer.width}*var(--scale))" style:height="calc({template.cooperative.meleeStrikeRangeContainer.height}*var(--scale))">
            <ActionDiceIcon icon={DiceIconsEnum.Melee} theme={villain.theme} color="white"></ActionDiceIcon>
        </div>
        {:else}
            <TextViewer text={villain.cooperative.optimalStrikeRange.toString()} template={template.cooperative.optimalStrikeRangeText}></TextViewer>
        {/if}
    </PositionedContainer>
    <button on:click|preventDefault={handleCycleTargetPriority}>
    <PositionedContainer template={template.cooperative.targetPriorityContainer}>
        <img class="h-full object-contain" style:transform={villain.cooperative.targetPriority === 'Lowest' ? 'rotate(180deg)' : ''} src={template.cooperative.targetPriorityArrow} alt="Villain Target Priority">
    </PositionedContainer>
    </button>
    <button on:click|preventDefault={handleCycleTargetAttribute}>
    <PositionedContainer template={template.cooperative.targetAttributeContainer}>
        <VillainTargetAttributeIcon icon={villain.cooperative.targetAttribute} theme={villain.theme} color="white"></VillainTargetAttributeIcon>
    </PositionedContainer>
    </button>
</div>
{/if}