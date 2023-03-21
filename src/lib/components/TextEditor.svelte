<script lang="ts">
    import type { TemplateText } from "$lib/interfaces/templates/HtmlTemplates";

    export let text: string = '';
    export let placeholder: string = '';
    export let spellcheck: boolean = false;
    export let classList: string = '';
    export let template: TemplateText;
    export let fontSize: number = 0;

    $: lineHeight = template.lineHeight ? template.lineHeight : (fontSize && fontSize !== 0) ? `${fontSize}px` : `${template.fontSize}px`;
</script>

<style lang="scss">
    span {
        font-family: var(--font);
        font-size: calc(var(--fontSize) * var(--scale));
        color: var(--color);
        text-align: var(--textAlign);
        line-height: var(--lineHeight, calc(var(--fontSize) * var(--scale)));
        cursor: text;
    }
</style>

<span class="unstyled outline-none{classList.length > 0 ? ` ${classList}` : ''}{template.classList && template.classList.length > 0 ? ` ${template.classList}` : ''}" 
    style:--font={template.font}
    style:--fontSize="{!fontSize || fontSize === 0 ? template.fontSize : fontSize}px"
    style:--lineHeight={template.lineHeight ?? null}
    style:--color={template.fontColor}
    contenteditable="true"
    placeholder={placeholder}
    spellcheck={spellcheck}
    on:paste={(e) => {
        e.preventDefault();
        if (e.clipboardData) {
            const text = e.clipboardData.getData('text/plain');
            document.execCommand('insertHTML', false, text);
        }
    }}
    bind:innerHTML={text}>
</span>