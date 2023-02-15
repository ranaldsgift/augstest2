<script lang="ts">
    import SkillCardTable from '$lib/components/SkillCardTable.svelte';
    import { SkillCard } from '$lib/entities/SkillCard';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import type { PageData } from './$types';
    
    export let data: PageData;
    const parsedItems: SkillCard[] = DataHelper.deserializeArray<SkillCard>(SkillCard, data.jsonList);
</script>

<svelte:head><title>Browse Skills - augs.tools</title></svelte:head>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Skill Cards</li>   
</ol>

<div class="page skill-card-page max-w-[1400px]">    
    <SkillCardTable skillCards={parsedItems}></SkillCardTable>
</div>
