<script lang="ts">
    import { InitiativeCardTemplates } from "$lib/interfaces/templates/InitiativeCardTemplate";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { onMount } from "svelte";
    
    export let theme: ThemeTemplatesEnum = ThemeTemplatesEnum.TMNT;
    export let backgroundColor: string = '#000000';
    export let image: string = '';
    export let name: string = '';
    export let ability: string = '';
    export let scale: number = 1;

    let wideImage = false;

    onMount (() => {    
        const checkWideImage = async () => {
            const img = new Image();
            img.src = image;
            await img.decode()
            console.log(img.naturalHeight / img.naturalWidth);
            if (img.naturalHeight / img.naturalWidth < 1.5) {
                wideImage = true;
            }
        };
        checkWideImage();
    });

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
    .initiative-card-container[data-theme='TMNT'] .initiative-card-name {
        -webkit-text-stroke: 5px;
        -webkit-text-stroke-color: black;
        letter-spacing: -1px;
    }
    .initiative-card-image {
        top: 15px;
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
        fill: url(#gr-simple);
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
	    --size: 0.55rem;
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
    <img class="initiative-card-image" src={image} style:--width={wideImage ? undefined : '100%'} style:--height={wideImage ? '100%' : undefined} alt="Initiative Card" />
    {#if template.overlay_image}
        <div style:background="url('{template.overlay_image}')" style:width="100%" style:height="100%" style:position="absolute" style:background-size="cover" style:opacity="0.9"></div>
    {/if}
    <div
        class="initiative-card-name absolute flex justify-center items-end"
        style:--top={template.name.position.top}
        style:--left={template.name.position.left}
        style:--width={template.name.size.width}
        style:--height={template.name.size.height}
    >
        <p
        class="{theme === ThemeTemplatesEnum.BTAS ? 'gradient-heading' : ''}"
        style:bottom="0px"
        style:--fontSize="{template.name.font_size}px"
        style:--lineHeight="{template.name.font_size - 14}px"
        style:color={template.name.font_color}
        style:font-family={template.name.font}>{name}</p>
    </div>
    <svg
    class="absolute"
    style:--top={template.ability.position.top}
    style:--left={template.ability.position.left}
    style:--width={template.ability.size.width}
    style:--height={template.ability.size.height}
    style:--fontSize="{template.ability.font_size}px"
    style:--color={template.ability.font_color}
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
              class="text"
              stroke-width="{theme === ThemeTemplatesEnum.BTAS ? 0 : 1.5}" stroke="#000000"
              >
                {ability}
        </text>
      </svg>
</div>