<script lang="ts">
    import PigeonPeteSays from '$lib/components/PigeonPeteSays.svelte';
    import VillainEditorForm from '$lib/components/VillainEditorForm.svelte';
    import { Villain } from '$lib/entities/Villain';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import { VillainEditStore } from '$lib/stores/PageStores';
    import type { PageData } from './$types';
    
    export let data: PageData;
    
    let villain = DataHelper.deserialize<Villain>(Villain, data.json);
    if ($VillainEditStore.get(villain.id) === undefined) {
        $VillainEditStore.set(villain.id, villain);
    }
</script>

<svelte:head><title>{villain ? `Edit ${villain.name}` : `For Pete's Sake!`} - augs.tools</title></svelte:head>

{#key villain.id}
{#if data.session}
    {#if !villain}
        <p>There is no data available for this Homebrew.</p>
    {:else}
    <ol class={data.breadcrumbClass}>
        <li class="crumb"><a href="/">Home</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a href="/homebrew">Homebrew</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a href="/homebrew/villains">Villains</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a href="/homebrew/villains/{villain.id}">{villain.name}</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Edit</li>
    </ol>
        <VillainEditorForm villain={$VillainEditStore.get(villain.id)}></VillainEditorForm>
    {/if}
{:else}
<div class="flex justify-center">
    <PigeonPeteSays>
        <p>Please login to create homebrew content.</p>
    </PigeonPeteSays>
</div>
{/if}
{/key}