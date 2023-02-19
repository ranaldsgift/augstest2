<script lang="ts">
    import type { SkillCard } from "$lib/entities/SkillCard";
    import { SkillCardTemplates } from "$lib/interfaces/templates/SkillCardTemplate";
    import { ThemeTemplatesEnum } from "$lib/interfaces/templates/ThemeTemplatesEnum";
    import { SkillCards } from "$lib/stores/DataStores";
    import { createDataTableStore, dataTableHandler, Paginator, tableInteraction } from "@skeletonlabs/skeleton";
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import SkillCardEditor from "./SkillCardEditor.svelte";

    export let title: string = 'Skill Cards'; 
    export let data: SkillCard[] = [];
    export let userId: string | null = null;
    export let heroId: string | null = null;

    const loadData = async () => {
        let data = SkillCards.loadData(getApiQuery());
        let skills = await data;

        if ($dataTableStore.pagination) {
            $dataTableStore.pagination.size = skills.count;
            
            if ($dataTableStore.pagination.offset * $dataTableStore.pagination.limit > skills.count) {
                $dataTableStore.pagination.offset = skills.count / $dataTableStore.pagination.limit;
            }
        }

        dataTableStore.updateSource(skills.items);
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

        return apiQuery;
    }
    
    let searchInput: HTMLInputElement;
    let sortKey: keyof SkillCard = 'dateModified';
    $: sortKeyState = sortKey;
    $: sortAscState = 'false';

    let delayReload = false;


    const dataTableStore = createDataTableStore(
        data,
        {
            search: '',
            sort: '',
            pagination: { offset: 0, limit: 12, size: 0, amounts: [12, 24, 36] }
        }
    );

    $dataTableStore.sort = 'dateModified';
    $dataTableStore.sortState = { asc: false, lastKey: 'dateModified' };

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
                <input class="unstyled w-full" bind:this={searchInput} bind:value={$dataTableStore.search}  on:input={handleSearch} type="search" placeholder="Search..." />
            </div>
        </div>
        <table class="mt-5 flex flex-wrap gap-5 justify-center">
            {#each $dataTableStore.filtered as row, rowIndex}
            {#key row.id}
            <a in:fade href="/homebrew/skillcards/{row.id}">
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
            {/key}
            {/each}
        </table>
    </div>
</div>
{#if $dataTableStore.pagination}<Paginator on:amount={handleAmountChange} on:page={handlePageChange} bind:settings={$dataTableStore.pagination} />{/if}