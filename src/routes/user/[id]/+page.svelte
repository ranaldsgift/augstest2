<script lang="ts">
    import { page } from "$app/stores";
    import ComicButton from "$lib/components/ComicButton.svelte";
    import { User } from "$lib/entities/User";
    import { DataHelper } from "$lib/helpers/DataHelper";
    import { UserHelper } from "$lib/helpers/UserHelper";
    import type { PageData } from './$types';

    export let data: PageData;

    const userModel = data.json ? DataHelper.deserialize<User>(User, data.json) : undefined;
</script>

{#if !userModel}
<p>The user does not exist. Either they never existed, or they existed at some point and then ceased to exist.</p>
{:else}
<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">{userModel.userName}</li>
</ol>

<div class="comic-border grow max-w-5xl m-auto bg-surface-200">
    {#if !userModel?.userName && data.session?.user.id == $page.params.id}
        <p class="p-8">Please create your user profile by clicking the Edit button below.</p>
    {:else if !userModel?.userName}
        <p>This user hasn't completed their user profile, or this user does not exist.</p>
    {:else if userModel}
    <h1 class="bg-tertiary-600 px-8 py-4 text-2xl">{userModel.userName}</h1>
    <div class="flex">
        {#if userModel.avatar}
            <img src={userModel.avatar} alt="Avatar" class="h-32 w-32 ml-8 mt-8 mb-8">
        {/if}
        <div class="p-8 grid">
            {#if userModel.discord}
            <p class="flex gap-2">
                <iconify-icon icon="ic:baseline-discord"></iconify-icon>
                {userModel.discord}
            </p>
            {/if}
            {#if userModel.boardgamegeek}
            <p class="flex gap-2">
                <iconify-icon icon="game-icons:meeple"></iconify-icon>
                <a href="https://boardgamegeek.com/user/{userModel.boardgamegeek}" target="_blank" rel="noreferrer">{userModel.boardgamegeek}</a>
            </p>
            {/if}
            <p class="flex gap-2">Created On: {new Date(userModel.dateCreated).toLocaleDateString()}</p>
            <p class="flex gap-2">Last Updated: {new Date(userModel.dateModified).toLocaleDateString()}</p>
        </div>
    </div>
    {/if}
</div>

{#if data.session?.user.id == $page.params.id}
<div class="flex gap-2 px-8 pt-4 justify-center">
    <a href="/user/{$page.params.id}/edit" class="unstyled">
        <ComicButton text="Edit Profile" icon="mdi:edit"></ComicButton>
    </a>
    <ComicButton text="Logout" icon="mdi:logout" callback={async () => { await UserHelper.signOut(); }}></ComicButton>
</div>
{/if}
{/if}