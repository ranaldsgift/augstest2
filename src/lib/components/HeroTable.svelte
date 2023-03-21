<script lang="ts">
    import type { Hero } from "$lib/entities/Hero";
    import { Heroes } from "$lib/stores/DataStores";
    import { createDataTableStore, Paginator, tableInteraction } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import HeroEditorSheet from "./HeroEditorSheet.svelte";
    
    export let title: string = 'Heroes';
    export let userId: string | null = null;
    export let userFavorites: string | null = null;
    export let isDeleted: boolean | null = null;
    export let hideOnEmpty: boolean | null = false;

    let heroes: Hero[] = [];
    export let dataTableStore = createDataTableStore(
        heroes,
        {
            search: '',
            sort: '',
            pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 50] }
        }
    );

    const loadData = async () => {
        let promise = Heroes.loadData(getApiQuery());
        let data = await promise;

        dataTableStore.updateSource(data.items);
        if ($dataTableStore.pagination) {
            $dataTableStore.pagination.size = data.count;
        }
    }

    const getApiQuery = () => {

        let apiQuery = `limit=${$dataTableStore.pagination?.limit}&offset=${$dataTableStore.pagination?.offset}&sort=${$dataTableStore.sort}&asc=${$dataTableStore.sortState?.asc}`;

        if ($dataTableStore.search && $dataTableStore.search.length > 0) {
            apiQuery += `&search=${$dataTableStore.search}`;
        }
        if (userId) {
            apiQuery += `&userId=${userId}`;
        }
        if (userFavorites) {
            apiQuery += `&userFavorites=${userFavorites}`;
        }
        if (isDeleted) {
            apiQuery += `&isDeleted=${isDeleted}`;
        }

        return apiQuery;
    }
    
    let searchInput: HTMLInputElement;
    let sortKey: keyof Hero = 'dateModified';
    let sortAsc: string = 'false';

    if ($dataTableStore.sort.length === 0) {
        $dataTableStore.sort = 'dateModified';
        $dataTableStore.sortState = { asc: false, lastKey: 'dateModified' };
    }
    else {
        sortKey = $dataTableStore.sort as keyof Hero;
        sortAsc = $dataTableStore.sortState?.asc ? 'true' : 'false';
    }

    $: sortKeyState = sortKey;
    $: sortAscState = sortAsc;

    onMount(() => {
        loadData();
    });

    function handleSearch() {
        if ($dataTableStore.pagination) {
            $dataTableStore.pagination.offset = 0;
        }
        loadData();
    }
    function handleSort() {
        if ($dataTableStore.pagination) {
            $dataTableStore.pagination.offset = 0;
        }
        $dataTableStore.sortState = { asc: sortAscState === 'true' ? true : false, lastKey: '' };
        $dataTableStore.sort = sortKeyState;
        loadData();
    }

    function handleAmountChange(e: CustomEvent): void {
        if ($dataTableStore.pagination) {
            $dataTableStore.pagination.limit = e.detail;
        }
        loadData();
    }

    function handlePageChange(e: CustomEvent): void {
        if ($dataTableStore.pagination) {
            $dataTableStore.pagination.offset = e.detail;
        }
        loadData();
    }
</script>

<style>
    .table-container {
        overflow-x: visible;
    }
    .table-container table {
        box-shadow: none;
        background-color: transparent;
        overflow-x: visible;
    }
    .dark .table-container tbody tr {
        background-color: rgb(var(--color-primary-800) / 0.5);
    }
    .table-container tbody tr {
        background-color: rgb(var(--color-primary-200) / 0.5);
    }
    .table-hover tbody tr:hover {
        box-shadow: -4px 4px 0 0 black, inset 0 -5px 4px -4px rgb(var(--color-surface-800)), inset 0 10px 9px -9px rgb(var(--color-surface-800)), inset 1000px 1000px 0 0 rgb(var(--color-primary-300)) !important;
    }
    .table-container .table tbody td:nth-child(n+6) {
        background-color: var(--diceBackgroundColor);
        width: 60px;
    }
    .table-container .table tbody td:nth-child(6) {
        border-radius: 30px 0 0 30px;
    }
    .table-container .table tbody td:nth-child(5)::after {
        content: '';
        border-radius: 40px 0 0 40px;
        box-shadow: -2px 0px 2px 0 #000000;
        top: 0;
        left: 0;
        height: 100%;
        width: 40px;
        position: absolute;
        background-color: var(--diceBackgroundColor);
    }
    .table-container .table thead tr {
        /* border: 1px solid black; */
        background-color: rgba(var(--color-tertiary-700));
        color: white;
        text-shadow: 2px 2px rgba(var(--color-surface-800));
        font-family: 'bangersregular';
        font-size: 1.75rem;
        letter-spacing: 4px;
    }
    .table-container .table thead tr th {
        padding: 5px;
    }
    .table-container .table tr td {
        padding: 10px;
        font-size: 1rem;
    }
    tr>td:first-child {
        padding: 0px !important;
    }
</style>

{#if $dataTableStore.source.length > 0 || !hideOnEmpty}
<div class="table-container grid">
    <header class="comic-header">
        <h1>{title}</h1>
    </header>
    <div class="comic-body">
        <div class="flex flex-wrap gap-5 relative justify-center">
            <div class="comic-label sm:max-w-[200px]">
                <h1>Sort</h1>
                <select class="unstyled" bind:value={sortKeyState} on:change={(e) => { $dataTableStore.sort = sortKeyState; handleSort()}}>
                    <option value="dateModified">Last Updated</option>
                    <option value="name">Name</option>
                </select>
            </div>
            <div class="comic-label sm:max-w-[150px]">
                <h1>Order</h1>
                <select class="unstyled" bind:value={sortAscState} on:change={(e) => { handleSort() }}>
                    <option value="true">Ascending</option>
                    <option selected value="false">Descending</option>
                </select>
            </div>
            <div class="comic-label grow">
                <h1>Search</h1>
                <input class="unstyled w-full" bind:this={searchInput} bind:value={$dataTableStore.search} on:input={handleSearch} type="search" placeholder="Search..." />
            </div>
        </div>
        <table class="mt-5 flex flex-wrap gap-5 justify-center" use:tableInteraction>
            {#each $dataTableStore.filtered as row, rowIndex}
            {#key row.id}
            <a in:fade href="/homebrew/heroes/{row.id}" class="relative">
                <div class="read-only">
                    <HeroEditorSheet hero={row} scale={0.4}></HeroEditorSheet>
                </div>
            </a>
            {/key}
            {/each}
        </table>
    </div>
</div>
{#if $dataTableStore.pagination}<Paginator on:amount={handleAmountChange} on:page={handlePageChange} bind:settings={$dataTableStore.pagination} />{/if}
{/if}