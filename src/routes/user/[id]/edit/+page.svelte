<script lang="ts">
    import ComicButton from '$lib/components/ComicButton.svelte';
    import { ToastHelper } from '$lib/helpers/ToastHelper';
    import { User } from '$lib/entities/User';
    import { FormHelper } from '$lib/helpers/FormHelper';
    import type { PageData } from './$types';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import PageButtonContainer from '$lib/components/PageButtonContainer.svelte';

    export let data: PageData;

    let userModel = data.json ? DataHelper.deserialize<User>(User, data.json) : undefined;

    async function handleSave() {
        const response = await fetch('/api/user?/save', {
            method: 'POST',
            body: FormHelper.serializeFormData(userModel)
        });

        const data = await response.json();

        if (response.ok) {
            ToastHelper.create('Saved!');
        }
        else {
            ToastHelper.create(data.error.message, 'error', 5000);
        }
    }
</script>

{#key userModel?.id}
{#if userModel && userModel.id == data.session?.user.id}
<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/user/{userModel.id}">{userModel.userName ?? 'Profile'}</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Edit</li>
</ol>

<div class="user-edit-page">
    <form class="comic-form max-w-2xl m-auto grid gap-4" on:submit|preventDefault={handleSave}>
        <PageButtonContainer>
            <ComicButton text="Save Profile" icon="material-symbols:save"></ComicButton>
        </PageButtonContainer>
        <div>
            <header>
                <h1>Edit your User Profile</h1>
            </header>
            <div class="px-8 py-4 grid gap-4">
                <label class="comic-label">
                    <span>User Name</span>
                    <input type="text" name="userName" bind:value="{userModel.userName}" placeholder="Enter your user name">
                </label>
                <label class="comic-label">
                    <div class="flex gap-1 items-center">
                        <iconify-icon icon="carbon:user-avatar-filled"></iconify-icon>
                        Avatar Image URL
                    </div>
                    <input type="text" name="avatar" bind:value="{userModel.avatar}" placeholder="Enter an image URL for your avatar">
                    
                </label>
                <label class="comic-label">
                    <div class="flex gap-1 items-center">
                        <iconify-icon icon="ic:baseline-discord"></iconify-icon>
                        Discord
                    </div>
                    <input type="text" name="discord" bind:value="{userModel.discord}" placeholder="Enter your Discord user name">
                </label>
                <label class="comic-label">
                    <div class="flex gap-1 items-center">
                        <iconify-icon icon="game-icons:meeple"></iconify-icon>
                        BoardGameGeek
                    </div>
                    <input type="text" name="boardgamegeek" bind:value="{userModel.boardgamegeek}" placeholder="Enter your BGG user name">
                </label>
            </div>
        </div>
    </form>
</div>
{/if}
{/key}