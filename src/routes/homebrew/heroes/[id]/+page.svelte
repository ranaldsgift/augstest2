<script lang="ts">
    import { page } from '$app/stores';
    import HeroSheet from '$lib/components/HeroEditorSheet.svelte';
    import ComicButton from '$lib/components/ComicButton.svelte';
    import { onMount } from 'svelte';
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
    import { drawerStore, RangeSlider } from '@skeletonlabs/skeleton';
    import PageButtonContainer from '$lib/components/PageButtonContainer.svelte';
    import { UserHomebrewFavorite } from '$lib/entities/UserHomebrewFavorite';
    import SkillCardBack from '$lib/components/SkillCardBack.svelte';
    import { domToPng } from 'modern-screenshot'
    import { toPng } from 'html-to-image'
    import HeroSheetBack from '$lib/components/homebrew/hero/HeroSheetBack.svelte';

    export let data: PageData;
    export let heroPage: HTMLElement;

    $: hero = DataHelper.deserialize<Hero>(Hero, data.heroModel);
    let authUser = data.authUser ? DataHelper.deserialize<User>(User, data.authUser) : null;

    let heroSheet: HTMLElement;

    let skillCardScale = 1;
    let initiativeCardScale = 0.75;
    let sheetScale = 1.0;
    let isDownloading = false;
    let isSheetFlipped = false;
    let skillCardsContainer: HTMLElement;

    onMount(async () => {
        updateScales();
    });

    function updateScales() {
        if (isDownloading) {
            return;
        }
        
        sheetScale =  window.innerWidth < 300 ? 0.35 : window.innerWidth < 350 ? 0.4 : window.innerWidth < 375 ? 0.45 : window.innerWidth < 550 ? 0.5 : window.innerWidth < 800 ? 0.75 : 1.0;
        skillCardScale = window.innerWidth < 350 ? 0.3 : window.innerWidth < 500 ? 0.4 : window.innerWidth < 800 ? 0.6 : 0.75;
        initiativeCardScale = window.innerWidth < 350 ? 0.4 : window.innerWidth < 550 ? 0.6 : window.innerWidth < 800 ? 0.6 : 0.8;
    }

    const handleDownload = async () => {
        if (isDownloading) {
            return;
        }

        drawerStore.open({ id: 'download', width: 'w-full' });

        const downloadHero = async() => {
            isDownloading = true;
            
            let initialSheetScale = sheetScale;
            let initialSkillCardScale = skillCardScale;
            let initialInitiativeCardScale = initiativeCardScale;

            sheetScale = 1;
            skillCardScale = 1;
            initiativeCardScale = 1;

            const heroSheetContainer = heroSheet.querySelector('.hero-sheet-container') as HTMLElement;
            const heroSheetBack = heroPage.querySelector('.hero-sheet-back-container') as HTMLElement;
            const initiativeCard = heroPage.querySelector('.initiative-card-container') as HTMLElement;
            const figureToken = heroPage.querySelector('.figure-token') as HTMLElement;
            const skillCardBack = heroPage.querySelector('.skill-card-back-container') as HTMLElement;

            const zip = new JSZip();
            const imageErrors: string[] = [];
                    
            const heroSheetPng = await getImage(heroSheetContainer, { style: { borderRadius: '0px' } });
            if (heroSheetPng) {
                zip.file(`${hero.name} by ${hero.user.userName}-Hero Sheet.png`, heroSheetPng.split(',')[1], { base64: true });
            }
            else {
                imageErrors.push('Hero Sheet');
            }

            const heroSheetBackPng = await getImage(heroSheetBack, { style: { borderRadius: '0px' } });
            if (heroSheetBackPng) {
                zip.file(`${hero.name} by ${hero.user.userName}-Hero Sheet-Back.png`, heroSheetBackPng.split(',')[1], { base64: true });
            }
            else {
                imageErrors.push('Hero Sheet Back');
            }

            const initiativeCardPng = await getImageWithBackgroundClipText(initiativeCard, { style: { borderRadius: '0px' } });
            if (initiativeCardPng) {
                zip.file(`${hero.name} by ${hero.user.userName}-Initiative Card.png`, initiativeCardPng.split(',')[1], { base64: true });
            }
            else {
                imageErrors.push('Initiative Card');
            }
            
            const initiativeCardBackPng = await fetch('/images/homebrew templates/initiative_back_background.jpg').then(r => r.blob());
            if (initiativeCardBackPng) {
                zip.file(`${hero.name} by ${hero.user.userName}-Initiative Card Back.jpg`, initiativeCardBackPng);
            }
            else {
                imageErrors.push('Hero Initiative Card Back');
            }

            const figureTokenPng = await getImage(figureToken);
            if (figureTokenPng) {
                zip.file(`${hero.name} by ${hero.user.userName}-Figure Token.png`, figureTokenPng.split(',')[1], { base64: true });
            }
            else {
                imageErrors.push('Figure Token');
            }

            if (hero.skillCards && hero.skillCards.length > 0) {
                zip.folder('skills');
                skillCardsContainer.style.display = 'grid';
                const skillCardBackPng = await getImage(skillCardBack, { style: { borderRadius: '0px' }});
                if (skillCardBackPng) {
                    zip.file(`skills/${hero.name} by ${hero.user.userName}-Skill Card-Back.png`, skillCardBackPng.split(',')[1], { base64: true });
                }
                else {
                    imageErrors.push('Skill Card Back');
                }

                const skillCards = heroPage.querySelectorAll('.skill-card-container') as NodeListOf<HTMLElement>;
                for (let i = 0; i < skillCards.length; i++) {
                    const skillCard = skillCards[i];
                    const skillCardPng = await getImage(skillCard, { style: { borderRadius: '0px' } });
                    if (skillCardPng) {
                        zip.file(`skills/${hero.name} by ${hero.user.userName}-Skill Card-${hero.skillCards[i].name}.png`, skillCardPng.split(',')[1], { base64: true });
                    }
                    else {
                        imageErrors.push(`Skill Card - ${hero.skillCards[i].name}`);
                    }
                }
            }

            if (imageErrors.length > 0) {
                ToastHelper.create(`The following items could not be downloaded:<br/><br/> ${imageErrors.join('<br/> ')}<br/><br/>These items are using an image host that is not approved. Contact the designer to resolve this issue.`, "error", 0, false);
            }

            const content = await zip.generateAsync({type:"blob"});
            download(content, `${hero.name} by ${hero.user.userName}-${Date.now()}.zip`);
            skillCardsContainer.style.display = 'flex';
            sheetScale = initialSheetScale;
            skillCardScale = initialSkillCardScale;
            initiativeCardScale = initialInitiativeCardScale;
            drawerStore.close();
            isDownloading = false;
        }
        setTimeout(downloadHero, 150);
    }

    async function getImage(element: HTMLElement, options?: any): Promise<string | undefined> {
        let image;
        try {            
            image = await toPng(element, options);
        }
        catch (err) {
            return;
        }
        
        return image;
    }

    async function getImageWithBackgroundClipText(element: HTMLElement, options?: any): Promise<string | undefined> {
        let image;
        try {            
            image = await domToPng(element, options);
        }
        catch (err) {
            return;
        }
        
        return image;
    }

    async function updateUserData(json: string) {
        const favorite =  json ? DataHelper.deserialize(UserHomebrewFavorite, json) : null;

        if (authUser) {
            if (favorite) {
                if (!authUser.homebrewFavorites) {
                    authUser.homebrewFavorites = [];
                }
                authUser.homebrewFavorites.push(favorite);
                ToastHelper.create(`Added ${hero.name} to your favorites!`, 'success', 3000);
            } else {
                authUser.homebrewFavorites = authUser.homebrewFavorites.filter(x => x.homebrewId != hero.id);
                ToastHelper.create(`Removed ${hero.name} from your favorites!`, 'success', 3000);
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
    .sheet-container {
    transform-style: preserve-3d;
    transition: all 1.0s linear;
    }
    .sheet-container.flipped {
    transform: rotateY(180deg) !important; 
    }
    .sheet-container .sheet {
    position: relative;
    backface-visibility: hidden;
    }
    .sheet-container .sheet.back {
    transform: rotateY(180deg);
    position: absolute;
    top: 0;
    }
</style>

<svelte:window on:resize={updateScales}></svelte:window>

<svelte:head>
    <title>{`${hero.name} by ${hero.user.userName}`} - Hero - augs.tools</title>
    <meta name="description" content={hero.description} />
</svelte:head>

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
        <div class="flex justify-center flex-wrap gap-2">
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
        <div class="sheet-container {isSheetFlipped ? 'flipped' : ''}">
            <button on:click|preventDefault={(e) => {
                isSheetFlipped = !isSheetFlipped;
            } } class="context-button absolute">
                <iconify-icon icon="mdi:arrow-u-right-top"></iconify-icon>
            </button>
            <div class="front sheet read-only" bind:this={heroSheet}>
                <HeroSheet scale={sheetScale} hero={hero}></HeroSheet>
            </div>
            <div class="sheet back">
                <HeroSheetBack {hero} theme={hero.theme}></HeroSheetBack>
            </div>
        </div>
            <div class="homebrew-details-container flex flex-wrap lg:flex-col gap-5 pb-5">                
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
            <h1>Designer Notes</h1>
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
                <div class="sm:-mb-10 sm:left-[-50%] relative z-10">
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
        <div bind:this={skillCardsContainer} class="comic-body flex gap-5 justify-center flex-wrap">
            <SkillCardBack backgroundColor={hero.sheetBackgroundColor} theme={hero.theme} image={hero.heroImage.url} scale={skillCardScale}></SkillCardBack>
            {#each hero.skillCards as skillCard, index}
                    <SkillCardEditor scale={skillCardScale} backgroundColor={hero.sheetBackgroundColor} skillCard={skillCard} heroName={hero.name} theme={hero.theme} template={SkillCardTemplates[hero.theme]}></SkillCardEditor>
            {/each}
        </div>
        {/if}
    </div>
</div>