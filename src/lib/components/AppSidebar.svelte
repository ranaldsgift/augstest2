<script lang="ts">
    import { writable, type Writable } from 'svelte/store';
    import { AppRail, AppRailTile } from "@skeletonlabs/skeleton";
    
    export let selected: Writable<string> = writable("Home");
    export let classList: string = "";
</script>

<AppRail class={classList} selected={selected}>
    <svelte:fragment slot="lead">
        <AppRailTile label="Home" title="Home" tag="a" href="/" value="Home">
            <iconify-icon style:font-size="3rem" style:margin-bottom="-10px" icon="material-symbols:home"></iconify-icon>
        </AppRailTile>
    </svelte:fragment>
    <AppRailTile label="Browse" title="Browse Homebrews" tag="a" href="/homebrew" value="Browse">
        <iconify-icon style:font-size="3rem" style:margin-bottom="-10px" icon="material-symbols:web"></iconify-icon>
    </AppRailTile>
    <AppRailTile label="Create" title="Create Homebrews" tag="a" href="/create" value="Create">
        <iconify-icon style:font-size="3rem" style:margin-bottom="-10px" icon="material-symbols:edit"></iconify-icon>
    </AppRailTile>
    <AppRailTile label="AUGS Assistant" title="AUGS Assistant" tag="a" href="/assistant" value="Assistant">
        <iconify-icon style:font-size="3rem" style:margin-bottom="-10px" icon="material-symbols:play-circle"></iconify-icon>
    </AppRailTile>
    <AppRailTile label="Resources" title="Resources" tag="a" href="/resources" value="Resources">
        <iconify-icon style:font-size="3rem" style:margin-bottom="-10px" icon="entypo:folder-images"></iconify-icon>
    </AppRailTile>
    <svelte:fragment slot="trail">
        <AppRailTile tag="a" href="/about" value="About" aria-label="About">
            <iconify-icon style:font-size="3rem" style:margin-bottom="-10px" icon="mdi:information"></iconify-icon>
        </AppRailTile>
    </svelte:fragment>
</AppRail>