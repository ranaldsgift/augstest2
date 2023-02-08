<script lang="ts">
    export let title = '';
    export let description = '';
    export let icon = '';
    export let useBackground = true;
    export let shadowColor = '#ffeb3bd9';
</script>

<style>
    .comic-background {
        background-image: url('/images/overlays/zoom.jpg');
    }
    .comic-card {
        border-color: black;
        border-width: 3px;
        transform: skew(-1deg);
        position: relative;
        overflow: hidden;
        background-size: cover;
        display: grid;
        justify-items: baseline;
        grid-template-rows: auto 1fr auto;
    }
    .comic-text {
        font-family: "Comic Sans MS";
    }

    .comic-card .card-header {
        border: 3px solid black;
        transform: skew(-15deg);
        padding-left: 20px;
        padding-top: 10px;
        letter-spacing: 0.15rem;
        position: relative;
        left: -10px;
        top: -3px;
    }

    .comic-card .card-footer {
        border: 3px solid black;
        position: relative;
        bottom: -3px;
        right: -20px;
        transform: skew(-15deg);
        max-width: 80%;
        padding-right: 40px;
        padding-top: 10px;
        background: #ffffff;
        justify-self: end;
    }
    .comic-card .card-body {
        justify-content: center;
        align-content: center;
        display: grid;
        padding: 0;
    }
    .comic-card {
        box-shadow: inset var(--shadow-color) 1px 1px 100px 100px;
    }
    .comic-background {
        position: absolute;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: bottom;
        opacity: 0.25;
    }
    .card-footer p, .card-header h3 {
        transform: skew(15deg);
    }
</style>

<div class="card comic-card comic-text gap-2" style:--shadow-color="{shadowColor}">
    {#if useBackground}
    <div class="comic-background"></div>
    {/if}
    {#if title.length > 0}
    <header class="card-header bg-tertiary-600 text-black mr-4 sm:!w-auto" style:width="calc(100% - 10px)">
        <h3 class="font-bold text-2xl pb-2">{title}</h3>
    </header>
    {/if}
    {#if icon.length > 0}
    <div class="flex content-center justify-center w-full">
        <iconify-icon icon="{icon}" style:color="black" style:font-size="6rem"></iconify-icon>
    </div>
    {/if}
    {#if description.length > 0}
    <footer class="card-footer hidden sm:block">
        <p class="text-gray-700">{description}</p>
    </footer>
    {/if}
</div>