<script lang="ts">
    import VillainTable from '$lib/components/VillainTable.svelte';
    import type { Villain } from '$lib/entities/Villain';
    import { VillainsPageStore } from '$lib/stores/PageStores';
    import { createDataTableStore } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';    
    
    export let data: PageData;

    if (!$VillainsPageStore) {
        VillainsPageStore.set(createDataTableStore(
            [] as Villain[],
            {
                search: '',
                sort: '',
                pagination: { offset: 0, limit: 12, size: 0, amounts: [12, 24, 36] }
            }
        ));
    }
</script>

<svelte:head>
    <title>Browse Villains - augs.tools</title>
    <meta name="description" content="Browse a list of Villains created by the community." />
</svelte:head>

<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Villains</li>   
</ol>

<div class="page skill-card-page max-w-[1400px]">    
    <VillainTable dataTableStore={$VillainsPageStore}></VillainTable>
</div>
