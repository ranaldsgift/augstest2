<script lang="ts">
    import SkillCardEditorForm from '$lib/components/SkillCardEditorForm.svelte';
    import { SkillCard } from '$lib/entities/SkillCard';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import { SkillCardCreateStore } from '$lib/stores/PageStores';
    import type { PageData } from './$types';
    
    export let data: PageData;
    let skillCard = DataHelper.deserialize<SkillCard>(SkillCard, data.skillCard);
    if (!$SkillCardCreateStore || $SkillCardCreateStore.user?.id !== skillCard.user?.id) {
        SkillCardCreateStore.set(skillCard);
    }
</script>

<svelte:head><title>Create Your Skill Card - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
<li class="crumb"><a href="/">Home</a></li>
<li class="crumb-separator" aria-hidden>&rsaquo;</li>
<li class="crumb"><a href="/create">Create</a></li>
<li class="crumb-separator" aria-hidden>&rsaquo;</li>
<li>Skill Card</li>
</ol>

<div class="page flex justify-center">
    <SkillCardEditorForm skillCard={$SkillCardCreateStore}></SkillCardEditorForm>
</div>