<script lang="ts">
    import type { PositionedTemplateText } from "$lib/interfaces/templates/HtmlTemplates";

    export let className: string = '';
    export let template: PositionedTemplateText;
    export let fontSize: number = 0;
</script>

<style>
    .positioned-text-container {
        position: absolute;
        display: flex;
        flex-direction: column;
        left: calc(var(--left) * var(--scale));
        top: calc(var(--top) * var(--scale));
        width: calc(var(--width) * var(--scale));
        height: calc(var(--height) * var(--scale));
    }
</style>

<div 
    class="positioned-text-container{className.length > 0 ? ` ${className}` : ''}" 
    style:--left={template.position.left}
    style:--top={template.position.top}
    style:--width={template.size.width}
    style:--height={template.size.height}
    style:--font={template.font}
    style:--fontSize="{!fontSize || fontSize === 0 ? template.fontSize : fontSize}px"
    style:--lineHeight={template.lineHeight}
    style:--color={template.fontColor}
>
    <slot></slot>
</div>