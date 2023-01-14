<script lang="ts">
    import type { FormField, Position, PositionedItem, Size } from "$lib/interfaces/templates/HtmlTemplates";
    import { modalStore, type ModalComponent, type ModalSettings } from "@skeletonlabs/skeleton";
    import ModalFormEditor from "./ModalFormEditor.svelte";

    export let template: PositionedItem;
    export let imageUrl: string = '';
    export let imageScale: number = 100;
    export let left: number = 0;
    export let top: number = 0;
    export let imageSize: Size = { width: '100%', height: '100%' };
    export let name: string;
    export let title: string = name.replace('_', ' ');
    export let className: string = '';

    function handleEdit() {
        const formFields: FormField[] = [{
            name,
            type: 'text',
            value: imageUrl
        }]

        const c: ModalComponent = { ref: ModalFormEditor, props: { fields: JSON.stringify(formFields) } };
        const d: ModalSettings = {
            type: 'component',
            title: title.length == 0 ? undefined : title,
            component: c,
            response: (fields: FormField[]) => {

                if (fields[0] && fields[0].value.length > 0) {
                    imageUrl = fields[0].value;
                }
            }
        };
        modalStore.trigger(d);
    }
</script>

<style>
    .positioned-image {
        position: absolute;
        left: calc(var(--left) * var(--scale));
        top: calc(var(--top) * var(--scale));
        width: calc(var(--width) * var(--scale));
        height: calc(var(--height) * var(--scale));
        background: var(--image);
        background-size: auto var(--imageScale);
        background-position: var(--imageLeft) var(--imageTop);
        background-repeat: no-repeat;
    }
</style>

<input type="hidden" {name} bind:value={imageUrl}>
<button 
    class="positioned-image {className}" 
    style:--left={template.position.left}
    style:--top={template.position.top}
    style:--width={template.size.width}
    style:--height={template.size.height}
    style:--imageWidth={imageSize.width}
    style:--imageHeight={imageSize.height}
    style:--imageLeft="{left}px"
    style:--imageTop="{top}px"
    style:--image="url('{imageUrl}')"
    style:--imageScale="{imageScale}%"
    on:click|preventDefault={handleEdit}
>
    {#if imageUrl.length == 0}
        <span class="border-dashed border-2 p-1 inline-block">{title}</span>
    {/if}
    <iconify-icon icon="mdi:edit" class="hover center" hidden></iconify-icon>
    <slot></slot>
</button>