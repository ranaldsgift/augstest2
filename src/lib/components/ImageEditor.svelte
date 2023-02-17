<script lang="ts">
    import { Image } from "$lib/entities/Image";
    import { toastStore } from "@skeletonlabs/skeleton";
    import { draggable } from "@neodrag/svelte";

    export let image: Image = new Image();
    export let scale: number = 1;
    export let scaleAxis: 'height' | 'width' =  'width';
    export let inputContainerClassList: string = '';
    export let classList: string = '';
    let scaleAndDrag = false;
    let imageScaleMultiplier = 1;

    function handleScaleImage(event: WheelEvent) {
        if (!scaleAndDrag) return;

        event.preventDefault();

        if (event.deltaY > 0) {
            image.scale -= (1 * imageScaleMultiplier);
        } else {
            image.scale += (1 * imageScaleMultiplier);
        }
        image = image;
    }

    function toggleScalable() {
        /* if (!localStorage.getItem('image-scaling-alert')) {
        } */

        if (scaleAndDrag) {
            toastStore.clear();
        }
        else {
            toastStore.trigger({
                preset: 'secondary',
                message: `Drag your image to move it.<br/>Use scrollwheel to scale the image.`,
                action: {
                    label: 'Disable',
                    response: () => { scaleAndDrag = false; }
                },
                classes: `hide-close-button `,
                autohide: false
            });
        }

        scaleAndDrag = !scaleAndDrag;
    }
</script>

<style>
    input:focus {
        outline: none;
    }
</style>

<svelte:window
on:keydown={(e) => {
    if (e.key === 'Shift') {
        imageScaleMultiplier = 10; 
    }
}} 
on:keyup={(e) => { 
    imageScaleMultiplier = 1;
}}/>

<div class="image-container">   
    <div class="w-full h-full absolute flex context-button-container {scaleAndDrag ? 'scale-and-drag' : ''}">
        <div class="show-on-hover z-20 absolute left-1 bottom-2 w-full{inputContainerClassList.length > 0 ? ` ${inputContainerClassList}` : ''}" style:display={scaleAndDrag ? 'none' : ''}>
            <input class="card-image-url h-10 border-black border-2 grid content-center bg-primary-900 text-primary-900-100-token overflow-hidden cursor-text text-center !rounded-none" 
                style:width="calc(100% - 8px)"
                placeholder="URL" 
                contenteditable="true" 
                bind:value={image.url}
            >
        </div>     
        {#if image && image.url.length > 0}
        <iconify-icon icon="mdi:arrow-expand-all" class="context-button p-1 absolute right-1 top-1 {scaleAndDrag ? 'active' : ''}" 
            on:click={toggleScalable} 
            on:keydown={toggleScalable}
        ></iconify-icon>
        <img class="card-image absolute object-cover max-w-none z-0"
            style:width="{scaleAxis === 'width' ? `${image.scale}%` : ''}" 
            style:height="{scaleAxis === 'height' ? `${image.scale}%` : ''}"
            src={image.url} alt="Card" 
            on:wheel|nonpassive={handleScaleImage}
            use:draggable={{
                disabled: !scaleAndDrag,
                position: { x: image.positionLeft * scale, y: image.positionTop * scale },
                onDrag: ({ offsetX, offsetY }) => {
                    image.positionLeft = offsetX;
                    image.positionTop = offsetY;
                },
            }}
        >
        {/if}
    </div>
    {#if !image || image.url.length === 0}
    <div class="pointer-events-none absolute w-full h-full bg-transparent text-center grid justify-center content-center {classList.length > 0 ? ` ${classList}` : ''}">
        <span class="border-dashed border-2 p-2 flex justify-center text-surface-900 border-surface-900"><iconify-icon icon="material-symbols:image"></iconify-icon></span>
    </div>
    {/if}
</div>