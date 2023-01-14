<script lang="ts">
    import { StringHelper } from "$lib/helpers/StringHelper";
    import type { FormField, PositionedTemplateText } from "$lib/interfaces/templates/HtmlTemplates";
    import { modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
    import ModalFormEditor from "./ModalFormEditor.svelte";

    export let template: PositionedTemplateText;
    export let content: string | number | undefined;
    export let alignment: string = "center";
    export let name: string;
    export let title: string = StringHelper.toTitleCase(name);
    export let type: string = 'text';
    export let placeholder: string = '';
    export let fontSize: number | undefined = undefined;
    export let scale: number = 1.0;
    export let display: string = 'block';
    export let verticalAlign: string = '';

    scale = 0.8;

    function handleEdit() {
        const formFields: FormField[] = [{
            name,
            type,
            value: content
        }]

        const c: ModalComponent = { ref: ModalFormEditor, props: { fields: JSON.stringify(formFields) } };
        const d: ModalSettings = {
            type: 'component',
            title: title.length == 0 ? undefined : title,
            component: c,
            response: (response: any) => {
                if (response[0] && response[0].value.toString().length > 0) {
                    content = response[0].value;    
                }
            }
        };
        modalStore.trigger(d);
    }
</script>

<style>
    button.positioned-text {
        position: absolute;
        left: calc(var(--left) * var(--scale));
        top: calc(var(--top) * var(--scale));
        width: calc(var(--width) * var(--scale));
        height: calc(var(--height) * var(--scale));
        font-family: var(--font);
        font-size: calc(var(--fontSize) * var(--scale));
        line-height: calc(var(--fontSize) * var(--scale) * 0.6);
        color: var(--fontColor);
        text-align: var(--textAlign);
    }
</style>

<input type="hidden" {name} bind:value={content}>
<button 
    class="positioned-text" 
    style:--left={template.position.left}
    style:--top={template.position.top}
    style:--width={template.size.width}
    style:--height={template.size.height}
    style:--font={template.font}
    style:--fontSize="{!fontSize || fontSize == 0 ? template.font_size : fontSize}px"
    style:--fontColor={template.font_color}
    style:--textAlign={alignment}
    style:--display={display}
    style:--verticalAlign={verticalAlign}
    on:click|preventDefault={handleEdit}
>
    <p class="unstyled">{content ?? placeholder}</p>
    <iconify-icon icon="mdi:edit" class="hover" hidden></iconify-icon>
    <slot></slot>
</button>