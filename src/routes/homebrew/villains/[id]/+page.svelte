<script lang="ts">
    import ComicButton from '$lib/components/ComicButton.svelte';
    import PageButtonContainer from '$lib/components/PageButtonContainer.svelte';
    import CompetitiveVillainEditor from '$lib/components/CompetitiveVillainEditor.svelte';
    import CooperativeVillainEditor from '$lib/components/CooperativeVillainEditor.svelte';
    import { Villain } from '$lib/entities/Villain';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import { DateHelper } from '$lib/helpers/DateHelper';
    import type { PageData } from './$types';
    import { page } from '$app/stores';
    import { drawerStore } from '@skeletonlabs/skeleton';
    import { domToPng } from 'modern-screenshot'
    import download from 'downloadjs';
    import JSZip from 'jszip';
    import { toPng } from 'html-to-image';
    import { ToastHelper } from '$lib/helpers/ToastHelper';
    import InitiativeCard from '$lib/components/InitiativeCard.svelte';
    import FigureToken from '$lib/components/FigureToken.svelte';
    import CooperativeVillainSheetBack from '$lib/components/homebrew/villain/CooperativeVillainSheetBack.svelte';
    import CompetitiveVillainSheetBack from '$lib/components/homebrew/villain/CompetitiveVillainSheetBack.svelte';
    import { onMount } from 'svelte';

    export let data: PageData;

    $: villain = DataHelper.deserialize<Villain>(Villain, data.villainJSON);

    let cooperativeVillainSheet: HTMLElement;
    let competitiveVillainSheet: HTMLElement;
    let competitiveVillainBack: HTMLElement;
    let cooperativeVillainBack: HTMLElement;
    let villainScale = 1;
    let villainPage: HTMLElement;
    let initiativeCardScale = 0.75;
    let initiativeCard: HTMLElement;
    let figureToken: HTMLElement;
    let isCompetitiveSheetFlipped = false;
    let isCooperativeSheetFlipped = false;
    let isDownloading = false;

    $: initiativeCardAbilityText = villain.cooperative ? villain.cooperative.abilities[0].name : villain.competitive ? villain.competitive.abilities[0].name : '';

    onMount(async () => {
        updateScales();
    });

    function updateScales() {
        if (isDownloading) {
            return;
        }
        
        villainScale =  window.innerWidth < 300 ? 0.35 : window.innerWidth < 350 ? 0.4 : window.innerWidth < 375 ? 0.45 : window.innerWidth < 550 ? 0.5 : window.innerWidth < 800 ? 0.75 : 1.0;
        initiativeCardScale = window.innerWidth < 350 ? 0.4 : window.innerWidth < 550 ? 0.6 : window.innerWidth < 800 ? 0.6 : 0.8;
    }

    const handleDownload = async () => {
        if (isDownloading) {
            return;
        }

        drawerStore.open({ id: 'download', width: 'w-full' });

        const downloadVillain = async() => {
            isDownloading = true;

            let initialVillainScale = villainScale;

            const zip = new JSZip();
            const imageErrors: string[] = [];

            if (villain.cooperative) {
                const villainPng = await getImage(cooperativeVillainSheet, { style: { borderRadius: '0px' } });
                if (villainPng) {
                    zip.file(`${villain.name} by ${villain.user.userName}-Villain Cooperative Sheet.png`, villainPng.split(',')[1], { base64: true });
                }
                else {
                    imageErrors.push('Cooperative Villain Sheet');
                }

                const villainBackPng = await getImage(cooperativeVillainBack, { style: { borderRadius: '0px' } });
                if (villainBackPng) {
                    zip.file(`${villain.name} by ${villain.user.userName}-Villain Cooperative Sheet-Back.png`, villainBackPng.split(',')[1], { base64: true });
                }
                else {
                    imageErrors.push('Cooperative Villain Sheet Back');
                }
            }
            if (villain.competitive) {
                const villainPng = await getImage(competitiveVillainSheet, { style: { borderRadius: '0px' } });
                if (villainPng) {
                    zip.file(`${villain.name} by ${villain.user.userName}-Villain Competitive Sheet.png`, villainPng.split(',')[1], { base64: true });
                }
                else {
                    imageErrors.push('Competitive Villain Sheet');
                }

                const competitiveVillainBackPng = await getImage(competitiveVillainBack, { style: { borderRadius: '0px' } });
                if (competitiveVillainBackPng) {
                    zip.file(`${villain.name} by ${villain.user.userName}-Villain Competitive Sheet-Back.png`, competitiveVillainBackPng.split(',')[1], { base64: true });
                }
                else {
                    imageErrors.push('Competitive Villain Sheet Back');
                }
            }

            const initiativeCardPng = await getImageWithBackgroundClipText(initiativeCard, { style: { borderRadius: '0px' } });
            if (initiativeCardPng) {
                zip.file(`${villain.name} by ${villain.user.userName}-Initiative Card.png`, initiativeCardPng.split(',')[1], { base64: true });
            }
            else {
                imageErrors.push('Villain Initiative Card');
            }

            const initiativeCardBackPng = await fetch('/images/homebrew templates/initiative_back_background.jpg').then(r => r.blob());
            if (initiativeCardBackPng) {
                zip.file(`${villain.name} by ${villain.user.userName}-Initiative Card Back.jpg`, initiativeCardBackPng);
            }
            else {
                imageErrors.push('Villain Initiative Card Back');
            }

            const figureTokenPng = await getImage(figureToken, { style: { borderRadius: '0px' } });
            if (figureTokenPng) {
                zip.file(`${villain.name} by ${villain.user.userName}-Figure Token.png`, figureTokenPng.split(',')[1], { base64: true });
            }
            else {
                imageErrors.push('Villain Figure Token');
            }

            if (imageErrors.length > 0) {
                ToastHelper.create(`The following items could not be downloaded:<br/><br/> ${imageErrors.join('<br/> ')}<br/><br/>These items are using an image host that is not approved. Contact the designer to resolve this issue.`, "error", 0, false);
            }

            const content = await zip.generateAsync({type:"blob"});
            download(content, `${villain.name} by ${villain.user.userName}-${Date.now()}.zip`);        
            villainScale = initialVillainScale;
            drawerStore.close();
            isDownloading = false;
        }
        setTimeout(downloadVillain, 150);
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
</script>

<style>
    .villain-page {
        max-width: 1566px;
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
    <title>{villain.name} by {villain.user.userName} - Villain - augs.tools</title>
    <meta name="description" content={villain.description} />
</svelte:head>

<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew/villains">Villains</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">{villain.name}</li>
</ol>

<div class="villain-page grid gap-5" bind:this={villainPage}>    
    <PageButtonContainer>
        <div class="flex justify-center flex-wrap page-button-container gap-2">
            {#if data.session?.user.id == villain.user.id}
            <a href={$page.url + "/edit"} class="unstyled">
                <ComicButton icon="mdi:edit" text="Edit"></ComicButton>
            </a>
            {/if}
            <ComicButton icon="material-symbols:download-rounded" callback={handleDownload}></ComicButton>
        </div>
    </PageButtonContainer>
    <div class="grid gap-5">
        <div class="flex flex-wrap justify-center gap-5">
            <div class="grid gap-5">
                {#if villain.cooperative}
                <div class="sheet-container {isCooperativeSheetFlipped ? 'flipped' : ''}">
                    <button on:click|preventDefault={(e) => {
                        isCooperativeSheetFlipped = !isCooperativeSheetFlipped;
                    } } class="context-button absolute">
                        <iconify-icon icon="mdi:arrow-u-right-top"></iconify-icon>
                    </button>
                    <div class="front sheet read-only" bind:this={cooperativeVillainSheet}>
                        <CooperativeVillainEditor {villain} scale={villainScale} bind:cooperativeVillainSheet={cooperativeVillainSheet}></CooperativeVillainEditor>
                    </div>
                    <div class="sheet back">
                        <CooperativeVillainSheetBack bind:container={cooperativeVillainBack} {villain} scale={villainScale} theme={villain.theme}></CooperativeVillainSheetBack>
                    </div>
                </div>
                {/if}
                {#if villain.competitive}
                <div class="sheet-container {isCompetitiveSheetFlipped ? 'flipped' : ''}">
                    <button on:click|preventDefault={(e) => {
                        isCompetitiveSheetFlipped = !isCompetitiveSheetFlipped;
                    } } class="context-button absolute">
                        <iconify-icon icon="mdi:arrow-u-right-top"></iconify-icon>
                    </button>
                    <div class="front sheet read-only" bind:this={competitiveVillainSheet}>
                        <CompetitiveVillainEditor {villain} scale={villainScale} bind:competitiveVillainSheet={competitiveVillainSheet}></CompetitiveVillainEditor>
                    </div>
                    <div class="sheet back">
                        <CompetitiveVillainSheetBack bind:container={competitiveVillainBack} {villain} scale={villainScale} theme={villain.theme}></CompetitiveVillainSheetBack>
                    </div>
                </div>
                {/if}
            </div>
            <div class="homebrew-details-container flex flex-wrap lg:flex-col gap-5 pb-5">                
                <div class="comic-label">
                    <h1>Designer</h1>
                    <p><a href="/user/{villain.user.id}">{villain.user.userName}</a></p>
                </div>
                <div class="comic-label">
                    <h1>Created</h1>
                    <p>{new Date(villain.dateCreated).toLocaleDateString()}</p>
                </div>
                {#if villain.dateCreated != villain.dateModified}
                <div class="comic-label">
                    <h1>Updated</h1>
                    <p>{DateHelper.timeSinceString(new Date(villain.dateModified), new Date())}</p>
                </div>
                {/if}
            </div>
        </div>
        {#if villain.description}
        <div class="flex gap-5 pb-5 justify-center">   
            <div class="comic-label max-w-7xl">
                <h1>Designer Notes</h1>
                <p>{villain.description}</p>
            </div>
        </div>
        {/if}
        <div class="flex flex-col justify-center">
            <header class="comic-header">
                <h1>Initiative Card and Token</h1>
            </header>
            <div class="comic-body grid sm:flex items-end justify-center mb-5">
                <div bind:this={initiativeCard}>
                <InitiativeCard theme={villain.theme} scale={initiativeCardScale} image={villain.image.url} name={villain.name} ability={initiativeCardAbilityText} backgroundColor={villain.backgroundColor}></InitiativeCard>    
                </div>
                <div class="sm:mb-10 sm:-ml-12 z-10">
                    <div bind:this={figureToken}>
                        <FigureToken imageUrl={villain.image.url}></FigureToken>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>