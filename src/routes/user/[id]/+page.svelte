<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import ComicButton from "$lib/components/ComicButton.svelte";
    import HeroTable from "$lib/components/HeroTable.svelte";
    import { User } from "$lib/entities/User";
    import { DataHelper } from "$lib/helpers/DataHelper";
    import { Avatar } from "@skeletonlabs/skeleton";
    import type { PageData } from './$types';

    export let data: PageData;

    const userModel = data.json ? DataHelper.deserialize<User>(User, data.json) : undefined;
    const favorites = userModel?.getFavoriteHeroes();
</script>

<style>
    .user-badge-container {
        position: absolute;
        top: 6px;
        right: 175px;
        padding: 5px 40px 15px 8px;
        background: rgba(var(--color-primary-100));
        box-shadow: 0px 0px 3px -1px black;
        border-radius: 10px 0px
    }
    .user-page {
        margin-top: 0.5rem !important;
    }
</style>

{#if !userModel}
<p>The user does not exist. Either they never existed, or they existed at some point and then ceased to exist.</p>
{:else}
<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">{userModel.userName}</li>
</ol>

<div class="user-page grow max-w-7xl m-auto relative">
    {#if !userModel?.userName && data.session?.user.id == $page.params.id}
        <p class="p-8">Please create your user profile by clicking the Edit button below.</p>
    {:else if !userModel?.userName}
        <p>This user hasn't completed their user profile, or this user does not exist.</p>
    {:else if userModel}
    {#if userModel.avatar}
    <div class="user-badge-container shadow-2xl flex gap-1">
        {#each userModel.getBadges() as badge}
            <span class="badge bg-primary-900 text-primary-100 flex gap-1">
                <iconify-icon icon={badge.icon}></iconify-icon>
                {badge.text}
            </span>
        {/each}
    </div>
    <div class="mr-14 relative z-10 flex justify-end" style:margin-bottom="-80px">
        <Avatar src={userModel.avatar} shadow="shadow-md" width="w-32" border="border-black border-4"></Avatar>
    </div>
    {/if}
    <div class="comic-form grid gap-10">
        <div class="grid relative">
            <header>
                <h1>{userModel.userName}</h1>
            </header>
            <div class="flex gap-5 comic-body">
                <div class="comic-label" title="Date Created">
                    <span><iconify-icon icon="material-symbols:date-range"></span>
                    <p>{new Date(userModel.dateCreated).toLocaleDateString()}</p>
                </div>
                {#if userModel.discord}
                <div class="comic-label" title="Discord">
                    <span>
                        <iconify-icon icon="ic:baseline-discord"></iconify-icon></span>
                    <p>{userModel.discord}</p>
                </div>
                {/if}
                {#if userModel.boardgamegeek}
                <div class="comic-label" title="BGG">
                    <span><iconify-icon icon="game-icons:meeple"></iconify-icon></span>
                    <p><a href="https://boardgamegeek.com/user/{userModel.boardgamegeek}" target="_blank" rel="noreferrer">{userModel.boardgamegeek}</a></p>
                </div>
                {/if}
            </div>
        </div>
        {#if data.session?.user.id == $page.params.id && favorites && favorites.length > 0}
            <hr class="divider">
            <HeroTable title="Favorite Heroes" heroes={favorites}></HeroTable>
        {/if}

        {#if userModel.heroes && userModel.heroes.length > 0}
            <hr class="divider">
            <HeroTable title="{data.session?.user.id == $page.params.id ? 'My Heroes' : `${userModel.userName}'s Heroes` }" heroes={userModel.heroes}></HeroTable>
        {/if}
    </div>
    {/if}

    {#if data.session?.user.id == $page.params.id}
    <div class="page-button-container flex gap-2">
        <a href="/user/{$page.params.id}/edit" class="unstyled">
            <ComicButton text="Edit Profile" icon="mdi:edit"></ComicButton>
        </a>
        <form action="/api/user?/logout" method="POST" use:enhance>
            <ComicButton text="Logout" icon="mdi:logout"></ComicButton>
        </form>
    </div>
    {/if}
</div>
{/if}