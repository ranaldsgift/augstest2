<script lang="ts">
    import { InitiativeCardTemplates } from "$lib/interfaces/templates/InitiativeCardTemplate";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { onMount } from "svelte";
    import PositionedContainer from "./PositionedContainer.svelte";
    import TextViewer from "./TextViewer.svelte";
    
    export let theme: ThemeTemplatesEnum = ThemeTemplatesEnum.TMNT;
    export let backgroundColor: string = '#000000';
    export let image: string = '';
    export let name: string = '';
    export let ability: string = '';
    export let scale: number = 1;

    const template = InitiativeCardTemplates[theme];
</script>

<style>
    .initiative-card-container {
        border-radius: 10px;
        box-shadow: black 0 0 3px 1px;
        background-size: cover;
        background-repeat: no-repeat;
        height: calc(500px * var(--scale));
        width: calc(350px * var(--scale));
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
    }
    .initiative-card-container p {
        position: absolute;
        text-align: center;
    
    }
    .initiative-card-container[data-theme='BTAS'] .name,
    .initiative-card-container[data-theme='BTAS'] .ability-text {
        text-shadow: 0px 0px 10px rgb(0 0 0 / 80%);
        fill: url(#gr-simple);
    }
    .initiative-card-container[data-theme='TMNT'] .ability-text {
        fill: white;
        stroke: black;
        stroke-width: 0.07em;
        letter-spacing: 0px;
    }
    .initiative-card-container[data-theme='TMNT'] .initiative-card-name {
        letter-spacing: -1px;
    }
    .initiative-card-container[data-theme='BTAS'] .initiative-card-name p {
        transform: scaleX(80%) scaleY(110%);
        letter-spacing: calc(4px * var(--scale));
    }
    .initiative-card-image {
        padding-top: calc(15px*var(--scale));
        padding-bottom: calc(15px*var(--scale));
        position: absolute;
        width: var(--width);
        height: var(--height);
        object-fit: cover;
    }
    svg {
        top: calc(var(--top) * var(--scale));
        left: calc(var(--left) * var(--scale));
        width: calc(var(--width) * var(--scale));
        height: calc(var(--height) * var(--scale));
    }
    .text {
        font: calc(var(--fontSize) * var(--scale)) var(--fontFamily), Impact;
        text-transform: uppercase;
    }
    .initiative-card-name {
        top: calc(var(--top) * var(--scale));
        left: calc(var(--left) * var(--scale));
        width: calc(var(--width) * var(--scale));
        height: calc(var(--height) * var(--scale));
    }
    p {
        font-size: calc(var(--fontSize) * var(--scale));
        line-height: calc(var(--lineHeight) * var(--scale));
    }
    .initiative-card-container[data-theme='TMNT'] .initiative-card-name p {
        letter-spacing: 3px;
    }
    .gradient-heading {
        letter-spacing: 2px;
    }
    .halftone-container {
	    --size: calc(0.55rem * var(--scale));
	    --mask: radial-gradient(circle at center, rgb(0 0 0), rgb(0 0 0 / 0.2));
        --dotsColor: 255 255 255;
        --bg: radial-gradient(circle at center, rgb(var(--dotsColor)) 20%, rgb(var(--dotsColor) / 0.4) var(--dotRadius, 115%));
        --bgSize: var(--size);
        background: var(--cardBg);
        overflow: hidden;
        position: absolute;
        width: 200%;
        height: 100%;
        opacity: 0.1;

    }
    .halftone {
        position: relative;
        aspect-ratio: 1;
        background: rgb(0 0 0);
        filter: contrast(var(--contrast, 20)) invert(var(--invert, 0));
        mix-blend-mode: var(--blendMode, multiply);
        width: 100%;
        height: 100%;
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
</style>

<div data-theme={theme} class="initiative-card-container" style:background-image="url('{template.background_image}')" style:background-color={backgroundColor} style:--scale={scale}>
    {#if theme === ThemeTemplatesEnum.TMNT}
        <div class="halftone-container"><div class="halftone"></div></div>
    {/if}
    <img class="initiative-card-image" src={image} style:--height='100%' alt="Initiative Card" />
    {#if template.overlay_image}
        <div style:background="url('{template.overlay_image}')" style:width="100%" style:height="100%" style:position="absolute" style:background-size="cover" style:opacity="0.9"></div>
    {/if}
<!--     <div
        class="initiative-card-name absolute flex justify-center items-end"
        style:--top={template.name.position.top}
        style:--left={template.name.position.left}
        style:--width={template.name.size.width}
        style:--height={template.name.size.height}
    >
        <p
        data-content={name}
        class="name {theme === ThemeTemplatesEnum.BTAS ? ' gradient-heading' : ' text-outline-large'}"
        style:bottom="0px"
        style:--fontSize="{template.name.fontSize}px"
        style:--lineHeight="{template.name.fontSize - 14}px"
        style:color={template.name.fontColor}
        style:font-family={template.name.font}>{name}</p>
    </div> -->
    <PositionedContainer template={template.name}>
        <TextViewer template={template.nameText} text={name}></TextViewer>
    </PositionedContainer>
    <PositionedContainer template={template.ability}>
        <TextViewer template={template.abilityText} text={ability}></TextViewer>
    </PositionedContainer>
    <!-- <svg
    class="absolute"
    style:--top={template.ability.position.top}
    style:--left={template.ability.position.left}
    style:--width={template.ability.size.width}
    style:--height={template.ability.size.height}
    style:--fontSize="{template.ability.fontSize}px"
    style:--color={template.ability.fontColor}
    style:--fontFamily={template.ability.font}>
        <linearGradient id="gr-simple" x1="1" y1="0" x2="100%" y2="100%">
          <stop stop-color="#ffffff" offset="10%"/>
          <stop stop-color="#ffffff" offset="65%"/>
          <stop stop-color="#7d7d7d" offset="80%"/>
          <stop stop-color="#ffffff" offset="90%"/>
        </linearGradient>
        <text
            text-anchor="middle"
            x="50%"
            y="28%"
            dy=".35em"
            class="ability-text text text-stroke"
        >
            {ability}
        </text>
      </svg> -->
</div>