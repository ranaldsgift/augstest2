<script lang="ts">
    import ComicButton from '$lib/components/ComicButton.svelte';
    import type { PageData } from './$types';
    import HeroTable from '$lib/components/HeroTable.svelte';
    import PageButtonContainer from '$lib/components/PageButtonContainer.svelte';
    import { createDataTableStore } from '@skeletonlabs/skeleton';
    import { HeroesPageStore } from '$lib/stores/PageStores';
    import type { Hero } from '$lib/entities/Hero';

    export let data: PageData;
    let heroes: Hero[] = [];
    let dataTableStore = createDataTableStore(
        heroes,
        {
            search: '',
            sort: '',
            pagination: { offset: 0, limit: 12, size: 0, amounts: [12, 24, 36] }
        }
    );
    if (!$HeroesPageStore) {
        HeroesPageStore.set(dataTableStore);
    }
</script>

<svelte:head><title>Browse Heroes - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Heroes</li>   
</ol>

<div class="max-w-[1400px] grid gap-5">
    <HeroTable dataTableStore={$HeroesPageStore}></HeroTable>
    {#if data.session}
    <PageButtonContainer>
        <a href="/homebrew/heroes/create/" class="unstyled">
            <ComicButton icon="mdi:edit" text="Create"></ComicButton>
        </a>
    </PageButtonContainer>
    {/if}
</div>