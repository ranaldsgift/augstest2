<script lang="ts">
    import { DiceIconsEnum } from '$lib/enums/Enums';
    import { createDataTableStore, dataTableHandler, tableInteraction, Avatar, Paginator } from '@skeletonlabs/skeleton';
    import { DateHelper } from '$lib/helpers/DateHelper';
    import ComicButton from '$lib/components/ComicButton.svelte';
    import type { PageData } from './$types';
    import type { Hero } from '$lib/entities/Hero';
    import { ThemeTemplatesEnum } from '$lib/interfaces/templates/ThemeTemplatesEnum';
    import ActionDiceIcon from '$lib/components/ActionDiceIcon.svelte';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import HeroTable from '$lib/components/HeroTable.svelte';
    import PageButtonContainer from '$lib/components/PageButtonContainer.svelte';

    export let data: PageData;
</script>

<svelte:head><title>Browse Heroes - augs.tools</title></svelte:head>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Heroes</li>   
</ol>

<div class="max-w-7xl grid gap-5">
    <HeroTable></HeroTable>
    {#if data.session}
    <PageButtonContainer>
        <a href="/homebrew/heroes/create/" class="unstyled">
            <ComicButton icon="mdi:edit" text="Create"></ComicButton>
        </a>
    </PageButtonContainer>
    {/if}
</div>