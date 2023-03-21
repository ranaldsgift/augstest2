<script lang="ts">
    import PositionedContainer from "./PositionedContainer.svelte";
    import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
    import HeroActionDiceForm from "./ActionDiceForm.svelte";
    import ActionDiceIcon from "./ActionDiceIcon.svelte";
    import { DiceIconsEnum } from "$lib/enums/Enums";
    import ComicButton from "./ComicButton.svelte";
    import type { Hero } from "$lib/entities/Hero";
    import { HeroAbility } from "$lib/entities/HeroAbility";
    import { ThemeTemplates } from "$lib/interfaces/templates/ThemeTemplates";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import KeywordForm from "./KeywordForm.svelte";
    import ImageEditor from "./ImageEditor.svelte";
    import TextEditor from "./TextEditor.svelte";
    import TextViewer from "./TextViewer.svelte";

    export let template = ThemeTemplates.TMNT.heroSheet;
    export let hero: Hero;
    export let scale: number = 1.0;

    if (hero.theme) {
        template = ThemeTemplates[hero.theme].heroSheet;
    }

    function handleActionDiceEdit(index: number) {
        const icon = hero.actionDice.dice ? hero.actionDice.dice[index] : DiceIconsEnum.Move;
		const c: ModalComponent = { ref: HeroActionDiceForm, props: { "theme": hero.theme, "icon": icon } };
		const d: ModalSettings = {
			type: 'component',
			title: 'Select an Action Dice Icon',
			component: c,
			response: (actionDie: any) => {
				if (!actionDie)
                    return;
                
                hero.actionDice.dice[index] = actionDie;
                hero = hero;
			}
		};
		modalStore.trigger(d);
    }

    function handleEditKeywords() {
        const c: ModalComponent = { ref: KeywordForm, props: { keywords: hero.keywords } };
        const d: ModalSettings = {
            type: 'component',
            component: c,
            response: (keywords: string[]) => {
                if (!keywords || keywords.length === 0)
                    return
                
                hero.keywords = [ ...new Set(keywords.map(keyword => keyword.toLowerCase())) ];
                hero = hero;
            }
        };
        modalStore.trigger(d);
    }
    
    function handleAddAbility() {
        const ability = new HeroAbility();
        ability.name = '';
        ability.effect = '';

        if (!hero.abilities) {
            hero.abilities = [];
        }

        hero.abilities.push(ability);
        hero = hero;
    }

    function handleRemoveAbility(index: number) {
        if (!hero.abilities || hero.abilities.length <= index) {
            return;
        }

        hero.abilities.splice(index, 1);
        hero = hero;
    }

    function handleChangeAttribute(increment: number, attribute: "move" | "attack" | "defend" | "skill" | "focus" | "life" | "awakening" ) {
        switch (attribute) {
            case "move":
                hero.attributes.move += increment;
                if (hero.attributes.move < 0)
                    hero.attributes.move = 0;
                break;
            case "attack":
                hero.attributes.attack += increment;
                if (hero.attributes.attack < 0)
                    hero.attributes.attack = 0;
                break;
            case "defend":
                hero.attributes.defend += increment;
                if (hero.attributes.defend < 0)
                    hero.attributes.defend = 0;
                break;
            case "skill":
                hero.attributes.skill += increment;
                if (hero.attributes.skill < 0)
                    hero.attributes.skill = 0;
                break;
            case "focus":   
                hero.attributes.focus += increment;
                if (hero.attributes.focus < 0)
                    hero.attributes.focus = 0;
                break;
            case "life":
                hero.attributes.life += increment;
                if (hero.attributes.life < 0)
                    hero.attributes.life = 0;
                break;
            case "awakening":
                hero.attributes.awakening += increment;
                if (hero.attributes.awakening < 0)
                    hero.attributes.awakening = 0;
                break;
        }

        hero = hero;
    }
</script>

<style>
    .hero-sheet-container {
        background-repeat: no-repeat;
        width: calc(700px * var(--scale));
        height: calc(566px * var(--scale));
        box-shadow: black 0 0 3px 1px;
        border-radius: 10px;
        position: relative;
        background-size: 100% 100%;
        overflow: hidden;
    }
    :global(.positioned-container:hover .add-ability-button) {
        display: flex;
        justify-content: center;
    }
    .hero-sheet-container[data-theme="TMNT"] .hero-action-dice-container, .hero-sheet-container[data-theme="TMNT"] :global(.positioned-text) {
        transform: skew(1.7deg, -1.7deg);
    }
    .hero-sheet-container[data-theme="BTAS"] .hero-action-dice-container button {
        border: none !important;
        border-radius: 0 !important;
    }
    .hero-action-dice-container button:hover {
        filter: contrast(1.5);
    }
    .hero-overlay-image {
        width: 100%;
        height: 100%;
        position: absolute;
        pointer-events: none;
        z-index: 2;
    }
    .hero-sheet-container :global(input[name="heroImage"] + button.positioned-image) {
        z-index: 0;
    }
    .hero-sheet-container[data-theme="BTAS"] :global(input[name="traitKeywords"] + button.positioned-text) {
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    :global(.ability-container *), :global(.hero-attribute-container *), :global(.hero-action-dice-container *) {
        z-index: 3;
    }
    .hero-sheet-container[data-theme="BTAS"] .hero-action-dice-container :global(.positioned-container) {
        border: calc(2px * var(--scale)) solid transparent;
        background: linear-gradient(#545454 0%, #b8b8b8 25%, #b8b8b8 75%, #545454 100%) border-box;
        border-radius: calc(4px * var(--scale));
    }
    .hero-sheet-container[data-theme="BTAS"] .hero-attribute-container>:global(button) {
        text-shadow: -2px -2px 0px black, 2px 2px 0px black, -2px 2px 0px black, 2px -2px 0px black, 2px 0px 0px black, -2px 0px 0px black, 0px -2px 0px black, 0px -2px 0px black;
    } 
    .hero-sheet-container[data-theme="TMNT"] :global(.hero-action-dice-container svg) {
        width: calc(100% - calc(8px * var(--scale)));
        height: calc(100% - calc(8px * var(--scale)));
        top: calc(4px * var(--scale));
        left: calc(4px * var(--scale));
        position: relative;
    }    
    .hero-sheet-container[data-theme="BTAS"] :global(.hero-action-dice-container svg) {
        width: calc(100% - calc(4px * var(--scale)));
        height: calc(100% - calc(4px * var(--scale)));
        top: calc(2px * var(--scale));
        left: calc(2px * var(--scale));
        position: relative;
    }
    .hero-sheet-container :global(input[name="name"] + button.positioned-text) {
        align-content: end;
        display: grid;
    }
</style>


<div class="hero-sheet-container" style:--scale={scale} data-theme={template.template_name} style:background-color={hero.sheetBackgroundColor}>
    <img class="absolute w-full h-full pointer-events-none" src={template.background_image} alt="Background">
    {#if hero.theme === ThemeTemplatesEnum.BTAS}
    <img class="absolute w-full h-full mix-blend-color-burn pointer-events-none" src="/images/overlays/paper.png" alt="Paper Background Effect">
    {/if}
    {#if template.overlay_image}
    <img class="absolute w-full h-full z-[2] pointer-events-none" src={template.overlay_image} alt="Overlay">
    {/if}
    <PositionedContainer template={template.image} classList="!overflow-visible">
        <ImageEditor bind:image={hero.heroImage} {scale} scaleAxis="height"></ImageEditor>
    </PositionedContainer>
    <PositionedContainer template={template.icon}>
        <ImageEditor bind:image={hero.iconImage} {scale}></ImageEditor>
    </PositionedContainer>
    <PositionedContainer classList="flex justify-end !overflow-visible " template={template.nameContainer}>
        <TextEditor bind:text={hero.name} placeholder="Name" classList={template.name.classList} template={template.name} bind:fontSize={hero.fontSizeHeroName}></TextEditor>
    </PositionedContainer>
    <PositionedContainer classList="keywords-container z-[2]" template={template.keywordsContainer}>
        <button on:click|preventDefault={handleEditKeywords}>
            <div
                style:text-align="left"
                style:font-size="{!hero.fontSizeKeywords || hero.fontSizeKeywords === 0 ? template.keywords.fontSize * scale : hero.fontSizeKeywords * scale}px"
                style:font-family={template.keywords.font}
                style:color={template.keywords.fontColor}
                style:line-height="{!hero.fontSizeKeywords || hero.fontSizeKeywords === 0 ? template.keywords.fontSize * scale : hero.fontSizeKeywords * scale}px"
                style:letter-spacing="calc(1px*var(--scale))">
                {#if hero.keywords && hero.keywords.length > 0}
                {#each hero.keywords as keyword, index}
                    <span>{keyword}</span>
                    {#if index < hero.keywords.length - 1}
                    <span>•&nbsp;</span>
                    {/if}
                {/each}
                {:else}
                <span>Factions • Keywords</span>
                {/if}                
            </div>
        <iconify-icon icon="material-symbols:add" class="context-button p-1 absolute right-0 top-0" hidden></iconify-icon>
    </button>
    </PositionedContainer>
    <div class="hero-attribute-container absolute z-[3]">
        <PositionedContainer template={template.attributes.awakeningContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'awakening')}
                style:right="calc(-20px*var(--scale))"
                style:top="calc(-12px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if hero.attributes.awakening > 0}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'awakening') }}
                style:right="calc(-20px*var(--scale))"
                style:top="calc(16px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={hero.attributes.awakening.toString()} template={template.attributes.awakening}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.lifeContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'life')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-16px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if hero.attributes.life > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'life') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(12px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={hero.attributes.life.toString()} template={template.attributes.life}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.focusContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'focus')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if hero.attributes.focus > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'focus') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={hero.attributes.focus.toString()} template={template.attributes.focus}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.skillContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'skill')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if hero.attributes.skill > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'skill') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={hero.attributes.skill.toString()} template={template.attributes.skill}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.defendContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'defend')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if hero.attributes.defend > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'defend') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={hero.attributes.defend.toString()} template={template.attributes.defend}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.attackContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'attack')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if hero.attributes.attack > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'attack') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={hero.attributes.attack.toString()} template={template.attributes.attack}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.moveContainer} classList="!overflow-visible">
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => handleChangeAttribute(1, 'move')}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(-4px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-upward"></iconify-icon>
            </button>
            {#if hero.attributes.move > 1}
            <button class="p-1 absolute context-button" hidden on:click|preventDefault={() => { handleChangeAttribute(-1, 'move') }}
                style:right="calc(-24px*var(--scale))"
                style:top="calc(24px*var(--scale))">
                <iconify-icon icon="material-symbols:arrow-downward"></iconify-icon>
            </button>
            {/if}
            <TextViewer text={hero.attributes.move.toString()} template={template.attributes.move}></TextViewer>
        </PositionedContainer>
    </div>
    <PositionedContainer classList="ability-container" template={template.ability_container}>
        {#if hero.abilities && hero.abilities.length > 0}
            {#each hero.abilities as ability, index}
            <div class="relative grid">
                <TextEditor 
                    template={template.ability_name} 
                    fontSize={hero.fontSizeAbilityName}
                    placeholder="Ability Name"
                    classList="pb-[calc(4px*var(--scale))]"
                    bind:text={ability.name}>
                </TextEditor>
                <TextEditor
                    template={template.ability_effect} 
                    fontSize={hero.fontSizeAbilityEffect}
                    placeholder="Ability Effect"
                    classList="pb-[calc(16px*var(--scale))]"
                    bind:text={ability.effect}>
                </TextEditor>
                <button class="absolute right-0 top-0 context-button content-center justify-center align-middle" on:click|preventDefault={() => handleRemoveAbility(index)}>      
                    <iconify-icon icon="material-symbols:delete"></iconify-icon>
                </button>
            </div>
            {/each}
        {:else}
            <div class="absolute w-full h-full flex justify-center items-center">
                <ComicButton text="Hero Ability" callback={handleAddAbility} icon="material-symbols:add-circle-rounded"></ComicButton>
            </div>
        {/if}
        <button class="absolute left-0 top-0 context-button content-center justify-center align-middle" on:click|preventDefault={handleAddAbility}>      
            <iconify-icon icon="material-symbols:add-circle-rounded"></iconify-icon>
        </button>
    </PositionedContainer>
    <div class="hero-action-dice-container" style:--iconColor={hero.actionDice.iconColor}>
        {#if hero.actionDice}
            {#each hero.actionDice.dice as action_die, index}
            <PositionedContainer template={template.action_dice[index]}>
                <button 
                    style:width={'100%'} 
                    style:height={'100%'} 
                    style:background-color={hero.actionDice.backgroundColor}
                    style:background-repeat="none"
                    style:background-size="contain"
                    style:border="calc(2px * var(--scale)) solid {hero.actionDice.iconColor}"
                    style:border-radius="calc(5px * var(--scale))"
                    on:click|preventDefault={() => { handleActionDiceEdit(index) }}
                >
                    <ActionDiceIcon theme={hero.theme ?? ThemeTemplatesEnum.TMNT} icon={DiceIconsEnum[action_die]} bind:color={hero.actionDice.iconColor}></ActionDiceIcon>
                </button>
            </PositionedContainer>
            {/each}
        {/if}
    </div>
</div>