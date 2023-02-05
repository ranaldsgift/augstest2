<script lang="ts">
    import { Image } from "$lib/entities/Image";
    import { SkillCard } from "$lib/entities/SkillCard";
    import { SkillCardTemplates, type SkillCardTemplate } from "$lib/interfaces/templates/SkillCardTemplate";
    import { modalStore, toastStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
    import PositionedContainer from "./PositionedContainer.svelte";
    import { draggable } from "@neodrag/svelte";
    import { ToastHelper } from "$lib/helpers/ToastHelper";
    import { SkillCardIconsEnum } from "$lib/enums/Enums";
    import SkillCardIconForm from "./SkillCardIconForm.svelte";
    import SkillCardIcon from "./SkillCardIcon.svelte";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    
    export let scale: number = 0.7;
    export let theme: ThemeTemplatesEnum = ThemeTemplatesEnum.TMNT;
    export let heroName: string = '';
    export let skillCard: SkillCard = new SkillCard();
    export let backgroundColor = "#adadad";
    export let template: SkillCardTemplate = SkillCardTemplates.TMNT;

    if (skillCard.hero) {
        //theme = skillCard.hero.theme;
        template = SkillCardTemplates[skillCard.hero.theme];
    }

    function handleEditImage() {
        const prompt: ModalSettings = {
            type: 'prompt',
            title: 'Skill Card Image',
            body: 'Provide an image URL. The image host will affect if the image is rendered correctly when the Hero sheet PNG is generated. Approved hosts: https://imgur.com',
            // Populates the initial input value
            value: skillCard.image.url && skillCard.image.url.length > 0 ? skillCard.image.url : '',
            // Returns the updated response value
            response: (heroImage: string) => {
                if (heroImage && heroImage.length > 0) {
                    skillCard.image.url = heroImage;
                }
            }
        };
        modalStore.trigger(prompt);
    }

    function handleAddCost() {
        if (!skillCard.iconCost) {
            skillCard.iconCost = [];
        }
            
        console.log('handleAddCost');
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

    function handleScaleImage(event: WheelEvent) {
        if (!scaleAndDrag) return;

        event.preventDefault();

        if (event.deltaY > 0) {
            skillCard.image.scale -= (1 * scaleMultiplier);
        } else {
            skillCard.image.scale += (1 * scaleMultiplier);
        }
        skillCard = skillCard;
    }

    function toggleScalable() {
        if (!localStorage.getItem('image-scaling-alert')) {
            toastStore.trigger({
                preset: 'secondary',
                message: `Image scaling enabled.<br/>Use scrollwheel to scale image.<br/>Press again to disable`,
                autohide: false
            });
            localStorage.setItem('image-scaling-alert', 'true');
        }

        scalable = !scalable;
        scaleAndDrag = !scaleAndDrag;
    }

    let scaleAndDrag = false;
    let scalable = false;
    let scaleMultiplier = 1;
</script>

<style lang="scss">
    .skill-card-container {
    height: calc(800px * var(--scale));
    width: calc(588px * var(--scale));
    position: relative;
    overflow: hidden;
    box-shadow: black 0 0 3px 1px;
    border-radius: 5px;
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
            color: #fff;
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
            left: 50px;
            top: 0px;
            width: 80px;
            display: grid;
            grid-row-gap: 1px;
            padding: 64px 0 20px 0px;
            background: linear-gradient(0deg, #101010, #3e3e3e);
            justify-content: center;
            clip-path: polygon(0 0, 100% 0, 100% 93%, 0 100%);
            position: absolute;
        }

        .skill-card-cost-container:empty {
            display: none;
        }

        .skill-card-cost-container .icon {
            height: 60px;
            width: 60px;
            background-size: contain;
            background-color: #221f20;
            border-radius: 30px;
            background-position: center;
            background-repeat: no-repeat;
        }

        .skill-card-cost-container .icon[data-icon='focus'] {
            background-size: 80%;
        }

        .skill-card-cost-container .icon[data-icon='one-time-use'] {
            background-size: 68%;
        }

        .skill-card-cost-container .icon[data-icon='wild'] {
            background-size: 78%;
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
            --size: 0.95rem;
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
            --bgSize: 1rem;
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
            border: 6px solid black;
            left: calc(65px * var(--scale));
            top: calc(65px * var(--scale));
            width: calc(100% - calc(130px * var(--scale)));
            height: calc(100% - calc(130px * var(--scale)));
            box-shadow: calc(8px * var(--scale)) calc(10px * var(--scale)) 0px -2px #00000040;
            position: absolute;
        }
        .skill-card-name-container {
            position: absolute;
            top: calc(300px * var(--scale));
            width: 100%;
            height: calc(108px * var(--scale));
            background: #191919;
            clip-path: polygon(-1px calc(28px * var(--scale)), calc(100% + 1px) 0%, calc(100% + 1px) calc(100% - calc(14px * var(--scale))), -1px 100%);
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
            border: 2px solid transparent;
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
            left: 50px;
            top: 0px;
            width: 80px;
            display: grid;
            grid-row-gap: 1px;
            padding: 64px 0 20px 0px;
            background: linear-gradient(0deg, #101010, #3e3e3e);
            justify-content: center;
            clip-path: polygon(0 0, 100% 0, 100% 93%, 0 100%);
            position: absolute;
        }

        .skill-card-cost-container:empty {
            display: none;
        }

        .skill-card-cost-container .icon {
            height: 60px;
            width: 60px;
            background-size: contain;
            background-color: #221f20;
            border-radius: 30px;
            background-position: center;
            background-repeat: no-repeat;
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
            border: 2px solid transparent;
            background: linear-gradient(#777777 0%, #fff 25%, #fff 75%, #777777 100%) border-box;
        }
        .skill-card-footer-container::after {
            content: '';
            width: 100%;
            height: 100%;
            background: linear-gradient(180deg, #3e3e3e, #222222 45%, #3e3e3e);
            position: absolute;
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

<svelte:window
on:keydown={(e) => {
    if (e.key === 'Shift') {
        scaleMultiplier = 10; 
    }
}} 
on:keyup={(e) => { 
    scaleMultiplier = 1;
}}/>

<div class="skill-card-container" style:--scale={scale} data-theme={theme}>
    <button class="absolute left-1 top-1 context-button z-50 h-8 content-center justify-center align-middle" on:click|preventDefault={handleAddCost}>
        <iconify-icon icon="material-symbols:add-circle-rounded"></iconify-icon> 
        <p class="unstyled text-white" style:line-height="24px">Cost</p>
    </button>
    <div class="skill-card-background absolute w-full h-full  hidden" style:background="url('{template.background_image}') no-repeat center / cover, {backgroundColor}" style:background-size="cover"></div>
    <div class="skill-card-background-css w-full h-full hidden" style:--backgroundColor={backgroundColor}></div>
    <div class="skill-card-halftone-background absolute h-full w-full hidden"><div class="halftone"></div></div>
    <div class="skill-card-image-container">
        <div class="show-on-hover absolute z-20 left-1 bottom-10 w-full" style:display={scaleAndDrag ? 'none' : ''}>
            <span class="skill-card-image-url h-10 border-black border-2 grid content-center bg-primary-900 text-primary-100 overflow-hidden" 
                style:width="calc(100% - 8px)"
                placeholder="Image URL" 
                contenteditable="true" 
                bind:innerHTML={skillCard.image.url}
            >
                {skillCard.image.url ?? ''}
            </span>    
        </div>        
        {#if skillCard.image && skillCard.image.url.length > 0}
            <div class="w-full h-full absolute flex context-button-container  {scalable ? 'scale-and-drag' : ''}">
                <iconify-icon icon="mdi:arrow-expand-all" class="context-button p-1 absolute right-1 top-1 {scalable ? 'active' : ''}" 
                    on:click={toggleScalable} 
                    on:keydown={toggleScalable}
                ></iconify-icon>
<!--                 <div class="bg-primary-100 z-20 card-shadow show-on-hover gap-1 p-1 absolute -right-1 -top-1 pr-2 pt-2">
                    <iconify-icon icon="mdi:arrow-expand-all" class="context-button hidden {scalable ? 'active' : ''}" 
                        on:click={toggleScalable} 
                        on:keydown={toggleScalable}
                    ></iconify-icon>
                </div> -->
                <img class="skill-card-image z-10 absolute" style:width="{skillCard.image.scale}%" src={skillCard.image.url} alt="Card" 
                    on:wheel={handleScaleImage}
                    use:draggable={{
                        disabled: !scaleAndDrag,
                        position: { x: skillCard.image.positionLeft, y: skillCard.image.positionTop },
                        onDrag: ({ offsetX, offsetY }) => {
                            skillCard.image.positionLeft = offsetX;
                            skillCard.image.positionTop = offsetY;
                        },
                    }}
                >
            </div>
        {:else}
        <div class="absolute z-10 w-full h-full bg-secondary-900 text-center grid justify-center content-center">
            {#if !skillCard.image || skillCard.image.url.length === 0}
            <span class="border-dashed border-2 p-2 inline-block text-white">Image URL</span>
            {/if}
        </div>
        {/if}
    </div>

    <div class="skill-card-overlay-container w-full h-full absolute">
        <div class="skill-card-effect-container"><div class="halftone-container top hidden"><div class="halftone"></div></div></div>
        <div class="skill-card-name-container z-30"></div>
        <div class="skill-card-footer-container"></div>
    </div>

    {#if skillCard.iconCost && skillCard.iconCost.length > 0}
    <div class="skill-card-cost-container z-30">
        {#each skillCard.iconCost as icon, i}
        <button class="icon p-3" on:click|preventDefault={() => handleEditCost(i)}><SkillCardIcon icon={icon} color="#ffffff" theme={theme}></SkillCardIcon></button>
        {/each}
    </div>
    {/if}
    <PositionedContainer template={template.name}>
        <div class="skill-card-name overflow-hidden z-40">
            <span contenteditable="true" spellcheck="false" placeholder="Skill Name" bind:innerHTML={skillCard.name}
                style:--fontSize="{template.name.font_size}px" 
                style:font-size="calc(var(--fontSize) * var(--scale))"
                style:font-family={template.name.font}
                style:color={template.name.font_color}
                style:white-space="nowrap"
            >
                {skillCard.name ?? ''}
            </span>
        </div>
    </PositionedContainer>
    <PositionedContainer template={template.ability}>
        <span class="skill-card-effect" contenteditable="true" spellcheck="false" placeholder="Skill Effect"  bind:innerHTML={skillCard.effect}
            style:--fontSize="{template.ability.font_size}px"
            style:--fontFamily={template.ability.font}
            style:--fontColor={template.ability.font_color}
        >
            {skillCard.effect ?? ''}
        </span>
    </PositionedContainer>
    <div class="absolute grid content-center"
        style:--left={template.character_name.position.left}
        style:--top={template.character_name.position.top}
        style:--width={template.character_name.size.width}
        style:--height={template.character_name.size.height}
        style:left="calc(var(--left) * var(--scale))"
        style:top="calc(var(--top) * var(--scale))"
        style:width="calc(var(--width) * var(--scale))"
        style:height="calc(var(--height) * var(--scale))"
    >
    <span class="skill-card-character-name"
        style:--fontSize="{template.character_name.font_size}px"
        style:--fontFamily={template.character_name.font}
        style:--fontColor={template.character_name.font_color}
    >
        {heroName ?? ''}
    </span>
    </div>
</div>