<script lang="ts">
    import PositionedContainer from "./PositionedContainer.svelte";
    import PositionedItemEditor from "./PositionedItemEditor.svelte";
    import { modalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
    import HeroActionDiceForm from "./ActionDiceForm.svelte";
    import ActionDiceIcon from "./ActionDiceIcon.svelte";
    import { DiceIconsEnum } from "$lib/enums/Enums";
    import ModalFormEditor from "./ModalFormEditor.svelte";
    import ComicButton from "./ComicButton.svelte";
    import type { FormField } from "$lib/interfaces/templates/HtmlTemplates";
    import { writable, type Writable } from "svelte/store";
    import type { Hero } from "$lib/entities/Hero";
    import { HeroAbility } from "$lib/entities/HeroAbility";
    import { ThemeTemplates } from "$lib/interfaces/templates/ThemeTemplates";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import KeywordForm from "./KeywordForm.svelte";
    import ImageEditor from "./ImageEditor.svelte";
    import TextEditor from "./TextEditor.svelte";
    import PositionedTextContainer from "./PositionedTextContainer.svelte";
    import TextViewer from "./TextViewer.svelte";
    import HeroAttributesForm from "./HeroAttributesForm.svelte";
    import type { HeroAttributes } from "$lib/entities/HeroAttributes";

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

    function handleEditAttributes(event: any, focusedAttribute: string) {
        const c: ModalComponent = { ref: HeroAttributesForm, props: { attributes: hero.attributes, focus: focusedAttribute } };
        const d: ModalSettings = {
            type: 'component',
            component: c,
            response: (attributes: HeroAttributes) => {
                if (!attributes)
                    return
                
                hero.attributes = attributes;
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

    function handleEditAbility(index: number) {
        const abilityName = hero.abilities && hero.abilities.length > index ? hero.abilities[index].name : '';
        const abilityEffect = hero.abilities && hero.abilities.length > index  ? hero.abilities[index].effect : '';

        const formFields: FormField[] = [
            {
                name: 'ability_name',
                type: 'text',
                value: abilityName
            },
            {
                name: 'ability_effect',
                type: 'textarea',
                value: abilityEffect
            }
        ]

        const c: ModalComponent = { ref: ModalFormEditor, props: { fields: JSON.stringify(formFields) } };
        const d: ModalSettings = {
            type: 'component',
            title: 'Edit Hero Ability',
            component: c,
            response: (fields: FormField[]) => {
                if (!fields || !hero.abilities) {
                    return;
                }

                const abilityName = fields.find(field => field.name == 'ability_name')?.value;
                const abilityEffect = fields.find(field => field.name == 'ability_effect')?.value;

                if (!abilityName || !abilityEffect) {
                    return;
                }

                hero.abilities[index].name = abilityName;
                hero.abilities[index].effect = abilityEffect;

                hero = hero;
            }
        };
        modalStore.trigger(d);
    }

    function handleEditHeroImage() {
        const prompt: ModalSettings = {
            type: 'prompt',
            title: 'Hero Image',
            body: 'Provide an image URL. The image host will affect if the image is rendered correctly when the Hero sheet PNG is generated. Approved hosts: https://imgur.com',
            // Populates the initial input value
            value: hero.heroImage.url && hero.heroImage.url.length > 0 ? hero.heroImage.url : '',
            // Returns the updated response value
            response: (heroImage: string) => {
                hero.heroImage.url = heroImage;
            }
        };
        modalStore.trigger(prompt);
    }
</script>

<style>
    .hero-sheet-container {
        background-repeat: no-repeat;
        width: calc(700px * var(--scale));
        height: calc(566px * var(--scale));
        box-shadow: black 0 0 3px 1px;
        border-radius: 5px;
        position: relative;
        background-size: contain;
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
        background: linear-gradient(#777777 0%, #fff 25%, #fff 75%, #777777 100%) border-box;
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
    :global(.keywords-container *) {
        font-size: var(--fontSize);
        line-height: var(--fontSize);
        color: var(--color);
        font-family: var(--fontFamily);
        letter-spacing: 1px;
    }
    .hero-sheet-container :global(input[name="name"] + button.positioned-text) {
        align-content: end;
        display: grid;
    }
    :global(.hero-icon-image) {
        background-position: center !important;
        background-size: contain !important;
    }   
    .hero-sheet-container[data-theme="BTAS"] .noise-overlay {            
        background: #000000;
        filter: url(#noiseFilter);
        position: absolute;
        content: '';
        left: -205px;
        top: -72px;
        width: calc(100% + 205px);
        height: calc(100% + 72px);
        z-index: 0;
        mix-blend-mode: darken;
        mix-blend-mode: difference;
        mix-blend-mode: exclusion;
        mix-blend-mode: multiply;
        opacity: 0.35;
    }
</style>


<div class="hero-sheet-container" style:--scale={scale} data-theme={template.template_name} style:background-image="url('{template.background_image}')" style:background-color={hero.sheetBackgroundColor}>
    {#if hero.theme === ThemeTemplatesEnum.BTAS}
    <svg class="w-full h-full opacity-20 absolute">
        <filter id='noiseFilter'>
            <feTurbulence 
            type='fractalNoise' 
            baseFrequency='0.98' 
            numOctaves='6' 
            stitchTiles='stitch'/>
        </filter>

        <rect
            width='100%' 
            height='100%' 
            filter='url(#noiseFilter)' />
    </svg>
    {/if}
    {#if template.overlay_image}
    <div class="hero-overlay-image" style:background-image="url('{template.overlay_image}')" style:background-size="contain"></div>
    {/if}
    <PositionedContainer template={template.image} classList="!overflow-visible">
        <ImageEditor bind:image={hero.heroImage} {scale} scaleAxis="height"></ImageEditor>
    </PositionedContainer>
    <PositionedContainer template={template.icon}>
        <ImageEditor bind:image={hero.iconImage} {scale}></ImageEditor>
    </PositionedContainer>
    <PositionedContainer classList="flex justify-end !overflow-visible " template={template.nameContainer}>
        <TextEditor bind:text={hero.name} placeholder="Hero Name" classList={template.name.classList} template={template.name} bind:fontSize={hero.fontSizeHeroName}></TextEditor>
    </PositionedContainer>
    <PositionedContainer classList="keywords-container z-[2]" template={template.keywordsContainer}>
        <button on:click|preventDefault={handleEditKeywords}>
            <div
                style:text-align="left" 
                style:--fontSize="{!hero.fontSizeKeywords || hero.fontSizeKeywords === 0 ? template.keywords.fontSize * scale : hero.fontSizeKeywords * scale}px" 
                style:--fontFamily={template.keywords.font} style:--color={template.keywords.fontColor}>
                
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
    <div class="hero-attribute-container absolute">
        <PositionedContainer template={template.attributes.moveContainer} classList="">
            <button class="p-1 absolute right-0 top-0 context-button" hidden on:click|preventDefault={event => handleEditAttributes(event, 'move')}>
                <iconify-icon icon="material-symbols:edit"></iconify-icon>
            </button>
            <TextViewer text={hero.attributes.move.toString()} template={template.attributes.move}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.attackContainer} classList="">
            <button class="p-1 absolute right-0 top-0 context-button" hidden on:click|preventDefault={event => handleEditAttributes(event, 'attack')}>
                <iconify-icon icon="material-symbols:edit"></iconify-icon>
            </button>
            <TextViewer text={hero.attributes.attack.toString()} template={template.attributes.attack}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.defendContainer} classList="">
            <button class="p-1 absolute right-0 top-0 context-button" hidden on:click|preventDefault={event => handleEditAttributes(event, 'defend')}>
                <iconify-icon icon="material-symbols:edit"></iconify-icon>
            </button>
            <TextViewer text={hero.attributes.defend.toString()} template={template.attributes.defend}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.skillContainer} classList="">
            <button class="p-1 absolute right-0 top-0 context-button" hidden on:click|preventDefault={event => handleEditAttributes(event, 'skill')}>
                <iconify-icon icon="material-symbols:edit"></iconify-icon>
            </button>
            <TextViewer text={hero.attributes.skill.toString()} template={template.attributes.skill}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.focusContainer} classList="">
            <button class="p-1 absolute right-0 top-0 context-button" hidden on:click|preventDefault={event => handleEditAttributes(event, 'focus')}>
                <iconify-icon icon="material-symbols:edit"></iconify-icon>
            </button>
            <TextViewer text={hero.attributes.focus.toString()} template={template.attributes.focus}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.lifeContainer} classList="">
            <button class="p-1 absolute right-0 top-0 context-button" hidden on:click|preventDefault={event => handleEditAttributes(event, 'life')}>
                <iconify-icon icon="material-symbols:edit"></iconify-icon>
            </button>
            <TextViewer text={hero.attributes.life.toString()} template={template.attributes.life}></TextViewer>
        </PositionedContainer>
        <PositionedContainer template={template.attributes.awakeningContainer} classList="">
            <button class="p-1 absolute right-0 top-0 context-button" hidden on:click|preventDefault={event => handleEditAttributes(event, 'awakening')}>
                <iconify-icon icon="material-symbols:edit"></iconify-icon>
            </button>
            <TextViewer text={hero.attributes.awakening.toString()} template={template.attributes.awakening}></TextViewer>
        </PositionedContainer>
    </div>
    <PositionedContainer classList="ability-container" template={template.ability_container}>
        {#if hero.abilities && hero.abilities.length > 0}
            {#each hero.getAbilities() as ability, index}
            <div class="relative grid">
                <TextEditor 
                    template={template.ability_name} 
                    fontSize={hero.fontSizeAbilityName}
                    placeholder="Ability Name"
                    classList="pb-1"
                    bind:text={ability.name}>
                </TextEditor>
                <TextEditor
                    template={template.ability_effect} 
                    fontSize={hero.fontSizeAbilityEffect}
                    placeholder="Ability Effect"
                    classList="pb-4"
                    bind:text={ability.effect}>
                </TextEditor>
                <button class="absolute right-0 top-0 context-button z-50 h-8 content-center justify-center align-middle" on:click|preventDefault={() => handleRemoveAbility(index)}>      
                    <iconify-icon icon="material-symbols:delete"></iconify-icon>
                </button>
            </div>
            {/each}
        {:else}
            <div class="absolute w-full h-full flex justify-center items-center">
                <ComicButton text="Hero Ability" callback={handleAddAbility} icon="material-symbols:add-circle-rounded"></ComicButton>
            </div>
        {/if}
        <button class="absolute left-0 top-0 context-button z-50 h-8 content-center justify-center align-middle" on:click|preventDefault={handleAddAbility}>      
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
                    style:border="2px solid {hero.actionDice.iconColor}"
                    style:border-radius="5px"
                    on:click|preventDefault={() => { handleActionDiceEdit(index) }}
                >
                    <ActionDiceIcon theme={hero.theme ?? ThemeTemplatesEnum.TMNT} icon={DiceIconsEnum[action_die]} bind:color={hero.actionDice.iconColor}></ActionDiceIcon>
                </button>
            </PositionedContainer>
            {/each}
        {/if}
    </div>
</div>