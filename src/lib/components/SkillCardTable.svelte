<script lang="ts">
    import type { Hero } from "$lib/entities/Hero";
    import type { SkillCard } from "$lib/entities/SkillCard";
    import { DiceIconsEnum } from "$lib/enums/Enums";
    import { DateHelper } from "$lib/helpers/DateHelper";
    import { SkillCardTemplates } from "$lib/interfaces/templates/SkillCardTemplate";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { createDataTableStore, dataTableHandler, Paginator, tableInteraction } from "@skeletonlabs/skeleton";
    import ActionDiceIcon from "./ActionDiceIcon.svelte";
    import SkillCardEditor from "./SkillCardEditor.svelte";
    export let title: string = 'Skill Cards';
    
        export let skillCards: SkillCard[];
        
        let searchInput: HTMLInputElement;
        let sortKey: keyof SkillCard = 'dateModified';
        $: sortKeyState = sortKey;
        $: sortAscState = 'false';
    
        const dataTableStore = createDataTableStore(
            skillCards,
            {
                search: '',
                sort: '',
                pagination: { offset: 0, limit: 20, size: 0, amounts: [10, 20, 50] }
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
            <tbody class="flex flex-wrap justify-center gap-5 mt-5">
                {#each $dataTableStore.filtered as row, rowIndex}
                <a href="/homebrew/skillcards/{row.id}">
                    <div class="read-only">
                        <SkillCardEditor 
                            skillCard={row} 
                            scale={0.5} 
                            backgroundColor={row.hero?.sheetBackgroundColor ?? row.backgroundColor ?? '#adadad'}
                            theme={row.hero?.theme ?? row.theme ?? ThemeTemplatesEnum.TMNT}
                            template={row.hero?.theme ? SkillCardTemplates[row.hero.theme] : row.theme ? SkillCardTemplates[row.theme] : SkillCardTemplates[ThemeTemplatesEnum.TMNT]}
                        ></SkillCardEditor>
                    </div>
                </a>
                {/each}
            </tbody>
        </table>
    </div>
</div>
{#if $dataTableStore.pagination}<Paginator bind:settings={$dataTableStore.pagination} />{/if}