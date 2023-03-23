<script lang="ts">
    import SkillCardTable from '$lib/components/SkillCardTable.svelte';
    import type { SkillCard } from '$lib/entities/SkillCard';
    import { SkillCardsPageStore } from '$lib/stores/PageStores';
    import { createDataTableStore } from '@skeletonlabs/skeleton';
    import type { PageData } from './$types';    
    
    export let data: PageData;

    if (!$SkillCardsPageStore) {
        SkillCardsPageStore.set(createDataTableStore(
            [] as SkillCard[],
            {
                search: '',
                sort: '',
                pagination: { offset: 0, limit: 12, size: 0, amounts: [12, 24, 36] }
            }
        ));
    }
</script>

<svelte:head>
    <title>Browse Skills - augs.tools</title>
    <meta name="description" content="Browse a list of Skill Cards created by the community." />
</svelte:head>

<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Skill Cards</li>   
</ol>

<div class="page skill-card-page max-w-[1400px]">    
    <SkillCardTable dataTableStore={$SkillCardsPageStore}></SkillCardTable>
</div>
