<script lang="ts">
    import type { SkillCardIconsEnum } from "$lib/enums/Enums";
    import { SkillCardIconTemplates } from "$lib/interfaces/templates/SkillCardIconTemplates";
    import type { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";

    export let theme: ThemeTemplatesEnum;
    export let icon: SkillCardIconsEnum
    export let color: string = "#000000";
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

<div style:--color={color}>
    {@html SkillCardIconTemplates[theme][icon]}
</div>