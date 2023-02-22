<script lang="ts">
    export let text = '';
    export let icon = '';
    export let callback: any = null;
    export let disabled: boolean = false;
    export let active: boolean = false;
</script>

<style>
    button.comic {
        font-family: 'bangersregular';
        font-size: 1.5rem;
        padding: 0px;
        text-transform: uppercase;
        border: 3px solid rgba(var(--color-tertiary-600));
        background: black;
        color: rgba(var(--color-tertiary-600));
    }
    div.comic-icon {
        display: flex;
        padding: 10px;
        border-radius: 50px;
        margin: -3px !important;
        background: rgba(var(--color-tertiary-600));
        color: black;
    }
    button.active {
        border: 3px solid rgba(var(--color-tertiary-50));
        background: rgba(var(--color-tertiary-50));
    }
    button.active div.comic-icon {
        background: rgba(var(--color-tertiary-50));
    }

    :global(.dark) button.comic {
        border: 3px solid black;
        background: rgba(var(--color-tertiary-600));
        color: black;
    }
    :global(.dark) div.comic-icon {
        background: black;
        color: rgba(var(--color-tertiary-600));
    }
    :global(.dark) button.active {
        border: 3px solid rgba(var(--color-tertiary-900));
        background: rgba(var(--color-tertiary-900));
    }
    :global(.dark) button.active div.comic-icon {
        background: rgba(var(--color-tertiary-900));
    }

    span {
        padding: 2px 12px 0 10px;
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


<button class="comic btn {active ? 'active' : ''}" aria-label={text.length > 0 ? text.split(' ')[0] : icon} {disabled} on:click={(e) => { 
    if (callback) {
        e.preventDefault();
        callback();
    }
}}>
    {#if text.length > 0}
    <span>{text}</span>
    {/if}
    {#if icon.length > 0}
    <div class="comic-icon">
    <iconify-icon {icon}></iconify-icon>
    </div>
    {/if}
    <slot></slot>
</button>