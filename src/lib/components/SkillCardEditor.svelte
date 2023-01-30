<script lang="ts">
    import { Image } from "$lib/entities/Image";
    import { SkillCard } from "$lib/entities/SkillCard";
    import { SkillCardTemplates, type SkillCardTemplate } from "$lib/interfaces/templates/SkillCardTemplate";
    import { modalStore, type ModalSettings } from "@skeletonlabs/skeleton";
    import PositionedContainer from "./PositionedContainer.svelte";
    
    export let scale: number = 1;

    export let skillCard: SkillCard = new SkillCard();
    export let backgroundColor = "#adadad";
    export let template: SkillCardTemplate = SkillCardTemplates.TMNT;

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
</script>

<style>
.skill-card-editor-container {
  height: calc(800px * var(--scale));
  width: calc(588px * var(--scale));
  position: relative;
  overflow: hidden;
box-shadow: black 0 0 3px 1px;
border-radius: 5px;
}

.skill-card-halftone-background {
  width: 100%;
  height: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.skill-card-editor-container>* {
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
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.skill-card-name {    
    font-size: var(--font-size);
    font-family: bangersregular;
    top: calc(393px * var(--scale));
    color: #fff;
    left: calc(75px * var(--scale));
    width: calc(100% - calc(150px * var(--scale)));
    text-align: center;
    letter-spacing: 1px;
    transform: rotate(-2deg);
    display: grid;
    height: calc(80px * var(--scale));
    align-content: center;
}

.skill-card-character-name {
  font-size: calc(var(--fontSize) * var(--scale));
  font-family: bangersregular;
  color: #fff;
  bottom: 75px;
  width: 100%;
  text-align: center;
  letter-spacing: 1px;
}

.skill-card-background {
  background: var(--background-color);
  height: 100%;
  width: 100%;
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
  width: 80px;
  display: grid;
  grid-row-gap: 1px;
  padding: 64px 0 20px 0px;
  background: url('../images/homebrew/halftone-overlay.png'), linear-gradient(0deg, #101010, #3e3e3e);
  justify-content: center;
  clip-path: polygon(0 0, 100% 0, 100% 93%, 0 100%);
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
        filter: contrast(var(--contrast, 20)) invert(var(--invert, 1));
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
    }
    .skill-card-editor-container[data-theme='TMNT'] .skill-card-effect {
        font-weight: bold;
        font-style: italic;
        text-align: center;
    }

    .skill-card-editor-container[data-theme='TMNT'] .skill-card-overlay-container {
        border: 6px solid black;
        left: calc(65px * var(--scale));
        top: calc(65px * var(--scale));
        width: calc(100% - calc(130px * var(--scale)));
        height: calc(100% - calc(130px * var(--scale)));
        box-shadow: calc(8px * var(--scale)) calc(10px * var(--scale)) 0px -2px #00000040;
        position: relative;
    }
    .skill-card-editor-container[data-theme='TMNT'] .skill-card-name-container {
        position: absolute;
        top: calc(300px * var(--scale));
        width: 100%;
        height: calc(108px * var(--scale));
        background: #191919;
        clip-path: polygon(-1px calc(28px * var(--scale)), calc(100% + 1px) 0%, calc(100% + 1px) calc(100% - calc(14px * var(--scale))), -1px 100%);
    }
    .skill-card-editor-container[data-theme='TMNT'] .skill-card-image-container {
        border: calc(12px * var(--scale)) solid #191919;
        border-bottom: none;
    }
    .skill-card-editor-container[data-theme='TMNT'] .skill-card-effect-container {
        position: absolute;
        top: calc(392px * var(--scale));
        width: 100%;
        height: calc(100% - calc(392px * var(--scale)));
        background: white;
        overflow: hidden;
    }
    .skill-card-editor-container[data-theme='TMNT'] .skill-card-footer-container {
        position: absolute;
        bottom: 0;
        width: 100%;
        height: calc(25px * var(--scale));
        background: #191919;
        overflow: hidden;
    }
</style>

<div class="skill-card-editor-container" style:--scale={scale} data-theme={skillCard.hero ? skillCard.hero.theme : 'TMNT'}>
    <!-- <div class="skill-card-background" style:background="url('{template.background_image}')" style:background-size="contain"></div> -->
    <div class="skill-card-background-css w-full h-full" style:--backgroundColor={backgroundColor}></div>
    <div class="skill-card-halftone-background absolute h-full w-full"><div class="halftone"></div></div>
    <div class="skill-card-image-container" style:background="green" >
        {#if skillCard.image && skillCard.image.url.length > 0}
            <iconify-icon icon="mdi:edit" class="hover z-20 cursor-pointer" hidden on:click={handleEditImage} on:keydown={handleEditImage}></iconify-icon>
            <img class="skill-card-image z-10 absolute" style="--left: 0px; --top: 0px; --size: 100%;" src={skillCard.image.url} alt="Card">
        {:else}
        <button class="absolute z-10 w-full h-full" on:click={handleEditImage}>
            <span class="border-dashed border-2 p-2 inline-block {skillCard.image && skillCard.image.url.length > 0 ? 'hidden' : ''}">Image URL</span>
            <iconify-icon icon="mdi:edit" class="hover" hidden></iconify-icon>
        </button>
        {/if}
    </div>

    <div class="skill-card-overlay-container w-full h-full absolute">
        <div class="skill-card-effect-container"><div class="halftone-container top"><div class="halftone"></div></div></div>
        <div class="skill-card-name-container z-30"></div>
        <div class="skill-card-footer-container"></div>
    </div>

    <div class="skill-card-cost-container"></div>
    <div class="skill-card-name overflow-hidden z-40">
        <span contenteditable="true" bind:innerHTML={skillCard.name}
            style:--fontSize="{template.name.font_size}px" 
            style:font-size="calc(var(--fontSize) * var(--scale))"
            style:font-family={template.name.font}
            style:color={template.name.font_color}
            style:white-space="nowrap"
        >{skillCard.name}</span>
    </div>
    <PositionedContainer template={template.ability}>
        <span class="skill-card-effect" contenteditable="true" bind:innerHTML={skillCard.effect}
            style:--fontSize="{template.ability.font_size}px"
            style:--fontFamily={template.ability.font}
            style:--fontColor={template.ability.font_color}
        >
            {skillCard.effect}
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
        {skillCard.hero ? skillCard.hero.name : 'Leonardo'}
    </span>
    </div>
</div>