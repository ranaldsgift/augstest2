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
    import SkillCardEditor from '$lib/components/SkillCardEditor.svelte';
    import { SkillCardTemplates } from '$lib/interfaces/templates/SkillCardTemplate';
    import { Drawer, drawerStore, ProgressRadial, RangeSlider } from '@skeletonlabs/skeleton';
    import PigeonPeteSays from '$lib/components/PigeonPeteSays.svelte';
    import PageButtonContainer from '$lib/components/PageButtonContainer.svelte';
    import { UserHomebrewFavorite } from '$lib/entities/UserHomebrewFavorite';
    import { plainToInstance } from 'class-transformer';

    export let data: PageData;
    export let heroPage: HTMLElement;

    const hero = DataHelper.deserialize<Hero>(Hero, data.heroModel);
    let authUser = data.authUser ? DataHelper.deserialize<User>(User, data.authUser) : null;

    let heroSheet: HTMLElement;

    let skillCardScale = 0.75;
    let initiativeCardScale = 0.75;
    let sheetScale = 1.0;

    onMount(async () => {
        updateScales();
    });

    const updateScales = () => {
        sheetScale =  window.innerWidth < 300 ? 0.35 : window.innerWidth < 350 ? 0.4 : window.innerWidth < 375 ? 0.45 : window.innerWidth < 550 ? 0.5 : window.innerWidth < 800 ? 0.75 : 1.0;
        skillCardScale = window.innerWidth < 350 ? 0.3 : window.innerWidth < 500 ? 0.4 : window.innerWidth < 800 ? 0.6 : 0.75;
        initiativeCardScale = window.innerWidth < 350 ? 0.4 : window.innerWidth < 550 ? 0.6 : window.innerWidth < 800 ? 0.6 : 0.8;
    }

    const handleDownload = async () => {
        let initialSheetScale = sheetScale;
        let initialSkillCardScale = skillCardScale;
        let initialInitiativeCardScale = initiativeCardScale;

        sheetScale = 1;
        skillCardScale = 1;
        initiativeCardScale = 1;

        drawerStore.open({ id: 'download', width: 'w-full' });
        const heroSheetContainer = heroSheet.querySelector('.hero-sheet-container') as HTMLElement;
        const initiativeCard = heroPage.querySelector('.initiative-card-container') as HTMLElement;
        const figureToken = heroPage.querySelector('.figure-token-container') as HTMLElement;

        const heroSheetPng = await htmlToImage.toPng(heroSheetContainer, { style: { borderRadius: '0px' } });
        const initiativeCardPng = await htmlToImage.toPng(initiativeCard, { style: { borderRadius: '0px' } });
        const figureTokenPng = await htmlToImage.toPng(figureToken);
        const zip = new JSZip();
        zip.file(`${hero.name} by ${hero.user.userName}-Hero Sheet.png`, heroSheetPng.split(',')[1], { base64: true });
        zip.file(`${hero.name} by ${hero.user.userName}-Initiative Card.png`, initiativeCardPng.split(',')[1], { base64: true });
        zip.file(`${hero.name} by ${hero.user.userName}-Figure Token.png`, figureTokenPng.split(',')[1], { base64: true });

        if (hero.skillCards && hero.skillCards.length > 0) {
            zip.folder('skills');
            const skillCards = heroPage.querySelectorAll('.skill-card-container') as NodeListOf<HTMLElement>;
            for (let i = 0; i < skillCards.length; i++) {
                const skillCard = skillCards[i];
                const skillCardPng = await htmlToImage.toPng(skillCard, { style: { borderRadius: '0px' } });
                zip.file(`skills/${hero.name} by ${hero.user.userName}-Skill Card-${hero.skillCards[i].name}.png`, skillCardPng.split(',')[1], { base64: true });
            }
        }

        const content = await zip.generateAsync({type:"blob"});
        download(content, `${hero.name} by ${hero.user.userName}-${Date.now()}.zip`);
        sheetScale = initialSheetScale;
        skillCardScale = initialSkillCardScale;
        initiativeCardScale = initialInitiativeCardScale;
        drawerStore.close();
    }

    async function updateUserData(json: string) {
        const favorite =  json ? DataHelper.deserialize(UserHomebrewFavorite, json) : null;

        if (authUser) {
            if (favorite) {
                if (!authUser.homebrewFavorites) {
                    authUser.homebrewFavorites = [];
                }
                authUser.homebrewFavorites.push(favorite);
                ToastHelper.create(`Added ${hero.name} to your favorites!`);
            } else {
                authUser.homebrewFavorites = authUser.homebrewFavorites.filter(x => x.homebrewId != hero.id);
                ToastHelper.create(`Removed ${hero.name} from your favorites!`);
            }
            authUser = authUser;
        }      
    }
</script>

<style>
    .hero-page :global(.hero-sheet-container), 
    .hero-page :global(.skill-card-container) {
        pointer-events: none !important;
    }
    .hero-page {
        max-width: 1566px;
    }
    .dice-container>:global(*:nth-child(3)) {
        margin-left: -150px;
        margin-top: -25px;
        z-index: 0;
    }
</style>

<svelte:window on:resize={updateScales} />

<svelte:head><title>{`${hero.name} by ${hero.user.userName}`} - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew/heroes">Heroes</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">{hero?.name}</li>
</ol>

<div bind:this={heroPage} class="hero-page flex justify-center gap-5 flex-col">
    <PageButtonContainer>
        <div class="flex justify-center flex-wrap page-button-container gap-2">
            {#if $page.data.session?.user.id == hero.user.id}
            <a href={$page.url + "/edit"} class="unstyled">
                <ComicButton icon="mdi:edit" text="Edit"></ComicButton>
            </a>
            {:else if authUser}
            <form method="POST" action="/api/user?/favoriteHomebrew&id={hero.id}" use:enhance={() => {
                return async ( { result } ) => {
                    if (result.type === 'error' || result.type === 'redirect') {
                        await applyAction(result);
                        return;
                    }

                    updateUserData(result.data?.favorite);
                };
            }}>
            <ComicButton icon="material-symbols:favorite"
                active={authUser.homebrewFavorites && authUser.homebrewFavorites.some(favorite => favorite.homebrewId === hero.id)}>
            </ComicButton>
            </form>
            {/if}
            <ComicButton icon="material-symbols:download-rounded" callback={handleDownload}></ComicButton>
        </div>
    </PageButtonContainer>
    <div class="flex gap-5 justify-center flex-wrap">
        <div bind:this={heroSheet}>
            <HeroSheet scale={sheetScale} hero={hero}></HeroSheet>
        </div>
            <div class="homebrew-details-container flex flex-col sm:flex-row lg:flex-col gap-5 pb-5">                
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
    {#if hero.description}
    <div class="flex gap-5 pb-5 justify-center">   
        <div class="comic-label max-w-7xl">
            <h1>Hero Description</h1>
            <p>{hero.description}</p>
        </div>
    </div>
    {/if}
    <div class="flex flex-col justify-center">
        <header class="comic-header">
            <h1>Initiative Card, Token & Dice</h1>
        </header>
        <div class="comic-body grid sm:flex items-end justify-center mb-5">
            <InitiativeCard theme={hero.theme} scale={initiativeCardScale} image={hero.heroImage.url} name={hero.name} ability={hero.abilities[0].name} backgroundColor={hero.sheetBackgroundColor}></InitiativeCard>    
            <div class="grid justify-center mt-5 sm:mt-0">
                <div class="sm:-mb-10 sm:-ml-12 z-10">
                    <FigureToken imageUrl={hero.heroImage.url}></FigureToken>
                </div>
                <div class="flex gap-10 mb-5 mt-14 -ml-10 sm:-ml-2 justify-center dice-container">
                    <ActionDie backgroundColor={hero.actionDice.backgroundColor} faces={hero.actionDice.dice} iconColor={hero.actionDice.iconColor} theme={hero.theme}></ActionDie>
                    <ActionDie backgroundColor={hero.actionDice.backgroundColor} faces={hero.actionDice.dice} iconColor={hero.actionDice.iconColor} theme={hero.theme}></ActionDie>
                    <ActionDie backgroundColor={hero.actionDice.backgroundColor} faces={hero.actionDice.dice} iconColor={hero.actionDice.iconColor} theme={hero.theme}></ActionDie>
                </div>
            </div>
        </div>     
        {#if hero.skillCards && hero.skillCards.length > 0}
        <header class="comic-header justify-center sm:justify-between !grid sm:!flex">
            <h1>Skill Cards</h1>
            <RangeSlider name="scale" class="hidden sm:!flex self-end content-center items-center mr-1 sm:mr-2 pb-2 pt-1 pr-4 pl-4 sm:gap-2 rounded-t-md border-primary-100 border-2 border-b-0 text-white bg-primary-900"
                accent="!accent-primary-500" 
                bind:value={skillCardScale} 
                max={1.5} 
                min={0.1} 
                step={0.05}
            >
                <iconify-icon icon="material-symbols:zoom-in-rounded" height={30} class="-mb-3"></iconify-icon>
            </RangeSlider>
        </header>
        <div class="comic-body flex gap-5 items-center justify-center flex-wrap">
            {#each hero.skillCards as skillCard, index}
                    <SkillCardEditor scale={skillCardScale} backgroundColor={hero.sheetBackgroundColor} skillCard={skillCard} heroName={hero.name} theme={hero.theme} template={SkillCardTemplates[hero.theme]}></SkillCardEditor>
            {/each}
        </div>
        {/if}
    </div>
</div>