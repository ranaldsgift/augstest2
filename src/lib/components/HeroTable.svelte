<script lang="ts">
    import type { Hero } from "$lib/entities/Hero";
    import { DiceIconsEnum } from "$lib/enums/Enums";
    import { DateHelper } from "$lib/helpers/DateHelper";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { createDataTableStore, dataTableHandler, Paginator, tableInteraction } from "@skeletonlabs/skeleton";
    import ActionDiceIcon from "./ActionDiceIcon.svelte";
    export let title: string = 'Heroes';
    
        export let heroes: Hero[];
        
        let searchInput: HTMLInputElement;
        let sortKey: keyof Hero = 'dateModified';
        $: sortKeyState = sortKey;
        $: sortAscState = 'false';
    
        const dataTableStore = createDataTableStore(
            heroes,
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

<div class="table-container grid">
    <header class="comic-header">
        <h1>{title}</h1>
    </header>
    <div class="comic-body">
        <div class="flex gap-5 relative">
            <div class="comic-label" style:max-width="200px">
                <h1>Sort</h1>
                <select class="unstyled" bind:value={sortKeyState} on:change={(e) => { $dataTableStore.sort = sortKeyState; handleSort()}}>
                    <option value="dateModified">Last Updated</option>
                    <option value="name">Name</option>
                </select>
            </div>
            <div class="comic-label" style:max-width="150px">
                <h1>Order</h1>
                <select class="unstyled" bind:value={sortAscState} on:change={(e) => { handleSort() }}>
                    <option value="true">Ascending</option>
                    <option selected value="false">Descending</option>
                </select>
            </div>
            <div class="comic-label flex-1 grid">
                <h1>Search</h1>
                <input class="unstyled" bind:this={searchInput} bind:value={$dataTableStore.search} on:input={handleSearch} type="search" placeholder="Search..." />
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
                    <tr style:height="80px"></tr>
                    <tr class="comic-shadow" style:--diceBackgroundColor={row.actionDice.backgroundColor}>
                        <td style:position="relative" width="180px">
                            <div style:overflow="hidden" style:margin-top="-64px" style:height="135px" style:min-width="180px">
                                <img src={row.heroImage.url} alt="Hero" style:top="0px">    
                            </div>
                        </td>
                        <td>
                            <a class="pl-2" href={'/homebrew/heroes/' + row.id}>{row.name}</a>
                        </td>
                        <td>
                            <a href={'/user/' + row.user.id}>{row.user.userName}</a>
                        </td>
                        <td>
                            {DateHelper.timeSinceString(new Date(row.dateModified), new Date())}
                        </td>
                        <td style:width="10px" style:position="relative"></td>
                        {#if row.actionDice && row.theme}
                            {#each row.actionDice.dice as dice}
                                <td height="20px"><ActionDiceIcon theme={ThemeTemplatesEnum[row.theme]} icon={DiceIconsEnum[dice]} color={row.actionDice.iconColor}></ActionDiceIcon></td>   
                            {/each}
                        {/if}
                    </tr>
                {/each}
            </tbody>
        </table>
    </div>
</div>
{#if $dataTableStore.pagination}<Paginator bind:settings={$dataTableStore.pagination} />{/if}