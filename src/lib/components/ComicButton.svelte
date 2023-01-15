<script lang="ts">
    export let text = '';
    export let icon = '';
    export let callback: any = null;
    export let disabled: boolean = false;
</script>

<style>
    button.comic {
        font-family: 'bangersregular';
        font-size: 1.5rem;
        padding-top: 10px;
        text-transform: uppercase;
        background: rgba(var(--color-tertiary-500));
        color: black;
        border: 3px solid black;
    }
    button.comic-icon {
        color: rgba(var(--color-tertiary-500));
        display: flex;
        padding: 10px;
        border-radius: 50px;
        background: black;
    }

    @keyframes color_anim {
        0% {
            fill: white;
        }
        50% {
            fill: #FBC638;
        }
        100% {
            fill: white;
        }
    }
</style>


    {#if callback}
    <button class="comic btn" {disabled} on:click|preventDefault={() => { callback() }}>
        {#if text.length > 0}
        <span>{text}</span>
        {/if}
        {#if icon.length > 0}
        <button class="comic-icon" style:margin="-10px -22px -10px 10px">
        <iconify-icon {icon}></iconify-icon>
        </button>
        {/if}
        <slot></slot>
    </button>
    {:else}
    <button class="comic btn" {disabled}>
        {#if text.length > 0}
        <span>{text}</span>
        {/if}
        {#if icon.length > 0}
        <button class="comic-icon" style:margin="-10px -22px -10px 10px">
        <iconify-icon {icon}></iconify-icon>
        </button>
        {/if}
        <slot></slot>
    </button>
    {/if}