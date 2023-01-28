<script lang="ts">
    import '../theme.postcss';
    import '@skeletonlabs/skeleton/styles/all.css';
    import '../app.postcss';
    import "../app.css";
    import { onMount } from 'svelte'
    import { invalidate } from '$app/navigation'
    import { supabaseClient } from '$lib/db'
    import { page } from '$app/stores';
    import { AppShell, AppBar, Divider, Modal, Toast, AppRail, AppRailTile } from '@skeletonlabs/skeleton';
    import { menu } from '@skeletonlabs/skeleton';
    import { Drawer } from '@skeletonlabs/skeleton';
    import { drawerStore } from '@skeletonlabs/skeleton';
    import ComicButton from '$lib/components/ComicButton.svelte';
    import {  enhance } from '$app/forms';
    import { ToastHelper } from '$lib/helpers/ToastHelper';
    import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'
    import { writable, type Writable } from 'svelte/store';

    const storeValue: Writable<string> = writable("Home");
    
    const queryClient = new QueryClient()

    let email = '';

    onMount(() => {
        const {
            data: { subscription },
        } = supabaseClient.auth.onAuthStateChange((event, session) => {
            invalidate('supabase:auth')
        })

        return () => {
            subscription.unsubscribe()
        }
    });
    
    const drawerOpen: any = () => { drawerStore.open({position: 'left'}) };
    const drawerClose: any = () => { drawerStore.close() };
</script>

<QueryClientProvider client={queryClient}>
</QueryClientProvider>

<Modal/>

<Drawer>  
    <form method="POST" action="/api/user?/login&redirectTo={$page.url.href}" class="comic-form grid grid-flow-row m-auto max-w-xl gap-5 mt-10" use:enhance={({ form, data, action, cancel }) => {    
        return async ({ result }) => {
                if (result.type === 'success') {
                    drawerClose();
                    ToastHelper.create('Check your email for a magic link to login!', "success", 3000);
                }
        };
      }}>
        <p class="text-center">Enter your e-mail to sign in with a Magic Link.</p><p class="text-center italic">You will be sent a link to authenticate yourself.</p>
        <label>
            <span>E-Mail</span>
            <input name="email" type="email" bind:value={email}>
        </label>
        <div class="m-auto">
            <ComicButton text="Sign In" icon="mdi:login"></ComicButton>
        </div>        
    </form>
</Drawer>

<AppShell>
    <!-- Header -->
    <svelte:fragment slot="header">
        <AppBar background="bg-tertiary-600" class="text-black">
            <svelte:fragment slot="lead">
                <a href="/"><span class="text-3xl tracking-wider text-black" style:font-family="bangersregular">AUGSTOOLS</a>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <a class="btn-icon" href="https://github.com/ranaldsgift/augstools" aria-label="Github" target="_blank" rel="noreferrer">
                    <iconify-icon icon="mdi:github"></iconify-icon>
                </a>
                <a class="btn-icon" href="/donate" aria-label="Donate">
                    <iconify-icon icon="mdi:donate"></iconify-icon>
                </a>
                {#if $page.data.session}
                    <a href="/user/{$page.data.session.user.id}" aria-label="User Account" class="btn-icon">
                        <iconify-icon icon="mdi:user"></iconify-icon>
                    </a>
                {:else}
                <button class="btn-icon" aria-label="Login/Register" on:click={drawerOpen}>
                    <iconify-icon icon="mdi:user"></iconify-icon>
                </button>
                {/if}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Sidebar -->
	<svelte:fragment slot="sidebarLeft">        
        <AppRail selected={storeValue}>
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
            <AppRailTile label="Assets" title="Assets" tag="a" href="/assets" value="Assets">
                <iconify-icon style:font-size="3rem" style:margin-bottom="-10px" icon="entypo:folder-images"></iconify-icon>
            </AppRailTile>
            <svelte:fragment slot="trail">
                <AppRailTile tag="a" href="/about" value="About" aria-label="About">
                    <iconify-icon style:font-size="3rem" style:margin-bottom="-10px" icon="mdi:information"></iconify-icon>
                </AppRailTile>
            </svelte:fragment>
        </AppRail>  
    </svelte:fragment>
    <!-- Page Content Slot -->
    <slot />
	<svelte:fragment slot="pageFooter">
        <div class="max-w-4xl m-auto text-sm text-center p-4">This site is not in any way affiliated with IDW Games. The look and design of the AUGS assets are a trademark of IDW Games. The assets on this site may not be used for commercial purposes.</div>
    </svelte:fragment>
</AppShell>


<Toast/>