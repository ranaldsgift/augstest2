<script lang="ts">
    import { SkillCard } from "$lib/entities/SkillCard";
    import { SkillCardTemplates, type SkillCardTemplate } from "$lib/interfaces/templates/SkillCardTemplate";
    import { modalStore, toastStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
    import PositionedContainer from "./PositionedContainer.svelte";
    import { SkillCardIconsEnum } from "$lib/enums/Enums";
    import SkillCardIconForm from "./SkillCardIconForm.svelte";
    import SkillCardIcon from "./SkillCardIcon.svelte";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import TextEditor from "./TextEditor.svelte";
    import ImageEditor from "./ImageEditor.svelte";
    import TextViewer from "./TextViewer.svelte";
    
    export let scale: number = 0.7;
    export let theme: ThemeTemplatesEnum | null = null;
    export let heroName: string = '';
    export let skillCard: SkillCard = new SkillCard();
    export let backgroundColor: string | null = null;
    export let template: SkillCardTemplate | null = null;

    if (!theme) {
        if (skillCard.hero) {
            theme = skillCard.hero.theme;
        }
        else if (skillCard.theme && skillCard.theme.length > 0) {
            theme = skillCard.theme;
        }
        else {
            theme = ThemeTemplatesEnum.TMNT;
        }
    }

    if (!heroName || heroName.length === 0) {
        if (skillCard.hero) {
            heroName = skillCard.hero.name;
        }
        else {
            heroName = '';
        }
    }

    if (!template) {
        if (skillCard.hero) {
            template = SkillCardTemplates[skillCard.hero.theme];
        }
        else {
            template = SkillCardTemplates[theme];
        }
    }

    if (!backgroundColor) {
        if (skillCard.hero) {
            backgroundColor = skillCard.hero.sheetBackgroundColor;
        }
        else if (skillCard.backgroundColor && skillCard.backgroundColor.length > 0) {
            backgroundColor = skillCard.backgroundColor;
        }
        else {
            backgroundColor = '#adadad';
        }
    }

    function handleAddCost() {
        if (!skillCard.iconCost) {
            skillCard.iconCost = [];
        }
            
        skillCard.iconCost.push(SkillCardIconsEnum.Melee);
        skillCard = skillCard;
    }

    function handleEditCost(index: number) {
        const icon = skillCard.iconCost ? skillCard.iconCost[index] : SkillCardIconsEnum.Melee;
		const c: ModalComponent = { ref: SkillCardIconForm, props: { "theme": theme, "icon": icon } };
		const d: ModalSettings = {
			type: 'component',
			title: 'Select an Icon',
			component: c,
			response: (icon: any) => {
				if (!icon) {
                    if (icon === null) {
                        skillCard.iconCost.splice(index, 1);
                        skillCard = skillCard;
                    }
                    return;
                }
                
                skillCard.iconCost[index] = icon;
                skillCard = skillCard;
			}
		};
		modalStore.trigger(d);

    }
</script>

<style lang="scss">
    .skill-card-container {
    height: calc(800px * var(--scale));
    width: calc(588px * var(--scale));
    position: relative;
    overflow: hidden;
    box-shadow: black 0 0 3px 1px;
    border-radius: 10px;
    }

    .skill-card-character-name {
        font-size: calc(var(--fontSize) * var(--scale));
        font-family: var(--fontFamily);
        color: var(--fontColor);
        line-height: calc(var(--fontSize) * var(--scale));
    }
    .skill-card-effect {
        font-size: calc(var(--fontSize) * var(--scale));
        line-height: calc(var(--fontSize) * var(--scale));
        font-family: var(--fontFamily);
        color: var(--fontColor);
        height: 100%;
    }
    .skill-card-effect:empty {
        line-height: calc(calc(var(--height) * var(--scale)) - 1px) !important;
    }
    .skill-card-image-url {
        text-align: center;
        line-height: 2rem;
    }
    .skill-card-cost-container .icon:hover {
        filter: contrast(1.2);
    }
    .skill-card-overlay-container {
        pointer-events: none;
    }
    .skill-card-container[data-theme='TMNT'] {
        .skill-card-halftone-background {
            display: inherit;
            width: 100%;
            height: 100%;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }

        .skill-card-container>* {
            position: absolute;
        }

        .skill-card-overlay {
            width: 100%;
            height: 100%;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }

        .skill-card-image-container {
            top: calc(65px * var(--scale));
            left: calc(65px * var(--scale));
            height: calc(340px * var(--scale));
            width: calc(100% - calc(130px * var(--scale)));
            overflow: hidden;
        }

        .skill-card-image {
            max-width: none;
            max-height: none;
            object-fit: cover;
        }

        .skill-card-name {    
            font-size: var(--font-size);
            font-family: bangersregular;
            top: calc(393px * var(--scale));
            color: #ffffff;
            left: calc(75px * var(--scale));
            width: 100%;
            text-align: center;
            letter-spacing: 1px;
            transform: rotate(-2deg);
            display: grid;
            height: calc(80px * var(--scale));
            align-content: center;
            align-self: center;
        }

        .skill-card-name span {
            text-align: center;
        }
        .skill-card-character-name {
            bottom: 75px;
            width: 100%;
            text-align: center;
            letter-spacing: 1px;
        }

        .skill-card-settings {
            display: grid;
            grid-row-gap: 10px;
        }

        input#addSkillcardCost {
            border-radius: 5px 5px 0 0;
        }

        .skill-card-cost-container {
            left: calc(50px * var(--scale));
            top: -1px;
            width: calc(80px * var(--scale));
            display: grid;
            grid-row-gap: 1px;
            padding: calc(64px * var(--scale)) 0 calc(20px * var(--scale)) 0px;
            background: linear-gradient(0deg, #101010, #3e3e3e);
            justify-content: center;
            clip-path: polygon(0 0, 100% 0, 100% 93%, 0 100%);
            position: absolute;
        }

        .skill-card-cost-container:empty {
            display: none;
        }

        .skill-card-cost-container .icon {
            height: calc(60px * var(--scale));
            width: calc(60px * var(--scale));
            background-size: contain;
            background-color: #221f20;
            border-radius: 999px;
            background-position: center;
            background-repeat: no-repeat;
        }

        .skill-card-homebrew-container {
            display: flex;
            column-gap: 10px;
            row-gap: 10px;
            flex-wrap: wrap;
        }
        .skill-card-background-css {
            display: inherit;
            background-image: linear-gradient(160deg, var(--backgroundColor) calc(50% - 1px), #ffffff 50%);
        }
        .skill-card-overlay {
            background: var(--background);
            background-size: contain;
        }
        .skill-card-halftone-background, .halftone-container {
            --size: calc(0.95rem * var(--scale));
            --mask: radial-gradient(circle at center, rgb(0 0 0), rgb(0 0 0 / 0) 85%);
            --dotsColor: 255 255 255;
            --bg: radial-gradient(circle at center, rgb(var(--dotsColor)) 20%, rgb(var(--dotsColor) / 0.4) var(--dotRadius, 115%));
            --bgSize: var(--size);
            background: var(--cardBg);
            overflow: hidden;
            position: absolute;
            transform: rotate(-15deg);
            width: 150%;
            height: 150%;
            top: -25%;
            left: -25%;
            opacity: 0.1;
            display: inherit;
        }
        .halftone-container.top {
            --bgSize: calc(1rem * var(--scale));
            --bgPosition: calc(var(--bgSize) / 2);
            --stops: rgb(var(--dotsColor)) 10%, rgb(var(--dotsColor) / 0.15) 60%;
            --bg: radial-gradient(circle at center, rgb(var(--dotsColor)) 20%, rgb(var(--dotsColor) / 0.4) var(--dotRadius, 105%));
            --mask: radial-gradient(circle at top, rgb(0 0 0), rgb(0 0 0 / 0.15));
            opacity: 0.03;
            transform: rotate(-15deg);
        }
        .halftone {
            position: relative;
            aspect-ratio: 1;
            background: rgb(0 0 0);
            filter: contrast(var(--contrast, 20)) invert(1);
            mix-blend-mode: var(--blendMode, multiply);
            width: 168%;
            height: 100%;
            left: -34%;
        }
        .halftone::before {
            content: '';
            position: absolute;
            inset: 0;
            background-image: var(--bg);
            background-size: var(--bgSize, 0.75rem) var(--bgSize, 0.75rem);
            background-repeat: round;
            background-position: 0 0, var(--bgPosition) var(--bgPosition);
            -webkit-mask-image: var(--mask);
            mask-image: var(--mask);
            mask-size: cover;
            mask-position: center;
            transition: background-size 100ms;
        }
        .skill-card-effect {
            font-size: calc(var(--fontSize) * var(--scale));
            line-height: calc(var(--fontSize) * var(--scale));
            font-family: var(--fontFamily);
            padding-top: 1px;
        }
        .skill-card-effect {
            font-weight: bold;
            font-style: italic;
            text-align: center;
        }
        .skill-card-overlay-container {
            border: calc(6px * var(--scale)) solid black;
            left: calc(65px * var(--scale));
            top: calc(65px * var(--scale));
            width: calc(100% - calc(130px * var(--scale)));
            height: calc(100% - calc(130px * var(--scale)));
            box-shadow: calc(8px * var(--scale)) calc(10px * var(--scale)) 0px calc(-2px * var(--scale)) #00000040;
            position: absolute;
        }
        .skill-card-name-container {
            position: absolute;
            top: calc(300px * var(--scale));
            width: 100%;
            height: calc(108px * var(--scale));
            background: #191919;
            clip-path: polygon(calc(-1px * var(--scale)) calc(28px * var(--scale)), calc(100% + calc(1px * var(--scale))) 0%, calc(100% + calc(1px * var(--scale))) calc(100% - calc(14px * var(--scale))), calc(-1px * var(--scale)) 100%);
        }
        .skill-card-image-container {
            border: calc(12px * var(--scale)) solid #191919;
            border-bottom: none;
            position: absolute;
        }
        .skill-card-effect-container {
            position: absolute;
            top: calc(392px * var(--scale));
            width: 100%;
            height: calc(100% - calc(392px * var(--scale)));
            background: white;
            overflow: hidden;
        }
        .skill-card-footer-container {
            position: absolute;
            bottom: 0;
            width: 100%;
            height: calc(25px * var(--scale));
            background: #191919;
            overflow: hidden;
        }
    }
    .skill-card-container[data-theme='BTAS'] {
        .skill-card-container>* {
            position: absolute;
        }

        .skill-card-overlay {
            width: 100%;
            height: 100%;
            background-size: contain;
            background-position: center;
            background-repeat: no-repeat;
        }

        .skill-card-image-container {
            top: calc(50px * var(--scale));
            left: calc(55px * var(--scale));
            height: calc(350px * var(--scale));
            width: calc(100% - calc(110px * var(--scale)));
            overflow: hidden;
            position: absolute;    
            border: calc(2px * var(--scale)) solid transparent;
            background: linear-gradient(#777777 0%, #fff 25%, #fff 75%, #777777 100%) border-box;
            border-radius: 4px;
        }

        .skill-card-image {
            max-width: none;
            max-height: none;
            object-fit: cover;
        }

        .skill-card-name {
            font-size: var(--font-size);
            width: 100%;
            background: linear-gradient(to right, #77777700 0px, #ffffff70 15%, #ffffff 50%, #ffffff70 85%, #77777700 100%) left bottom no-repeat;
            background-size: 100% 1px;
            position: absolute;
            align-self: center;
            letter-spacing: 1px;
            text-align: center;
            display: grid;
            max-height: 100%;
        }
        .skill-card-name span {
            padding: 6px 0;
        }

        .skill-card-character-name {
            width: 100%;
            text-align: center;
            letter-spacing: 1px;
        }

        .skill-card-settings {
            display: grid;
            grid-row-gap: 10px;
        }

        input#addSkillcardCost {
            border-radius: 5px 5px 0 0;
        }

        .skill-card-cost-container {
            left: calc(45px * var(--scale));
            top: 0px;
            width: calc(47px * var(--scale));
            display: grid;
            grid-row-gap: 6px;
            padding: calc(25px * var(--scale)) 0 calc(25px * var(--scale)) 0px;
            justify-content: center;
            position: absolute;
        }

        .skill-card-cost-container::after {
            position: absolute;
            width: calc(100% - calc(4px * var(--scale)));
            height: calc(100% - calc(4px * var(--scale)));
            background: linear-gradient(0deg, #222222 0%, #303030 15px, #222222 30px, #1a1a1a 100%);
            content: '';
            margin-left: calc(2px * var(--scale));
            margin-bottom: 0px;
            border-radius: 0 0 10px 10px;
        }

        .skill-card-cost-container::before {
            position: absolute;
            content: '';
            width: 100%;
            height: 100%;
            border: calc(2px * var(--scale)) solid transparent;
            background: linear-gradient(#777777 0%, #a7a7a7 25%, #a7a7a7 75%, #77777700 100%) border-box;
            border-radius: 0 0 10px 10px;
        }

        .skill-card-cost-container:empty {
            display: none;
        }

        .skill-card-cost-container .icon {
            height: calc(74px  * var(--scale));
            width: calc(74px * var(--scale));
            background-size: contain;
            background-color: #221f20;
            border-radius: 999px;
            background-position: center;
            background-repeat: no-repeat;
            background: linear-gradient(0deg, #101010, #3e3e3e);
            z-index: 10;
            position: relative;
        }
        .skill-card-cost-container .icon::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            border-radius: 999px;
            background: linear-gradient(#a7a7a7 0%, #77777797 45%, #77777797 75%, #757575 100%) border-box;
            z-index: -1;
        }

        .skill-card-cost-container .icon::after {
            content: '';
            position: absolute;
            top: calc(1.5px * var(--scale));;
            left: calc(1.5px * var(--scale));;
            width: calc(100% - calc(3px * var(--scale)));
            height: calc(100% - calc(3px * var(--scale)));
            background: radial-gradient(circle, #3e3e3e, #101010);
            border-radius: 999px;
            z-index: -1;
        }

        .skill-card-homebrew-container {
            display: flex;
            column-gap: 10px;
            row-gap: 10px;
            flex-wrap: wrap;
        }
        .skill-card-background {
            display: inherit;
            background-size: cover;
        }
        .skill-card-overlay {
            background: var(--background);
            background-size: contain;
        }
        .skill-card-effect {
            text-align: center;
            padding-top: 1px;
            text-transform: none;
            padding: 0 10px;
            line-height: calc(var(--fontSize) * var(--scale) + 2px);
            display: grid;
            align-content: center;
            height: 100%;
        }
        .skill-card-name-container {
            position: absolute;
            width: 100%;
        }
        .skill-card-effect-container {
            position: absolute;
            top: calc(392px * var(--scale));
            width: 100%;
            height: calc(100% - calc(392px * var(--scale)));
            background: white;
            overflow: hidden;
        }
        .skill-card-footer-container {
            position: absolute;
            bottom: 0;
            width: calc(100% + 24px);
            left: -12px;
            border-radius: 8px;
            height: calc(35px * var(--scale));
            overflow: hidden;
            border: calc(2px * var(--scale)) solid transparent;
            background: linear-gradient(#777777 0%, #ffffff 25%, #ffffff 75%, #777777 100%) border-box;
        }
        .skill-card-footer-container::after {
            content: '';
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #3e3e3e, #222222 45%, #3e3e3e);
            position: absolute;
            top: 0;
            left: 0;
        }
        .skill-card-overlay-container {
            left: calc(65px * var(--scale));
            top: calc(400px * var(--scale));
            width: calc(100% - calc(130px * var(--scale)));
            height: calc(360px * var(--scale));
            background: black;
            background-image: linear-gradient(0deg, #454545 0%, #171717 100%);
            position: relative;
            box-shadow: inset 0 0 calc(50px * var(--scale)) 10px #000000;
        }
    }
</style>

{#if template && theme}
<div class="skill-card-container" style:--scale={scale} data-theme={theme}>
    <div class="skill-card-background absolute w-full h-full  hidden" style:background="url('{template.background_image}') no-repeat center / cover, {backgroundColor}" style:background-size="cover"></div>
    <div class="skill-card-background-css w-full h-full hidden" style:--backgroundColor={backgroundColor}></div>
    {#if theme === ThemeTemplatesEnum.TMNT}
    <div class="skill-card-halftone-background absolute h-full w-full hidden"><div class="halftone"></div></div>
    {/if}
    {#if theme === ThemeTemplatesEnum.BTAS}
    <img class="absolute w-full h-full mix-blend-color-burn" src="/images/overlays/paper.png" alt="Paper Background Effect">
    {/if}
    <div class="skill-card-image-container">
        <ImageEditor bind:image={skillCard.image} scale={scale} classList="bg-primary-200-700-token" inputContainerClassList="bottom-[calc(40px*var(--scale))]"></ImageEditor>
    </div>

    <div class="skill-card-overlay-container w-full h-full absolute">
        <div class="skill-card-effect-container"><div class="halftone-container top hidden"><div class="halftone"></div></div></div>
        <div class="skill-card-name-container z-30"></div>
        <div class="skill-card-footer-container"></div>
    </div>

    <button class="absolute left-1 top-1 context-button z-50 items-center" on:click|preventDefault={handleAddCost}>
        <iconify-icon icon="material-symbols:add-circle-rounded"></iconify-icon> 
        <p class="unstyled text-white" style:line-height="24px">Cost</p>
    </button>

    {#if skillCard.iconCost && skillCard.iconCost.length > 0}
    <div class="skill-card-cost-container z-30">
        {#each skillCard.iconCost as icon, i}
        <button class="icon" style:padding="calc(12px * var(--scale))" on:click|preventDefault={() => handleEditCost(i)}><SkillCardIcon icon={icon} color="#ffffff" theme={theme}></SkillCardIcon></button>
        {/each}
    </div>
    {/if}
    <PositionedContainer template={template.nameContainer} classList="!grid">
        <TextEditor bind:text={skillCard.name} placeholder="Skill Name" template={template.name}></TextEditor>
    </PositionedContainer>
    <PositionedContainer template={template.abilityContainer}>
        <TextEditor bind:text={skillCard.effect} placeholder="Skill Effect" template={template.ability}></TextEditor>
    </PositionedContainer>
    <PositionedContainer template={template.characterNameContainer}>
        <TextViewer text={heroName} template={template.characterName}></TextViewer>
    </PositionedContainer>
</div>
{/if}