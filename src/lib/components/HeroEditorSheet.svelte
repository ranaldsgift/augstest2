<script lang="ts">
    import PositionedContainer from "./PositionedContainer.svelte";
    import PositionedTextEditor from "./PositionedItemEditor.svelte";
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
    import PositionedImageEditor from "./PositionedImageEditor.svelte";
    import KeywordForm from "./KeywordForm.svelte";
    import { draggable } from '@neodrag/svelte';

    export let template = ThemeTemplates.TMNT.heroSheet;
    export let hero: Hero;
    export let scale: number = 1.0;

    if (hero.theme) {
        template = ThemeTemplates[hero.theme].heroSheet;
    }

    const themeSelection: Writable<string> = writable(hero.theme ?? ThemeTemplatesEnum.TMNT);
    themeSelection.subscribe(value => { 
        var theme = value as ThemeTemplatesEnum;

        if (hero.theme != theme) {
            hero.theme = theme;
            template = ThemeTemplates[theme].heroSheet;
        }
    });

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
        const formFields: FormField[] = [
            {
                name: 'ability_name',
                type: 'text',
                value: ''
            },
            {
                name: 'ability_effect',
                type: 'textarea',
                value: ''
            }
        ]


		const c: ModalComponent = { ref: ModalFormEditor, props: { fields: JSON.stringify(formFields) } };
		const d: ModalSettings = {
			type: 'component',
			title: 'Add a Hero Ability',
			component: c,
			response: (fields: FormField[]) => {
				if (!fields)
                    return;
                
                var abilityName = fields.find(field => field.name == 'ability_name')?.value;
                var abilityEffect = fields.find(field => field.name == 'ability_effect')?.value;

                if (!abilityName || !abilityEffect) {
                    return;
                }
                
                if (!hero.abilities) {
                    hero.abilities = [];
                }

                const ability = new HeroAbility();
                ability.name = abilityName;
                ability.effect = abilityEffect;
                hero.abilities.push(ability);

                hero = hero;
			}
		};
		modalStore.trigger(d);
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

                var abilityName = fields.find(field => field.name == 'ability_name')?.value;
                var abilityEffect = fields.find(field => field.name == 'ability_effect')?.value;

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

    function handleScaleImage(event: WheelEvent) {
        if (event.deltaY > 0) {
            hero.heroImage.scale -= (1 * scaleMultiplier);
        } else {
            hero.heroImage.scale += (1 * scaleMultiplier);
        }
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

    let scaleMultiplier = 1;
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
    .hero-sheet-container[data-theme="BTAS"] .hero-action-dice-container button {
        border: none !important;
        border-radius: 0 !important;
    }
    .hero-action-dice-container button:hover {
        filter: contrast(1.5);
    }
    .hero-sheet-container[data-theme="TMNT"] .hero-action-dice-container, .hero-sheet-container[data-theme="TMNT"] :global(.positioned-text),
    .hero-sheet-container[data-theme="TMNT"] .hero-name, .hero-sheet-container[data-theme="TMNT"] :global(.keywords-container) {
        transform: skew(1.7deg, -1.7deg);
    }
    .hero-sheet-container[data-theme="TMNT"] .ability-container p {
        transform: skew(1deg, -1deg);
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
    .hero-sheet-container[data-theme="BTAS"] .hero-name {
        text-shadow: 3px 3px 1px black;
        margin-left: -2px;
    }
    :global(.ability-container *), :global(.hero-attribute-container *), :global(.hero-action-dice-container *) {
        z-index: 3;
    }
    .hero-sheet-container[data-theme="BTAS"] .hero-action-dice-container :global(.positioned-container) {
        border: 2px solid transparent;
        background: linear-gradient(#777777 0%, #fff 25%, #fff 75%, #777777 100%) border-box;
        border-radius: 4px;
    }
    .hero-sheet-container[data-theme="BTAS"] .ability-container p {
        letter-spacing: 1px;
    }
    .hero-sheet-container[data-theme="BTAS"] .hero-attribute-container>:global(button) {
        text-shadow: -2px -2px 0px black, 2px 2px 0px black, -2px 2px 0px black, 2px -2px 0px black, 2px 0px 0px black, -2px 0px 0px black, 0px -2px 0px black, 0px -2px 0px black;
    }
    .hero-sheet-container[data-theme="BTAS"] p.hero-ability-name {
        background: linear-gradient(to right, #77777700 5%, #ffffff70 25%, #ffffff70 75%, #77777700 95%)     left     bottom  no-repeat;
        background-size: 100% 1px;
        margin-bottom: 4px;
    }    
    .hero-sheet-container[data-theme="TMNT"] :global(.hero-action-dice-container svg) {
        width: calc(100% - 8px);
        height: calc(100% - 8px);
        top: 4px;
        left: 4px;
        position: relative;
    }    
    .hero-sheet-container[data-theme="BTAS"] :global(.hero-action-dice-container svg) {
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        top: 2px;
        left: 2px;
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
    }
    .hero-sheet-container[data-theme="BTAS"] .ability-container .hero-ability-effect {
        text-align: left;
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
        opacity: 0.7;
    }
    :global([contentEditable=true]:empty:before) {
    content: attr(placeholder);
    opacity: 0.6;
  }
</style>

<svelte:window
on:keydown={(e) => {
    if (e.key === 'Shift') {
        scaleMultiplier = 10; 
    }
}} 
on:keyup={(e) => { 
    scaleMultiplier = 1;
}}/>

<div class="hero-sheet-container" style:--scale={scale} data-theme={template.template_name} style:background-image="url('{template.background_image}')" style:background-color={hero.sheetBackgroundColor}>
    {#if hero.theme === ThemeTemplatesEnum.BTAS}
    <div class="noise-overlay"></div>
    {/if}
    {#if template.overlay_image}
    <div class="hero-overlay-image" style:background-image="url('{template.overlay_image}')" style:background-size="contain"></div>
    {/if}
    {#if hero.heroImage.url}
    <img class="absolute" on:wheel={handleScaleImage} use:draggable={{
        position: { x: hero.heroImage.positionLeft * scale, y:hero.heroImage.positionTop * scale },
        onDrag: ({ offsetX, offsetY }) => {
            hero.heroImage.positionLeft = offsetX;
            hero.heroImage.positionTop = offsetY;
        },
      }} src={hero.heroImage.url} alt="Hero" style:height={`${100 * (hero.heroImage.scale/100)}%`} style:width="auto">
    {:else}
    <button class="absolute" on:click={handleEditHeroImage}
        style:top={template.image.position.top}
        style:left={template.image.position.left}
        style:width={template.image.size.width}
        style:height={template.image.size.height}
    >
        <span class="border-dashed border-2 p-2 inline-block">Hero Image URL</span>
        <iconify-icon icon="mdi:edit" class="hover center" hidden></iconify-icon>
    </button>
    {/if}
    <PositionedImageEditor name="iconImage" title="Icon Image URL" bind:template={template.icon} bind:imageUrl={hero.iconImage.url} className="hero-icon-image">
    </PositionedImageEditor>
    <div class="absolute flex" style:width={template.name.size.width} style:height={template.name.size.height} style:top={template.name.position.top} style:left={template.name.position.left}>
        <span class="unstyled hero-name" style:position="relative" style:bottom="0px" style:align-self="flex-end" contenteditable="true"
        style:font-size="{!hero.fontSizeHeroName || hero.fontSizeHeroName === 0 ? template.name.font_size : hero.fontSizeHeroName}px"
        style:line-height="{!hero.fontSizeHeroName || hero.fontSizeHeroName === 0 ? template.name.font_size * 0.7 : hero.fontSizeHeroName * 0.7}px"
        style:font-family={template.name.font}
        style:color={template.name.font_color}
        placeholder="Hero Name"
        spellcheck="false"
        bind:innerHTML={hero.name}>
        </span>
    </div>
    <PositionedContainer className="keywords-container" template={template.traits}>
        <button on:click|preventDefault={handleEditKeywords} class="">
            <div
                style:text-align="left" 
                style:--fontSize="{!hero.fontSizeKeywords || hero.fontSizeKeywords === 0 ? template.traits.font_size : hero.fontSizeKeywords}px" 
                style:--fontFamily={template.traits.font} style:--color={template.traits.font_color}>
                
                {#if hero.keywords && hero.keywords.length > 0}
                {#each hero.keywords as keyword, index}
                    <span>{keyword}</span>
                    {#if index < hero.keywords.length - 1}
                    <span>&nbsp;•&nbsp;&nbsp;</span>
                    {/if}
                {/each}
                {:else}
                <span>Factions • Keywords</span>
                {/if}                
            </div>
        <iconify-icon icon="material-symbols:add" class="hover" hidden></iconify-icon>
    </button>
    </PositionedContainer>
    <div class="hero-attribute-container">
        <PositionedTextEditor name="attributes.move" type="number" template={template.move_value} bind:content={hero.attributes.move}>
        </PositionedTextEditor>
        <PositionedTextEditor name="attributes.attack" type="number" template={template.attack_value} bind:content={hero.attributes.attack}>
        </PositionedTextEditor>
        <PositionedTextEditor name="attributes.defend" type="number" template={template.defend_value} bind:content={hero.attributes.defend}>
        </PositionedTextEditor>
        <PositionedTextEditor name="attributes.skill" type="number" template={template.skill_value} bind:content={hero.attributes.skill}>
        </PositionedTextEditor>
        <PositionedTextEditor name="attributes.focus" type="number" template={template.focus_value} bind:content={hero.attributes.focus}>
        </PositionedTextEditor>
        <PositionedTextEditor name="attributes.life" type="number" template={template.life_value} bind:content={hero.attributes.life}>
        </PositionedTextEditor>
        <PositionedTextEditor name="attributes.awakening" type="number" template={template.awakening_value} bind:content={hero.attributes.awakening}>
        </PositionedTextEditor>
    </div>
    <PositionedContainer className="ability-container" template={template.ability_container}>
        {#if hero.abilities && hero.abilities.length > 0}
            {#each hero.abilities as ability, index}
            <input type="hidden" name="abilities.name" hidden bind:value={ability.name}>
            <input type="hidden" name="abilities.effect" hidden bind:value={ability.effect}>
                <button style:position="relative" on:click|preventDefault={() => handleEditAbility(index) }>
                    <p
                        class="hero-ability-name text-center pb-1" 
                        style:font-family={template.ability_name.font}
                        style:font-size="{hero.fontSizeAbilityName && hero.fontSizeAbilityName > 0 ? hero.fontSizeAbilityName * scale : template.ability_name.font_size * scale}px"
                        style:line-height="{hero.fontSizeAbilityName && hero.fontSizeAbilityName > 0 ? hero.fontSizeAbilityName * scale : template.ability_name.font_size * scale}px"
                        style:color={template.ability_name.font_color}
                    >{ability.name}</p>
                    <p 
                        style:white-space="pre-wrap"
                        class="hero-ability-effect pb-4 text-center" 
                        style:font-family={template.ability_effect.font}
                        style:font-size="{hero.fontSizeAbilityEffect && hero.fontSizeAbilityEffect > 0 ? hero.fontSizeAbilityEffect * scale : template.ability_effect.font_size * scale}px"
                        style:line-height="{hero.fontSizeAbilityEffect && hero.fontSizeAbilityEffect > 0 ? hero.fontSizeAbilityEffect * scale : template.ability_effect.font_size * scale + 2}px"
                        style:color={template.ability_effect.font_color}
                    >{ability.effect}</p>
                    <iconify-icon icon="mdi:edit" class="hover" hidden></iconify-icon>
                </button>
            {/each}
        {:else}
            <p 
                class="hero-ability-name text-center pb-1" 
                style:font-family={template.ability_name.font}
                style:font-size="{hero.fontSizeAbilityName && hero.fontSizeAbilityName > 0 ? hero.fontSizeAbilityName * scale : template.ability_name.font_size * scale}px"
                style:line-height="{hero.fontSizeAbilityName && hero.fontSizeAbilityName > 0 ? hero.fontSizeAbilityName * scale : template.ability_name.font_size * scale}px"
                style:color={template.ability_name.font_color}
            >Hero Ability Name</p>
            <p 
                class="hero-ability-effect pb-4 text-center" 
                style:font-family={template.ability_effect.font}
                style:font-size="{hero.fontSizeAbilityEffect && hero.fontSizeAbilityEffect > 0 ? hero.fontSizeAbilityEffect * scale : template.ability_effect.font_size * scale}px"
                style:line-height="{hero.fontSizeAbilityEffect && hero.fontSizeAbilityEffect > 0 ? hero.fontSizeAbilityEffect * scale : template.ability_effect.font_size * scale}px"
                style:color={template.ability_effect.font_color}
            >Hero Ability Effect</p>
        {/if}
        <div class="add-ability-button" hidden>
            <ComicButton text="Add Ability" icon="material-symbols:add" callback={handleAddAbility}></ComicButton>
        </div>            
    </PositionedContainer>
    <div class="hero-action-dice-container" style:--iconColor={hero.actionDice.iconColor}>
        <input type="hidden" name="actionDice" hidden bind:value={hero.actionDice}>
        {#if hero.actionDice}
            {#each hero.actionDice.dice as action_die, index}
            <input type="hidden" name="dice" hidden bind:value={action_die}>
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
    <svg>
        <filter id='noiseFilter'>
            <feTurbulence 
            type='fractalNoise' 
            baseFrequency='0.98' 
            numOctaves='6' 
            stitchTiles='stitch'/>
        </filter>
    </svg>
</div>