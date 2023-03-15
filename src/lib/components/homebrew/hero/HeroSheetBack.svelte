<script lang="ts">
    import type { Hero } from "$lib/entities/Hero";
    import { HeroSheetTemplates } from "$lib/interfaces/templates/HeroTemplates";
    import type { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";

    export let theme: ThemeTemplatesEnum;
    export let scale: number = 1;
    export let hero: Hero;

    $: template = HeroSheetTemplates[theme];
</script>

<div class="hero-sheet-back-container relative rounded-[10px] overflow-hidden" style:--scale={scale}>
    <img width={700 * scale} height={566 * scale} src={template.backBackgroundImage} alt="Hero Sheet Back">
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div class="w-[calc(265px*var(--scale))] h-[calc(265px*var(--scale))] rounded-full overflow-hidden relative">
            <div class="w-full h-full absolute">
                <img class="object-contain max-w-none absolute" src={hero.iconImage.url} alt="Villain Icon"
                    style:width="{hero.iconImage.scale * scale}%"
                    style:left={`${(hero.iconImage.positionLeft * 265 / parseInt(template.icon.size.width)) * scale}px`}
                    style:top={`${(hero.iconImage.positionTop * 265 / parseInt(template.icon.size.height)) * scale}px`}
                >
            </div>
        </div>
    </div>
</div>