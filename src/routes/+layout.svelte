<script lang="ts">
    import '../theme.postcss';
    import '@skeletonlabs/skeleton/styles/all.css';
    import '../app.postcss';
    import "../app.css";
    import { onMount } from 'svelte'
    import { invalidate } from '$app/navigation'
    import { supabaseClient } from '$lib/db'
    import { page } from '$app/stores';
    import { AppShell, AppBar, Divider, Modal, Toast } from '@skeletonlabs/skeleton';
    import { menu } from '@skeletonlabs/skeleton';
    import { Drawer } from '@skeletonlabs/skeleton';
    import { drawerStore } from '@skeletonlabs/skeleton';
    import ComicButton from '$lib/components/ComicButton.svelte';
    import {  enhance } from '$app/forms';
    import { ToastHelper } from '$lib/helpers/ToastHelper';
    import { QueryClientProvider, QueryClient } from '@tanstack/svelte-query'
    
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

<svelte:head><title>AUGS Tools</title></svelte:head>

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
                <button aria-label="Menu" use:menu={{ menu: 'navmenu', fixed: true }} class="btn-icon">
                    <iconify-icon icon="mdi:menu"></iconify-icon>
                </button>
                <nav class="menu-tl card p-4 w-48 shadow-xl top-16 left-2 list-nav" data-menu="navmenu">
                    <ul>
                        <li><a href="/homebrew">Homebrew</a></li>
                        <li><a href="/create">Create</a></li>
                        <li><a href="https://tmntaugs.pages.dev/">Co-Op Tool</a></li>
                        <li><a href="/assets">Assets</a></li>
                        <Divider></Divider>
                        <li><a href="/about">About</a></li>
                        <li><a href="/contact">Contact</a></li>
                        <li><a href="/support">Support</a></li>
                    </ul>
                </nav>
                <a href="/"><span class="text-3xl tracking-wider text-black" style:font-family="bangersregular">AUGSTOOLS</a>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <a class="btn-icon" href="https://github.com/ranaldsgift/augstools" aria-label="Github" target="_blank" rel="noreferrer">
                    <iconify-icon icon="mdi:github"></iconify-icon>
                </a>
                {#if $page.data.session}
                    <a href="/user/{$page.data.session.user.id}" aria-label="User Account" class="btn-icon">
                        <iconify-icon icon="mdi:user"></iconify-icon>
                    </a>
                {:else}
                <button class="btn-icon" aria-label="Login/Register"  on:click={drawerOpen}>
                    <iconify-icon icon="mdi:user"></iconify-icon>
                </button>
                {/if}
            </svelte:fragment>
        </AppBar>
    </svelte:fragment>
    <!-- Sidebar -->
    <!-- Page Content Slot -->
    <slot />
	<svelte:fragment slot="pageFooter">
        <div class="max-w-4xl m-auto text-sm text-center p-4">This site is not in any way affiliated with IDW Games. The look and design of the AUGS assets are a trademark of IDW Games. The assets on this site may not be used for commercial purposes.</div>
    </svelte:fragment>
</AppShell>


<Toast/>