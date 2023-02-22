<script lang="ts">
    import { enhance } from "$app/forms";
    import { page } from "$app/stores";
    import ComicButton from "$lib/components/ComicButton.svelte";
    import HeroTable from "$lib/components/HeroTable.svelte";
    import PageButtonContainer from "$lib/components/PageButtonContainer.svelte";
    import { User } from "$lib/entities/User";
    import { DataHelper } from "$lib/helpers/DataHelper";
    import { Avatar } from "@skeletonlabs/skeleton";
    import type { PageData } from './$types';

    export let data: PageData;

    $: userModel = data.json ? DataHelper.deserialize<User>(User, data.json) : undefined;
    $: userId = userModel?.id;
</script>

<style>
    .user-badge-container {
        padding: 5px;
        background: rgba(var(--color-primary-100));
        box-shadow: 0px 0px 3px -1px black;
        border-radius: 20px 20px 0px 0px;
    }
    @media (max-width: 639px) {
        .user-badge-container {
            position: relative;
            top: 0px;
            left: 0px;
            padding: 5px;
            background: rgba(var(--color-primary-100));
            box-shadow: 0px 0px 3px -1px black;
            order: 1;
        }
        .avatar-badge-container {
            margin-top: 1rem;
            margin-bottom: 0px;
            display: grid;
            justify-content: center;
            justify-items: center;
            gap: 1rem;
            order: 0;
        }
    }
    .user-page {
        margin-top: 0.5rem !important;
    }
</style>


<svelte:head><title>{userModel?.userName ?? 'User Page'} - augs.tools</title></svelte:head>

{#key userModel?.id}
{#if !userModel}
<p>The user does not exist. Either they never existed, or they existed at some point and then ceased to exist.</p>
{:else}
<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
    {#if userModel && userModel.userName}
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">{userModel.userName}</li>
    {/if}
</ol>

<div class="user-page grow max-w-7xl m-auto relative">
    {#if data.session?.user.id == $page.params.id}
    <PageButtonContainer>
        <div class="flex gap-2">
            <a href="/user/{$page.params.id}/restore" class="unstyled">
                <ComicButton text="Restore Homebrews" icon="material-symbols:restore-from-trash-outline"></ComicButton>
            </a>
            <a href="/user/{$page.params.id}/edit" class="unstyled">
                <ComicButton text="Edit" icon="mdi:edit"></ComicButton>
            </a>
            <form action="/api/user?/logout" method="POST" use:enhance>
                <ComicButton text="Logout" icon="mdi:logout"></ComicButton>
            </form>
        </div>        
    </PageButtonContainer>
    {/if}
    {#if !userModel?.userName && data.session?.user.id == $page.params.id}
    <div>
        <header class="comic-header">
            <h1>Your Profile</h1>
        </header>
        <div class="comic-body">
            <p>Please edit your profile before you begin brewing!</p>
        </div>
    </div>
    {:else if !userModel?.userName}
        <p>This user hasn't completed their user profile, or this user does not exist.</p>
    {:else if userModel}
    <div class="avatar-badge-container relative flex sm:justify-end items-end">
        <div class="user-badge-container shadow-2xl flex gap-1 z-0 relative {userModel.avatar ? 'sm:!pr-[35px]' : 'sm:mr-[50px]'}">
            {#each userModel.getBadges() as badge}
                <span class="badge bg-primary-900 text-primary-100 flex gap-1">
                    <iconify-icon icon={badge.icon}></iconify-icon>
                    {badge.text}
                </span>
            {/each}
        </div>
        {#if userModel.avatar}
        <Avatar class="z-10 sm:mb-[-60px] sm:ml-[-30px] sm:mr-[50px]" src={userModel.avatar} shadow="shadow-md" width="w-32" border="border-primary-900 border-4"></Avatar>
        {/if}
    </div>
    <div class="comic-form grid gap-10">
        <div class="grid relative">
            <header>
                <h1>{userModel.userName}</h1>
            </header>
            <div class="flex flex-wrap gap-5 comic-body">
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
        {#if data.session?.user.id === userModel.id && userModel.homebrewFavorites && userModel.homebrewFavorites.length > 0}
        <hr class="divider">
        <HeroTable title="Favorite Heroes" userFavorites={userModel.id} hideOnEmpty={true}></HeroTable>
        {/if}
        <hr class="divider">
        <HeroTable title="{data.session?.user.id == userId ? 'My Heroes' : `${userModel.userName}'s Heroes` }" userId={userModel.id}></HeroTable>
    </div>
    {/if}
</div>
{/if}
{/key}