<script lang="ts">
    export let text = '';
    export let icon = '';
    export let callback: any = null;
    export let disabled: boolean = false;
</script>

<style>
    .comic-button {
        display: flex;
        justify-content: center;
    }

    button {
        display: flex;
        padding: 5px 10px;
        text-decoration: none;
        font-family: var(--theme-font-family-heading);
        transition: 1s;
        box-shadow: -3px 3px 0 black;
        transform: skewX(-15deg);
        align-items: center;
        gap: 0.5rem;
        color: black;
        background: rgba(var(--color-tertiary-600))

    }

    button:focus {
        outline: none; 
    }

    button:hover {
        transition: 0.5s;
        box-shadow: -4px 4px 0 rgba(var(--color-tertiary-400));
        color: rgba(var(--color-tertiary-400)) !important;
        background: rgba(var(--color-primary-700));
    }

    span {
        transform: skewX(15deg);
        font-size: 1.5rem;
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
    <button class="comic-button" {disabled} on:click|preventDefault={() => { callback() }}>
        {#if text.length > 0}
        <span>{text}</span>
        {/if}
        {#if icon.length > 0}
        <iconify-icon {icon}></iconify-icon>
        {/if}
        <slot></slot>
    </button>
    {:else}
    <button class="comic-button" {disabled}>
        {#if text.length > 0}
        <span>{text}</span>
        {/if}
        {#if icon.length > 0}
        <iconify-icon {icon}></iconify-icon>
        {/if}
        <slot></slot>
    </button>
    {/if}