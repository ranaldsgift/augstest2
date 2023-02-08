<script lang="ts">
    export let listItems: { name: string, url: string }[];
</script>

<style>
    .comic-list-nav {
        color: #ffffff;
    }
    .comic-list-nav a {
        border: 3px solid black;
        border-radius: 0;
        text-align: left;
        justify-content: start;
        text-transform: uppercase;
        font-size: 2rem;
        font-family: 'Badaboom';
        letter-spacing: 5px;
    }
    .comic-list-nav a:nth-child(2n+2) {
        justify-self: end;
    }
    
    .halftone-container {
	--size: 0.75rem;
        --mask: linear-gradient(to left, rgb(0 0 0), rgb(0 0 0 / 0.5));
	--dotsColor: 255 255 255;
	--bg: radial-gradient(circle at center, rgb(var(--dotsColor)) 3%, rgb(var(--dotsColor) / 0.4) var(--dotRadius, 150%));
	--bgSize: var(--size);
	--cardBg: linear-gradient(135deg, hotpink, blue);
        background: var(--cardBg);
        overflow: hidden;
        position: absolute;
        width: 200%;
        height: 100%;
        opacity: 0.1;
        top: 0px;
        pointer-events: none;

    }
    .halftone {
        position: relative;
        aspect-ratio: 1;
        background: rgb(0 0 0);
        filter: contrast(var(--contrast, 20)) invert(var(--invert, 0));
        mix-blend-mode: var(--blendMode, multiply);
        width: 100%;
        height: 100%;
    }

    .halftone::before {
        content: '';
        position: absolute;
        inset: 0;
        background-image: var(--bg);
        background-size: var(--bgSize, 0.75rem) var(--bgSize, 0.75rem);
        background-repeat: round;
        background-position: 0 0, var(--bgPosition) var(--bgPosition);
        -webkit-mask-image: var(--mask);
        mask-image: var(--mask);
        mask-size: cover;
        mask-position: center;
        transition: background-size 100ms;
    }

    @media (max-width: 300px) {
        a {
            font-size: 1.5rem !important;
            -webkit-text-stroke: 1px;
            -webkit-text-stroke-color: black;
        }
    }
</style>

<div class="m-auto">
    <nav class="grid m-auto gap-4 sm:px-8 max-w-7xl comic-list-nav">
        {#each listItems as listItem}
        <div class="overflow-hidden relative bg-primary-500">
            <a href="{listItem.url}" class="flex flex-wrap btn overflow-hidden text-stroke whitespace-pre-wrap" data-title={listItem.name}>
                {listItem.name}
            </a>
            <div class="halftone-container"><div class="halftone"></div></div>
        </div>
        {/each}
    </nav>
</div>