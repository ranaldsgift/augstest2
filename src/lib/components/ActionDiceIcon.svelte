<script lang="ts">
    import type { DiceIconsEnum } from "$lib/enums/Enums";
    import { DiceIconTemplates } from "$lib/interfaces/templates/DiceIconTemplates";
    import type { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";

    export let theme: ThemeTemplatesEnum;
    export let icon: DiceIconsEnum
    export let color: string = "#000";
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
    {@html DiceIconTemplates[theme][icon]}
</div>