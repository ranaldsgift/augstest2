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
    import * as htmlToImage from 'html-to-image';
    import download from 'downloadjs';
    import JSZip from 'jszip';
    import type { Options } from 'html-to-image/lib/types';
    import { ToastHelper } from '$lib/helpers/ToastHelper';

    export let data: PageData;

    $: villain = DataHelper.deserialize<Villain>(Villain, data.villainJSON);

    let cooperativeVillainSheet: HTMLElement;
    let competitiveVillainSheet: HTMLElement;
    let villainScale = 1;
    let villainPage: HTMLElement;

    const handleDownload = async () => {
        let initialVillainScale = villainScale;

        drawerStore.open({ id: 'download', width: 'w-full' });

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
        }
        if (villain.competitive) {
            const villainPng = await getImage(competitiveVillainSheet, { style: { borderRadius: '0px' } });
            if (villainPng) {
                zip.file(`${villain.name} by ${villain.user.userName}-Villain Competitive Sheet.png`, villainPng.split(',')[1], { base64: true });
            }
            else {
                imageErrors.push('Competitive Villain Sheet');
            }
        }

        if (imageErrors.length > 0) {
            ToastHelper.create(`The following items could not be downloaded:<br/><br/> ${imageErrors.join('<br/> ')}<br/><br/>These items are using an image host that is not approved. Contact the designer to resolve this issue.`, "error", 0, false);
        }

        const content = await zip.generateAsync({type:"blob"});
        download(content, `${villain.name} by ${villain.user.userName}-${Date.now()}.zip`);        
        villainScale = initialVillainScale;
        drawerStore.close();
    }    

    async function getImage(element: HTMLElement, options?: Options): Promise<string | undefined> {
        let image;
        try {            
            image = await htmlToImage.toPng(element, options);
        }
        catch (err) {
            return;
        }
        
        return image;
    }
</script>

<svelte:head><title>{villain.name} by {villain.user.userName} - Skill Card - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew/villains">Villains</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">{villain.name}</li>
</ol>

<div class="skill-card-page h-full" bind:this={villainPage}>    
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
    <div class="flex h-full justify-center gap-5 mt-5">
        <div class="read-only">
            {#if villain.cooperative}
            <CooperativeVillainEditor {villain} bind:cooperativeVillainSheet={cooperativeVillainSheet}></CooperativeVillainEditor>
            {/if}
            {#if villain.competitive}
            <CompetitiveVillainEditor {villain} bind:competitiveVillainSheet={competitiveVillainSheet}></CompetitiveVillainEditor>
            {/if}
        </div>
        <div class="homebrew-details-container flex flex-col sm:flex-row lg:flex-col gap-5 pb-5">                
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
</div>