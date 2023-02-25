<script lang="ts">
    import '../theme.postcss';
    import '@skeletonlabs/skeleton/styles/all.css';
    import '../app.postcss';
    import "../app.css";
    import { onMount } from 'svelte'
    import { afterNavigate, invalidate } from '$app/navigation'
    import { supabaseClient } from '$lib/db'
    import { page } from '$app/stores';
    import { AppShell, AppBar, Modal, Toast, AppRail, AppRailTile, LightSwitch, ProgressRadial } from '@skeletonlabs/skeleton';
    import { menu } from '@skeletonlabs/skeleton';
    import { Drawer } from '@skeletonlabs/skeleton';
    import { drawerStore } from '@skeletonlabs/skeleton';
    import ComicButton from '$lib/components/ComicButton.svelte';
    import {  enhance, type SubmitFunction } from '$app/forms';
    import { ToastHelper } from '$lib/helpers/ToastHelper';
    import { writable, type Writable } from 'svelte/store';
    import { storeTheme } from '$lib/stores/ThemeStore';
    import { browser } from '$app/environment';
    import type { LayoutData, LayoutServerData } from './$types';
    import PigeonPeteSays from '$lib/components/PigeonPeteSays.svelte';
    import AppSidebar from '$lib/components/AppSidebar.svelte';

	export let data: LayoutData;
    $: ({ currentTheme } = data);

    const sidebarStore: Writable<string> = writable("Home");

    let email = '';

    afterNavigate((nav) => {
        const page = document.getElementById('page');
        if (page && nav.type === 'link' && nav.from?.url.pathname !== nav.to?.url.pathname) {
            page.scrollTop = 0;
        }
    });

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
    
	const setTheme: SubmitFunction = () => {
		return async ({ result, update }) => {
			await update();
			if (result.type === 'success') {
				const theme = result.data?.theme as string;
				storeTheme.set(theme);
			}
		};
	};

    storeTheme.subscribe(setBodyThemeAttribute);
	function setBodyThemeAttribute(): void {
		if (!browser) return;
		document.body.setAttribute('data-theme', $storeTheme);
	}


	const themes = [
		{ type: 'default', name: 'Default', icon: '💫' },
		{ type: 'hamlindigo', name: 'Hamlindigo', icon: '👔' },
		{ type: 'vintage', name: 'Vintage', icon: '📺' },
	];
    
    const drawerOpen: any = () => { drawerStore.open({ id: 'login', position: 'left' }); };
    const drawerClose: any = () => { drawerStore.close(); };

</script>

<svelte:head>
	<!-- Select Preset Theme CSS DO NOT REMOVE ESCAPES-->
	{@html `\<style\>${currentTheme}}\</style\>`}
</svelte:head>

<Modal/>

<Drawer class="z-[100]">
	{#if $drawerStore.id === 'login'}
    <form method="POST" action="/api/user?/login&redirectTo={$page.url.href}" class="comic-form grid grid-flow-row m-auto max-w-xl gap-5 mt-10" use:enhance={({ form, data, action, cancel }) => {    
        return async ({ result }) => {
                if (result.type === 'success') {
                    drawerClose();
                    ToastHelper.create('Check your email for a magic link to login!', "success", 3000);
                }
                if (result.type === 'error') {
                    ToastHelper.create(result.error.message, "error", 5000);
                }
        };
      }}>
        <p class="text-center">Enter your e-mail to sign in with a Magic Link.</p><p class="text-center italic">You will be sent a link to authenticate yourself.</p>
        <label class="comic-label">
            <span>E-Mail</span>
            <input name="email" type="email" bind:value={email}>
        </label>
        <div class="m-auto">
            <ComicButton text="Sign In" icon="mdi:login"></ComicButton>
        </div>        
    </form>
    {:else if $drawerStore.id === 'download'}
    <div class="grid justify-center content-center h-full gap-5">
        <div style:width="120px" style:height="120px" class="grid justify-self-center">
            <ProgressRadial stroke={100} meter="stroke-tertiary-700" track="stroke-tertiary-700/20"></ProgressRadial>
        </div>
        <PigeonPeteSays>
            <p>Hey bird brain, I'm getting your download ready!</p>
            <p>Hang tight...</p>
        </PigeonPeteSays>
    </div>
    {:else if $drawerStore.id === 'mobile-menu'}
    <AppSidebar classList="w-[80px]" selected={sidebarStore}></AppSidebar>
    {/if}
</Drawer>

<AppShell slotHeader="z-30">
    <!-- Header -->
    <svelte:fragment slot="header">
        <AppBar background="bg-tertiary-600" class="text-black">
            <svelte:fragment slot="lead">
                <button class="sm:hidden mr-4" on:click={() => drawerStore.open({ id: 'mobile-menu', width: '120px' })} >
                    <iconify-icon icon="mdi:menu"></iconify-icon>
                </button>
                <a href="/"><span class="text-3xl tracking-wider text-black hidden sm:block" style:font-family="bangersregular">AUGSTOOLS</a>
            </svelte:fragment>
            <svelte:fragment slot="trail">
                <div class="relative">
                    <button class="btn-icon" use:menu={{ menu: 'theme', fixed: true, interactive: true }}>
                        <iconify-icon icon="material-symbols:palette"></iconify-icon>
                    </button>
                    <!-- <div class="card w-64 shadow-xl max-w-fit menu-tr sm:max-w-none" data-menu="theme"> -->
                    <div class="card p-4 w-60 shadow-xl menu-tr " data-menu="theme">
                        <section class="flex justify-between items-center">
                            <p>Dark Mode</p>
                            <LightSwitch />
                        </section>
                        <hr class="my-4" />
                        <nav class="list-nav p-4 -m-4 max-h-64 lg:max-h-[500px] overflow-y-auto">
                            <form action="/?/setTheme" method="POST" use:enhance={setTheme}>
                                <ul>
                                    {#each themes as { icon, name, type }}
                                        <li>
                                            <!-- prettier-ignore -->
                                            <button class="option w-full h-full" type="submit" name="theme" value={type} class:bg-primary-active-token={$storeTheme === type}>
                                                <span>{icon}</span>
                                                <span>{name}</span>
                                            </button>
                                        </li>
                                    {/each}
                                </ul>
                            </form>
                        </nav>
                    </div>
                </div>
                <a class="btn-icon hidden sm:flex" href="https://github.com/ranaldsgift/augstools" aria-label="Github" target="_blank" rel="noreferrer">
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
        <AppSidebar classList="hidden sm:grid" selected={sidebarStore}></AppSidebar>
    </svelte:fragment>
    <!-- Page Content Slot -->
        <slot />
	<svelte:fragment slot="pageFooter">
        <div class="max-w-4xl m-auto text-sm text-center p-4">This site is not in any way affiliated with IDW Games. The look and design of the AUGS assets are a trademark of IDW Games. The assets on this site may not be used for commercial purposes.</div>
    </svelte:fragment>
</AppShell>


<Toast/>