<script lang="ts">
    import type { FormField } from "$lib/interfaces/templates/HtmlTemplates";
    import { modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
    import ModalFormEditor from "./ModalFormEditor.svelte";

    export let font: string = "Comic Sans MS"
    export let fontColor: string = "#000";
    export let content: string | number | undefined;
    export let alignment: string = "center";
    export let type: string = 'text';
    export let placeholder: string = '';
    export let fontSize: number | undefined = undefined;

    function handleEdit() {
        const formFields: FormField[] = [{
            name: "field",
            type,
            value: content
        }]

        const c: ModalComponent = { ref: ModalFormEditor, props: { fields: JSON.stringify(formFields) } };
        const d: ModalSettings = {
            type: 'component',
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
    .text-editor {
        font-family: var(--font);
        font-size: calc(var(--fontSize) * var(--scale));
        line-height: calc(var(--fontSize) * var(--scale));
        color: var(--fontColor);
        text-align: var(--textAlign);
    }
</style>

<button 
    class="text-editor" 
    style:--font={font}
    style:--fontSize="{fontSize}px"
    style:--fontColor={fontColor}
    style:--textAlign={alignment}
    on:click|preventDefault={handleEdit}
>
    {content ?? placeholder}
    <iconify-icon icon="mdi:edit" class="hover" hidden></iconify-icon>
    <slot></slot>
</button>