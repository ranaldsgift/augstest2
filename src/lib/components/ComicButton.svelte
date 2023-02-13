<script lang="ts">
    export let text = '';
    export let icon = '';
    export let callback: any = null;
    export let disabled: boolean = false;
    export let background: string = 'rgba(var(--color-tertiary-500))';
</script>

<style>
    button.comic {
        font-family: 'bangersregular';
        font-size: 1.5rem;
        padding: 0px;
        text-transform: uppercase;
        color: black;
        border: 3px solid black;
    }
    div.comic-icon {
        display: flex;
        padding: 10px;
        border-radius: 50px;
        background: black;
        margin: -1px !important;
        margin-right: -3px !important;
    }
    span {
        padding: 2px 10px 0 12px;
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
    <button class="comic btn" aria-label={text.length > 0 ? text.split(' ')[0] : icon} {disabled} style:background={background} on:click|preventDefault={() => { callback() }}>
        {#if text.length > 0}
        <span>{text}</span>
        {/if}
        {#if icon.length > 0}
        <div class="comic-icon" style:color={background}>
        <iconify-icon {icon}></iconify-icon>
        </div>
        {/if}
        <slot></slot>
    </button>
    {:else}
    <button class="comic btn" aria-label={text.length > 0 ? text.split(' ')[0] : icon} style:background={background} {disabled}>
        {#if text.length > 0}
        <span>{text}</span>
        {/if}
        {#if icon.length > 0}
        <div class="comic-icon" style:color={background}>
        <iconify-icon {icon}></iconify-icon>
        </div>
        {/if}
        <slot></slot>
    </button>
    {/if}