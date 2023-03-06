<script lang="ts">
    import { Image } from "$lib/entities/Image";
    import { toastStore } from "@skeletonlabs/skeleton";
    import { draggable } from "@neodrag/svelte";
    import { onDestroy } from "svelte";
    import { browser } from "$app/environment";

    export let image: Image = new Image();
    export let scaleAxis: 'height' | 'width' =  'width';
    export let inputContainerClassList: string = '';
    export let classList: string = '';
    export let scale: number = 1;
    let scaleAndDrag = false;
    let imageScaleMultiplier = 1;
    if (!image.scale) {
        image.scale = 100;
    }
    if (!image.positionLeft) {
        image.positionLeft = 0;
    }
    if (!image.positionTop) {
        image.positionTop = 0;
    }

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
        if (scaleAndDrag) {
            toastStore.clear();
        }
        else {
            if (browser) {
                document.addEventListener('wheel', handleScaleImage, { passive: false });
            }
            toastStore.trigger({
                background: 'bg-secondary-100-800-token',
                message: `Drag your image to move it.<br/>Use scrollwheel to scale the image.`,
                action: {
                    label: 'Disable&nbsp;<iconify-icon icon="mdi:arrow-expand-all"></iconify-icon>',
                    response: () => { 
                        scaleAndDrag = false; 
                        if (browser) {
                            document.removeEventListener('wheel', handleScaleImage);
                        }
                    }
                },
                classes: `hide-close-button `,
                autohide: false
            });
        }

        scaleAndDrag = !scaleAndDrag;
    }

    onDestroy(() => {        
        if (browser) {
            document.removeEventListener('wheel', handleScaleImage);
        }
        toastStore.clear();
    });
</script>

<style>
    input:focus {
        outline: none;
    }
    div[data-scaling='true'] {
        cursor: move;
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
}}
/>

<div class="image-container">   
    <div data-scaling={scaleAndDrag} class="w-full h-full absolute flex context-button-container {scaleAndDrag ? 'scale-and-drag' : ''}">
        <div class="show-on-hover z-20 absolute left-1 bottom-2 w-full{inputContainerClassList.length > 0 ? ` ${inputContainerClassList}` : ''}" style:display={scaleAndDrag ? 'none' : ''}>
            <input class="card-image-url h-10 border-black border-2 grid content-center !bg-primary-50-900-token !text-primary-900-50-token overflow-hidden cursor-text text-center !rounded-none" 
                style:width="calc(100% - 8px)"
                placeholder="URL" 
                contenteditable="true" 
                bind:value={image.url}
            >
        </div>     
        {#if image && image.url.length > 0}
        <iconify-icon icon="mdi:arrow-expand-all" class="context-button p-1 absolute right-1 top-1 {scaleAndDrag ? '!hidden' : ''}" 
            on:click={toggleScalable} 
            on:keydown={toggleScalable}
        ></iconify-icon>
        <img class="card-image absolute object-cover max-w-none z-0"
            style:width="{scaleAxis === 'width' ? `${image.scale}%` : ''}" 
            style:height="{scaleAxis === 'height' ? `${image.scale}%` : ''}"
            src={image.url} alt="Card" 
            use:draggable={{
                disabled: !scaleAndDrag,
                position: { x: image.positionLeft * scale, y: image.positionTop * scale },
                onDrag: ({ offsetX, offsetY }) => {
                    image.positionLeft = Math.round(offsetX * (1 / scale));
                    image.positionTop = Math.round(offsetY * (1 / scale));
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