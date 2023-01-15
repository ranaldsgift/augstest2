<script lang="ts">
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'
    import { DiceIconsEnum } from '$lib/enums/Enums';
    import { createDataTableStore, dataTableHandler, tableInteraction, Avatar } from '@skeletonlabs/skeleton';
    import { DateHelper } from '$lib/helpers/DateHelper';
    import ComicButton from '$lib/components/ComicButton.svelte';
    import type { PageData } from './$types';
    import { Hero } from '$lib/entities/Hero';
    import { ThemeTemplatesEnum } from '$lib/interfaces/templates/ThemeTemplatesEnum';
    import ActionDiceIcon from '$lib/components/ActionDiceIcon.svelte';
    import { DataHelper } from '$lib/helpers/DataHelper';

    export let data: PageData;

    const parsedItems: Hero[] = DataHelper.deserializeArray<Hero>(Hero, data.jsonList);

    const dataTableStore = createDataTableStore(
        // Pass your source data here:
        parsedItems,
        // Provide optional settings:
        {
            // The current search term.
            search: '',
            // The current sort key.
            sort: '',
            // Paginator component settings.
            pagination: { offset: 0, limit: 10, size: 0, amounts: [1, 2, 5, 10] }
        }
    );
    
    $dataTableStore.sort = 'dateModified';
    $dataTableStore.sortState = { asc: false, lastKey: 'dateModified' }

    // This automatically handles search, sort, etc when the model updates.
    dataTableStore.subscribe((model) => dataTableHandler(model));

    // Skeleton DataTables has a bug that causes the search field to not work after sorting columns
    // These functions are a workaround until that bug is resolved
    function handleSearch() {
        $dataTableStore.sort = '';
    }
    function handleSort() {
        searchInput.dispatchEvent(new Event("input"));
    }

    let searchInput: HTMLInputElement;
</script>

<style>
    .table-container {
        overflow-x: visible;
    }
    .table-container table {
        border: 4px solid black;
        background-color: rgb(var(--color-surface-200) / 1);
    }
    .table-container tbody tr {
        border: 1px solid black;
        background-color: rgb(var(--color-surface-200) / 1);
    }
    .table-hover tbody tr:hover {
        box-shadow: inset 0 -5px 4px -4px rgb(var(--color-secondary-800)), inset 0 10px 9px -9px rgb(var(--color-secondary-800)), inset 1000px 1000px 0 0 rgb(var(--color-secondary-300));
        cursor: pointer;
    }
    .table-container .table tbody td:nth-child(n+5) {
        background-color: var(--diceBackgroundColor);
        width: 60px;
    }
    .table-container .table tbody td:nth-child(5) {
        border-radius: 35px 0 0 35px;
        margin-left: 50px;
        box-shadow: -1px 0px 2px 0 #000000;
    }
    .table-container .table thead tr {
        border: 1px solid black;
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
</style>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Heroes</li>
</ol>

<div class="max-w-5xl grid gap-5">    
    <div class="comic-form">
        <header>
            <h1>Homebrewed Heroes</h1>
        </header>
    </div>

        <div class="table-container grid gap-2">
            <div class="comic-label">
                <h1>Search</h1>
                <input bind:this={searchInput} bind:value={$dataTableStore.search} on:input={handleSearch} type="search" placeholder="Search..." />
            </div>
            
    
            {#if data.session}
            <div class="flex justify-end mr-3">
                <a href={$page.url + "/create"} class="unstyled">
                    <ComicButton icon="mdi:edit" text="New Hero"></ComicButton>
                </a>
            </div>
            {/if}
            <table class="table table-hover" use:tableInteraction>
                <thead on:click={(e) => { dataTableStore.sort(e); handleSort(); }} on:keypress>
                    <tr>
                        <th></th>
                        <th data-sort="name">Hero name</th>
                        <th>Designer</th>
                        <th data-sort="dateModified">Updated</th>
                        <th colspan="6" align="center">Action Dice</th>
                    </tr>
                </thead>
                <tbody>
                    {#each $dataTableStore.filtered as row, rowIndex}
                        <tr>
                            <td width="60px" style:margin="-10px 0" style:background-image={row.heroImage.url}>
                                <Avatar src={row.heroImage.url}></Avatar>
                            </td>
                            <td>
                                <a href={$page.url + '/' + row.id}>{row.name}</a>
                            </td>
                            <td>
                                <a href={'/user/' + row.user.id}>{row.user.userName}</a>
                            </td>
                            <td>
                                {DateHelper.timeSinceString(new Date(row.dateModified), new Date())}
                            </td>
                            {#if row.actionDice && row.theme}
                                {#each row.actionDice.dice as dice}
                                    <td style:--diceBackgroundColor={row.actionDice.backgroundColor} height="20px"><ActionDiceIcon theme={ThemeTemplatesEnum[row.theme]} icon={DiceIconsEnum[dice]} color={row.actionDice.iconColor}></ActionDiceIcon></td>   
                                {/each}
                            {/if}
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
</div>