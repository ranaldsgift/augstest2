<script lang="ts">
    import type { Hero } from "$lib/entities/Hero";
    import { DiceIconsEnum } from "$lib/enums/Enums";
    import { DateHelper } from "$lib/helpers/DateHelper";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { Heroes } from "$lib/stores/DataStores";
    import { createDataTableStore, dataTableHandler, Paginator, ProgressRadial, tableInteraction } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import ActionDiceIcon from "./ActionDiceIcon.svelte";
    
    export let title: string = 'Heroes';
    export let userId: string | null = null;
    export let userFavorites: string | null = null;
    export let isDeleted: boolean | null = null;
    export let hideOnEmpty: boolean | null = false;
    let heroes: Hero[] = [];

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
    $: sortKeyState = sortKey;
    $: sortAscState = 'false';

    const dataTableStore = createDataTableStore(
        heroes,
        {
            search: '',
            sort: '',
            pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 50] }
        }
    );

    $dataTableStore.sort = 'dateModified';
    $dataTableStore.sortState = { asc: false, lastKey: 'dateModified' };

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
        <table class="table table-hover" use:tableInteraction>
            <thead style:display="none">
                <tr>
                    <th></th>
                    <th data-sort="name">Name</th>
                    <th>Designer</th>
                    <th data-sort="dateModified">Last Updated</th>
                    <th colspan="7" align="center">Action Dice</th>
                </tr>
            </thead>
            <tbody>
                {#each $dataTableStore.filtered as row, rowIndex}
                {#key row.id}
                    <tr class="h-[50px] sm:h-[80px]"></tr>
                    <tr class="comic-shadow" style:--diceBackgroundColor={row.actionDice.backgroundColor}>
                        <td style:position="relative" class="w-[100px] sm:w-[180px]">
                            <div style:overflow="hidden" class="-mt-[32px] sm:-mt-[64px] h-[110px] sm:h-[135px]" style:min-width="100%">
                                <img style:object-fit="cover" src={row.heroImage.url} alt="Hero" style:top="0px" class="w-full h-auto">    
                            </div>
                        </td>
                        <td>
                            <a class="pl-2" href={'/homebrew/heroes/' + row.id}>{row.name}</a>
                        </td>
                        <td class="hidden sm:table-cell">
                            <a href={'/user/' + row.user.id}>{row.user.userName}</a>
                        </td>
                        <td class="hidden xl:table-cell">
                            {DateHelper.timeSinceString(new Date(row.dateModified), new Date())}
                        </td>
                        <td class="hidden lg:table-cell" style:width="10px" style:position="relative"></td>
                        {#if row.actionDice && row.theme}
                            {#each row.actionDice.dice as dice}
                                <td class="hidden lg:table-cell"><ActionDiceIcon classList="w-[40px] h-[40px]" theme={ThemeTemplatesEnum[row.theme]} icon={DiceIconsEnum[dice]} color={row.actionDice.iconColor}></ActionDiceIcon></td>   
                            {/each}
                        {/if}
                    </tr>
                {/key}
                {/each}
            </tbody>
        </table>
    </div>
</div>
{#if $dataTableStore.pagination}<Paginator on:amount={handleAmountChange} on:page={handlePageChange} bind:settings={$dataTableStore.pagination} />{/if}
{/if}