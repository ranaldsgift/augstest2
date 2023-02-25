<script lang="ts">
    import PigeonPeteSays from '$lib/components/PigeonPeteSays.svelte';
    import SkillCardEditorForm from '$lib/components/SkillCardEditorForm.svelte';
    import { SkillCard } from '$lib/entities/SkillCard';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import { SkillCardEditStore } from '$lib/stores/PageStores';
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    let skillCard = DataHelper.deserialize<SkillCard>(SkillCard, data.json);
    if ($SkillCardEditStore.get(skillCard.id) === undefined) {
        $SkillCardEditStore.set(skillCard.id, skillCard);
    }
</script>

<svelte:head><title>{skillCard ? `Edit ${skillCard.name}` : `For Pete's Sake!`} - augs.tools</title></svelte:head>

{#key skillCard.id}
{#if data.session}
    {#if !skillCard}
        <p>There is no data available for this Homebrew.</p>
    {:else}
    <ol class={data.breadcrumbClass}>
        <li class="crumb"><a href="/">Home</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a href="/homebrew">Homebrew</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a href="/homebrew/skillcards">Skill Cards</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a href="/homebrew/skillcards/{skillCard.id}">{skillCard.name}</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Edit</li>
    </ol>
        <SkillCardEditorForm skillCard={$SkillCardEditStore.get(skillCard.id)}></SkillCardEditorForm>
    {/if}
{:else}
<div class="flex justify-center">
    <PigeonPeteSays>
        <p>Please login to create homebrew content.</p>
    </PigeonPeteSays>
</div>
{/if}
{/key}