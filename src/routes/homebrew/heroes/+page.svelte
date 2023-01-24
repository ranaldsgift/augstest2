<script lang="ts">
    import { DiceIconsEnum } from '$lib/enums/Enums';
    import { createDataTableStore, dataTableHandler, tableInteraction, Avatar, Paginator } from '@skeletonlabs/skeleton';
    import { DateHelper } from '$lib/helpers/DateHelper';
    import ComicButton from '$lib/components/ComicButton.svelte';
    import type { PageData } from './$types';
    import { Hero } from '$lib/entities/Hero';
    import { ThemeTemplatesEnum } from '$lib/interfaces/templates/ThemeTemplatesEnum';
    import ActionDiceIcon from '$lib/components/ActionDiceIcon.svelte';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import HeroTable from '$lib/components/HeroTable.svelte';

    export let data: PageData;

    const parsedItems: Hero[] = DataHelper.deserializeArray<Hero>(Hero, data.jsonList);
        
    let searchInput: HTMLInputElement;
    let sortKey: keyof Hero = 'dateModified';
    $: sortKeyState = sortKey;
    $: sortAscState = 'false';

    const dataTableStore = createDataTableStore(
        parsedItems,
        {
            search: '',
            sort: '',
            pagination: { offset: 0, limit: 10, size: 0, amounts: [5, 10] }
        }
    );


    $dataTableStore.sort = 'dateModified';
    $dataTableStore.sortState = { asc: false, lastKey: 'dateModified' };

    // This automatically handles search, sort, etc when the model updates.
    dataTableStore.subscribe((model) => dataTableHandler(model));

    // Skeleton DataTables has a bug that causes the search field to not work after sorting columns
    // These functions are a workaround until that bug is resolved
    function handleSearch() {
        $dataTableStore.sort = '';
    }
    function handleSort() {
        $dataTableStore.sortState = { asc: sortAscState === 'true' ? true : false, lastKey: '' };
        $dataTableStore.sort = sortKeyState;
        searchInput.dispatchEvent(new Event("input"));
    }
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
    <HeroTable heroes={parsedItems}></HeroTable>
    {#if data.session}
    <div class="page-button-container">
        <a href="/homebrew/heroes/create/" class="unstyled">
            <ComicButton icon="mdi:edit" text="Create"></ComicButton>
        </a>
    </div>
    {/if}
</div>