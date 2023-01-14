<script lang="ts">
    import type { PositionedTemplateContainer } from "$lib/interfaces/templates/HtmlTemplates";

    export let className: string = '';
    export let template: PositionedTemplateContainer;
</script>

<style>
    .positioned-container {
        position: absolute;
        left: calc(var(--left) * var(--scale));
        top: calc(var(--top) * var(--scale));
        width: calc(var(--width) * var(--scale));
        height: calc(var(--height) * var(--scale));
        display: flex;
        flex-direction: column;
        overflow: hidden;
    }
</style>

<div 
    class="positioned-container{className.length > 0 ? ` ${className}` : ''}" 
    style:--left={template.position.left}
    style:--top={template.position.top}
    style:--width={template.size.width}
    style:--height={template.size.height}
>
    <slot></slot>
</div>