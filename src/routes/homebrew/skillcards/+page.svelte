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
                pagination: { offset: 0, limit: 10, size: 0, amounts: [10, 20, 50] }
            }
        ));
    }
</script>

<svelte:head><title>Browse Skills - augs.tools</title></svelte:head>

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
