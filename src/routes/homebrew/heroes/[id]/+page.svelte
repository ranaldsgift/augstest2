<script lang="ts">
    import { page } from '$app/stores';
    import HeroSheet from '$lib/components/HeroEditorSheet.svelte';
    import ComicButton from '$lib/components/ComicButton.svelte';
    import { onMount } from 'svelte';
    import * as htmlToImage from 'html-to-image';
    import { Hero } from '$lib/entities/Hero';
    import type { PageData } from './$types';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import InitiativeCard from '$lib/components/InitiativeCard.svelte';
    import ActionDie from '$lib/components/ActionDie.svelte';
    import FigureToken from '$lib/components/FigureToken.svelte';
    import { applyAction, enhance } from '$app/forms';
    import { User } from '$lib/entities/User';
    import { ToastHelper } from '$lib/helpers/ToastHelper';
    import { DateHelper } from '$lib/helpers/DateHelper';
    import download from 'downloadjs'
    import JSZip from 'jszip';

    export let data: PageData;
    export let heroPage: HTMLElement;

    const hero = DataHelper.deserialize<Hero>(Hero, data.heroModel);
    let authUser = data.authUser ? DataHelper.deserialize<User>(User, data.authUser) : null;

    let heroSheet: HTMLElement;

    function handleDownload() {
        var heroSheetContainer = heroSheet.querySelector('.hero-sheet-container') as HTMLElement;
        var initiativeCard = heroPage.querySelector('.initiative-card-container') as HTMLElement;
        var figureToken = heroPage.querySelector('.figure-token-container') as HTMLElement;

        htmlToImage.toPng(heroSheetContainer, { style: { borderRadius: '0px' } }).then(function (dataUrl) {
            const heroSheetPng = dataUrl;
            htmlToImage.toPng(initiativeCard, { style: { borderRadius: '0px' } }).then(function (dataUrl) {
                const initiativeCardPng = dataUrl;
                htmlToImage.toPng(figureToken).then(function (dataUrl) {
                    const figureTokenPng = dataUrl;

                    const zip = new JSZip();
                    zip.file(`${hero.name} by ${hero.user.userName}-Hero Sheet.png`, heroSheetPng.split(',')[1], { base64: true });
                    zip.file(`${hero.name} by ${hero.user.userName}-Initiative Card.png`, initiativeCardPng.split(',')[1], { base64: true });
                    zip.file(`${hero.name} by ${hero.user.userName}-Figure Token.png`, figureTokenPng.split(',')[1], { base64: true });

                    zip.generateAsync({type:"blob"}).then(function(content) {
                        download(content, `${hero.name} by ${hero.user.userName}-${Date.now()}.zip`);
                    });
                });
            });
        });
    }

    async function updateUserData(json: string) {
        const user = DataHelper.deserialize<User>(User, json);
        authUser = user;
        
        if (authUser.homebrewFavorites.some(x => x.homebrewId == hero.id)) {
            ToastHelper.create(`Added ${hero.name} to your favorites!`);
        } else {
            ToastHelper.create(`Removed ${hero.name} from your favorites!`);
        }        
    }
</script>

<style>
    .comic-form {
        min-width: 300px;
    }
    .hero-page :global(.hero-sheet-container) {
        pointer-events: none;
    }
    .hero-page {
        max-width: 1566px;
    }
    .dice-container>:global(*:nth-child(3)) {
        margin-left: -150px;
        margin-top: -25px;
        z-index: 0;
    }
    .edit-button {        
        position: fixed;
        top: 90px;
        right: 20px;
        z-index: 100;
    }
</style>

<svelte:head><title>{hero ? `${hero.name} by ${hero.user.userName}` : `For Pete's Sake!`}</title></svelte:head>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew/heroes">Heroes</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">{hero?.name}</li>
</ol>

<div bind:this={heroPage} class="hero-page flex justify-center gap-5 flex-col">    
    {#if !hero}
        <p>There is no data available for this Homebrew.</p>
    {:else}
    <div class="flex gap-5 justify-center flex-wrap">
        <div bind:this={heroSheet}>
            <HeroSheet hero={hero}></HeroSheet>
        </div>
        <div class="comic-form">
            <div class="flex flex-col grow gap-5 pb-5">                
                <div class="comic-label">
                    <h1>Designer</h1>
                    <p><a href="/user/{hero.user.id}">{hero.user.userName}</a></p>
                </div>
                <div class="comic-label">
                    <h1>Created</h1>
                    <p>{new Date(hero.dateCreated).toLocaleDateString()}</p>
                </div>
                {#if hero.dateCreated != hero.dateModified}
                <div class="comic-label">
                    <h1>Updated</h1>
                    <p>{DateHelper.timeSinceString(new Date(hero.dateModified), new Date())}</p>
                </div>
                {/if}
            </div>
        </div>
    </div>
        {#if hero.description}
        <div class="flex gap-5 pb-5 justify-center">   
            <div class="comic-label max-w-5xl">
                <h1>Hero Description</h1>
                <p>{hero.description}</p>
            </div>
        </div>
        {/if}
        <div class="flex gap-5 flex-col justify-center">
            <header class="comic-header">
                <h1>Initiative Card, Token & Dice</h1>
            </header>
            <div class="flex items-end self-center">
                <InitiativeCard theme={hero.theme} scale={0.8} image={hero.heroImage.url} name={hero.name} ability={hero.abilities[0].name} backgroundColor={hero.sheetBackgroundColor}></InitiativeCard>    
                <div class="grid">
                    <div class="-mb-10 -ml-12 z-10">
                        <FigureToken imageUrl={hero.heroImage.url}></FigureToken>
                    </div>
                    <div class="flex gap-10 mb-5 pt-16 -ml-4 justify-center dice-container">
                        <ActionDie backgroundColor={hero.actionDice.backgroundColor} faces={hero.actionDice.dice} iconColor={hero.actionDice.iconColor} theme={hero.theme}></ActionDie>
                        <ActionDie backgroundColor={hero.actionDice.backgroundColor} faces={hero.actionDice.dice} iconColor={hero.actionDice.iconColor} theme={hero.theme}></ActionDie>
                        <ActionDie backgroundColor={hero.actionDice.backgroundColor} faces={hero.actionDice.dice} iconColor={hero.actionDice.iconColor} theme={hero.theme}></ActionDie>
                    </div>
                </div>
            </div>            
            <header class="comic-header">
                <h1>Skill Cards</h1>
            </header>
        </div>
    {/if}
    
    <div class="flex justify-center edit-button gap-2">
        {#if $page.data.session?.user.id == hero.user.id}
        <a href={$page.url + "/edit"} class="unstyled">
            <ComicButton icon="mdi:edit" text="Edit Your Hero"></ComicButton>
        </a>
        {:else if authUser}}
        <form method="POST" action="/api/user?/favoriteHomebrew&id={hero.id}" use:enhance={() => {
            return async ( { result } ) => {
                if (result.type === 'error' || result.type === 'redirect') {
                    await applyAction(result);
                    return;
                }

                updateUserData(result.data?.user);
            };
        }}>
            <div title={authUser.homebrewFavorites.some(favorite => favorite.homebrewId === hero.id) ? "Remove this Hero from your favorites" : "Favorite this Hero"}>
            <ComicButton icon="material-symbols:favorite"
                background={authUser.homebrewFavorites.some(favorite => favorite.homebrewId === hero.id) ? 'rgba(var(--color-tertiary-500)' : 'rgba(var(--color-surface-300)' }></ComicButton>
            </div>
        </form>
        {/if}
        <div title="Download ZIP">
            <ComicButton icon="material-symbols:download-rounded" callback={handleDownload}></ComicButton>
        </div>
    </div>
</div>