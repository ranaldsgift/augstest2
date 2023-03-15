<script lang="ts">
    import { SkillCardBackTemplates } from "$lib/interfaces/templates/SkillCardBackTemplates";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { onMount } from "svelte";
    
    export let theme: ThemeTemplatesEnum = ThemeTemplatesEnum.TMNT;
    export let backgroundColor: string = '#000000';
    export let image: string = '';
    export let scale: number = 1;

    const template = SkillCardBackTemplates[theme];
</script>

<style>
    .skill-card-back-container {
        border-radius: 10px;
        box-shadow: black 0 0 3px 1px;
        background-size: cover;
        background-repeat: no-repeat;
        height: calc(800px * var(--scale));
        width: calc(588px * var(--scale));
        position: relative;
        overflow: hidden;
        display: flex;
        justify-content: center;
    }
    .skill-card-back-image {
        padding-top: calc(15px*var(--scale));
        padding-bottom: calc(15px*var(--scale));
        position: absolute;
        width: var(--width);
        height: var(--height);
        object-fit: cover;
    }
    .halftone-container {
        --size: calc(0.95rem * var(--scale));
        --mask: radial-gradient(circle at center, rgb(0 0 0), rgb(0 0 0 / 0) 85%);
        --dotsColor: 255 255 255;
        --bg: radial-gradient(circle at center, rgb(var(--dotsColor)) 20%, rgb(var(--dotsColor) / 0.4) var(--dotRadius, 115%));
        --bgSize: var(--size);
        background: var(--cardBg);
        overflow: hidden;
        position: absolute;
        transform: rotate(-15deg);
        width: 250%;
        height: 250%;
        top: -75%;
        left: -75%;
        opacity: 0.1;
        display: inherit;
    }
    .halftone {
        position: relative;
        aspect-ratio: 1;
        background: rgb(0 0 0);
        filter: contrast(var(--contrast, 20)) invert(1);
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
    [data-theme='TMNT'] .clip-container {
        clip-path: polygon(0% 0%, 0% 51%, 2% 51%, 50% 86%, 97% 51%, 100% 51%, 100% 0%);
    }
</style>

<div data-theme={theme} class="skill-card-back-container" style:background-color={backgroundColor} style:--scale={scale}>
    {#if theme === ThemeTemplatesEnum.TMNT}
        <div class="halftone-container"><div class="halftone"></div></div>
    {/if}
    {#if theme === ThemeTemplatesEnum.BTAS}
    <img class="absolute w-full h-full mix-blend-color-burn" src="/images/overlays/paper.png" alt="Paper Background Effect">
    {/if}
    <img class="absolute h-full w-full" src={template.backgroundImage} alt="Background">
    <div class="clip-container absolute h-full w-full flex justify-center">
        <img class="skill-card-back-image" src={image} style:--height='100%' alt="Skill Card Back" />
    </div>
    {#if template.overlayImage}
        <img class="absolute h-full w-full" src={template.overlayImage} alt="Overlay">
        <!-- <div style:background="url('{template.overlayImage}')" style:width="100%" style:height="100%" style:position="absolute" style:background-size="cover" style:opacity="0.9"></div> -->
    {/if}
</div>