<script lang="ts">
    import type { Villain } from "$lib/entities/Villain";
    import { Villains } from "$lib/stores/DataStores";
    import { createDataTableStore, Paginator } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import CompetitiveVillainEditor from "./CompetitiveVillainEditor.svelte";
    import CooperativeVillainEditor from "./CooperativeVillainEditor.svelte";

    export let title: string = 'Villains'; 
    export let data: Villain[] = [];
    export let userId: string | null = null;
    export let heroId: string | null = null;
    export let isDeleted: boolean | null = null;
    export let hideOnEmpty: boolean | null = false;
    export let dataTableStore = createDataTableStore(
        data,
        {
            search: '',
            sort: '',
            pagination: { offset: 0, limit: 12, size: 0, amounts: [12, 24, 36] }
        }
    );

    const loadData = async () => {
        let data = Villains.loadData(getApiQuery());
        let villains = await data;

        if ($dataTableStore.pagination) {
            $dataTableStore.pagination.size = villains.count;
            
            if ($dataTableStore.pagination.offset * $dataTableStore.pagination.limit > villains.count) {
                $dataTableStore.pagination.offset = villains.count / $dataTableStore.pagination.limit;
            }
        }

        dataTableStore.updateSource(villains.items);
    }

    const getApiQuery = () => {
    
        let apiQuery = `limit=${$dataTableStore.pagination?.limit}&offset=${$dataTableStore.pagination?.offset}&sort=${$dataTableStore.sort}&asc=${$dataTableStore.sortState?.asc}`;

        if ($dataTableStore.search && $dataTableStore.search.length > 0) {
            apiQuery += `&search=${$dataTableStore.search}`;
        }
        if (heroId) {
            apiQuery += `&heroId=${heroId}`;
        }
        if (userId) {
            apiQuery += `&userId=${userId}`;
        }
        if (isDeleted) {
            apiQuery += `&isDeleted=${isDeleted}`;
        }

        return apiQuery;
    }
    
    let searchInput: HTMLInputElement;
    let sortKey: keyof Villain = 'dateModified';
    let sortAsc: string = 'false';

    if ($dataTableStore.sort.length === 0) {
        $dataTableStore.sort = 'dateModified';
        $dataTableStore.sortState = { asc: false, lastKey: 'dateModified' };
    }
    else {
        sortKey = $dataTableStore.sort as keyof Villain;
        sortAsc = $dataTableStore.sortState?.asc ? 'true' : 'false';
    }

    $: sortKeyState = sortKey;
    $: sortAscState = sortAsc;

    onMount(() => {
        loadData();
    });

    let timer: any;

    function handleSearch() {
        if ($dataTableStore.pagination) {
            $dataTableStore.pagination.offset = 0;
        }
        clearTimeout(timer);
        timer = setTimeout(() => {
            loadData();
        }, 150);
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
    a {
    position: relative;
    width: 280px;
    height: 226px;
    z-index: 1;
    perspective: 1000;
    }
    .villain-table-row {
    width: 100%;
    height: 100%;
    transform-style: preserve-3d;
    transition: all 1.0s linear;
    }
    .villain-table-row.flipped {
    transform: rotateY(180deg) !important; 
    }
    .villain-table-row .sheet {
    position: absolute;
    backface-visibility: hidden;
    }
    .villain-table-row .sheet.back {
    transform: rotateY(180deg);
    }
</style>

{#if $dataTableStore.source.length > 0 || !hideOnEmpty}
<div class="table-container grid mb-2">
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
                <input class="unstyled w-full" bind:this={searchInput} bind:value={$dataTableStore.search}  on:input={handleSearch} type="search" placeholder="Search..." />
            </div>
        </div>
        <table class="mt-5 flex flex-wrap gap-5 justify-center">
            {#each $dataTableStore.filtered as row, rowIndex (row.id)}
            <a in:fade href="/homebrew/villains/{row.id}" class="relative">
                <div class="villain-table-row {!row.cooperative && row.competitive ? 'flipped' : ''}">
                    {#if row.cooperative && row.competitive}
                    <button on:click|preventDefault={(e) => {
                        e.currentTarget.parentElement?.classList.toggle('flipped')
                    } } class="context-button absolute"><iconify-icon icon="mdi:arrow-u-right-top"></iconify-icon></button>
                    {/if}
                    {#if row.cooperative}
                    <div class="cooperative sheet front read-only">
                        <CooperativeVillainEditor villain={row} scale={0.4}></CooperativeVillainEditor>
                    </div>
                    {/if}
                    {#if row.competitive}
                    <div class="competitive sheet back read-only">
                        <CompetitiveVillainEditor villain={row} scale={0.4}></CompetitiveVillainEditor>
                    </div>
                    {/if}
                </div>
            </a>
            {/each}
        </table>
    </div>
</div>
{#if $dataTableStore.pagination}<Paginator on:amount={handleAmountChange} on:page={handlePageChange} bind:settings={$dataTableStore.pagination} />{/if}
{/if}