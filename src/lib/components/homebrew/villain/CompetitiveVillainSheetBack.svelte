<script lang="ts">
    import { VillainTemplates } from "$lib/interfaces/templates/VillainTemplates";
    import type { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import type { Villain } from "$lib/entities/Villain";


    export let theme: ThemeTemplatesEnum;
    export let scale: number = 1;
    export let villain: Villain;
    export let container: HTMLElement | null = null;

    $: template = VillainTemplates[theme];
</script>

<div class="relative rounded-[10px] overflow-hidden" style:--scale={scale} bind:this={container}>
    <img width={700 * scale} height={566 * scale} src={template.competitive.backBackgroundImage} alt="Competitive Villain Sheet Back">
    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <div class="w-[calc(265px*var(--scale))] h-[calc(265px*var(--scale))] rounded-full overflow-hidden relative">
            <div class="w-full h-full absolute">
                <img class="object-contain max-w-none absolute" src={villain.iconImage.url} alt="Villain Icon"
                    style:width="{villain.iconImage.scale * scale}%"
                    style:left={`${(villain.iconImage.positionLeft * 265 / parseInt(template.icon.size.width)) * scale}px`}
                    style:top={`${(villain.iconImage.positionTop * 265 / parseInt(template.icon.size.height)) * scale}px`}
                >
            </div>
        </div>
    </div>
</div>