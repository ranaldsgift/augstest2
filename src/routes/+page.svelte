<script lang="ts">
    import ComicButton from '$lib/components/ComicButton.svelte';
    import ComicCard from '$lib/components/ComicCard.svelte';
    import { localStorageStore } from '@skeletonlabs/skeleton';
    import { onMount } from 'svelte';
	import { fade } from 'svelte/transition';

    const homepageItems = [
        {
            "title": "Homebrews",
            "icon": "material-symbols:web",
            "url": "/homebrew",
            "description": "Browse the largest collection of AUGS homebrews.",
            "shadowColor": "#ffeb3bd9"
        },
        {
            "title": "Create",
            "icon": "mdi:create",
            "url": "/create",
            "description": "Create your own AUGS content with this tool. Start homebrewing right now!",
            "shadowColor": "#00bfffd9"
        },
        {
            "title": "AUGS Assistant",
            "icon": "material-symbols:play-circle",
            "url": "/assistant",
            "description": "Run your solo and cooperative games. Play with the AUGS Event Deck!",
            "shadowColor": "#9acd32d9"
        },
        {
            "title": "Resources",
            "icon": "entypo:folder-images",
            "url": "/assets",
            "description": "Homebrew assets, rules, unreleased content and more.",
            "shadowColor": "#ff6347d9"
        },
        {
            "title": "Facebook",
            "icon": "mdi:facebook",
            "url": "https://www.facebook.com/groups/TMNTShadowsOfThePast",
            "description": "Connect with other AUGS fans.",
            "shadowColor": "#ffeb3bd9",
            "linkTarget": "_blank"
        },
        {
            "title": "Discord",
            "icon": "mdi:discord",
            "url": "https://discord.gg/nU6wSXU3bn",
            "description": "Join the AUGS Community Discord!",
            "shadowColor": "#00bfffd9",
            "linkTarget": "_blank"
        }
    ];

    let visible: boolean = false;
    
	function toggleVisible(): void {
		visible = !visible;
        localStorage.setItem("betaAlert", visible.toString());
    }

    onMount(() => {
        visible = !localStorage.getItem("betaAlert") || localStorage.getItem("betaAlert") === "true";
    });
</script>

<style>
    div {
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
    .alert { 
        flex-direction: row;
        align-items: center;
    }
    .alert-message {
        margin: 0px 10px!important;
    }
    .alert-actions { 
        margin: 0 !important;
    }
</style>

<svelte:head><title>Home - augs.tools</title></svelte:head>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb">Home</li>
</ol>
<div>
{#if visible}
    <aside class="alert max-w-5xl m-auto mb-6 border-warning-500 border-2 bg-warning-200" transition:fade|local={{ duration: 200 }}>
        <iconify-icon style:font-size="4rem" icon="material-symbols:warning-outline"></iconify-icon>
        <div class="alert-message">
            <p>This website is in BETA. It is currently undergoing major development. There is the risk of losing all your saved data at any time. Please be aware of this until we are ready for a full release!</p>
        </div>
        <div class="alert-actions">
            <ComicButton icon="mdi:close" callback={toggleVisible}></ComicButton>
        </div>
    </aside>
{/if}

<div class="grid gap-5 max-w-5xl m-auto px-8">
    {#each homepageItems as homepageItem}
        <a class="grid unstyled" href="{homepageItem.url}" target="{homepageItem.linkTarget}" rel="noreferrer">
            <ComicCard title={homepageItem.title} icon={homepageItem.icon} description={homepageItem.description} shadowColor={homepageItem.shadowColor}></ComicCard>
        </a>
    {/each}
</div>
</div>