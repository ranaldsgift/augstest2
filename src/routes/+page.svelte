<script>
    import ComicCard from '$lib/components/ComicCard.svelte';

    const homepageItems = [
        {
            "title": "Homebrews",
            "icon": "material-symbols:web",
            "url": "/homebrew",
            "description": "Browse the largest collection of AUGS homebrews created by community members.",
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
            "description": "This tool will help you run your solo/cooperative games. You can use it to play with the AUGS Event Deck system!",
            "shadowColor": "#9acd32d9"
        },
        {
            "title": "Assets",
            "icon": "entypo:folder-images",
            "url": "/assets",
            "description": "Find high quality assets to inspire your designs and for homebrewing offline.",
            "shadowColor": "#ff6347d9"
        },
        {
            "title": "Facebook",
            "icon": "mdi:facebook",
            "url": "https://www.facebook.com/groups/TMNTShadowsOfThePast",
            "description": "Check out the AUGS Facebook community to connect with other fans and find the latest news.",
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
</script>

<style>
    div {
        grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    }
</style>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb">Home</li>
</ol>

<div class="grid gap-5 max-w-5xl m-auto px-8">
    {#each homepageItems as homepageItem}
        <a class="grid unstyled" href="{homepageItem.url}" target="{homepageItem.linkTarget}" rel="noreferrer">
            <ComicCard title={homepageItem.title} icon={homepageItem.icon} description={homepageItem.description} shadowColor={homepageItem.shadowColor}></ComicCard>
        </a>
    {/each}
</div>