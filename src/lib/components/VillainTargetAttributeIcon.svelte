<script lang="ts">
    import type { VillainTargetAttributeEnum } from "$lib/enums/Enums";
    import type { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { VillainTargetAttributeTemplates } from "$lib/interfaces/templates/VillainTargetAttributeTemplates";

    export let theme: ThemeTemplatesEnum;
    export let icon: VillainTargetAttributeEnum
    export let color: string = "#000000";
    export let classList: string = '';
</script>

<style>
    div>:global(svg) {
        width: 100%;
        height: 100%;
        position: relative;
    }
    div :global(svg g) {
        fill: var(--color);
    }

    div {
        width: 100%;
        height: 100%;
    }
</style>

<div class={classList.length > 0 ? classList : ''} style:--color={color}>
    {@html VillainTargetAttributeTemplates[theme][icon]}
</div>