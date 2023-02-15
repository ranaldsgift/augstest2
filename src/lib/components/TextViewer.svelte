<script lang="ts">
    import type { TemplateText } from "$lib/interfaces/templates/HtmlTemplates";


    export let text: string = '';
    export let classList: string = '';
    export let template: TemplateText;
    export let fontSize: number = 0;
</script>

<style lang="scss">
    span {
        font-family: var(--font);
        font-size: calc(var(--fontSize) * var(--scale));
        line-height: calc(var(--fontSize) * var(--scale));
        color: var(--color);
        text-align: var(--textAlign);
        line-height: calc(var(--lineHeight));
        cursor: text;
    }
</style>

<span data-content={text} class="unstyled outline-none{classList.length > 0 ? ` ${classList}` : ''}{template.classList && template.classList.length > 0 ? ` ${template.classList}` : ''}" 
    style:--font={template.font}
    style:--fontSize="{!fontSize || fontSize === 0 ? template.fontSize : fontSize}px"
    style:--lineHeight={template.lineHeight ?? `${template.fontSize}px`}
    style:--color={template.fontColor}>
    {text}
</span>