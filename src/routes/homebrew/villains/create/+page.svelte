<script lang="ts">
    import VillainEditorForm from '$lib/components/VillainEditorForm.svelte';
    import { Villain } from '$lib/entities/Villain';
    import { ThemeTemplatesEnum } from '$lib/interfaces/templates/ThemeTemplatesEnum';
    
    import { VillainCreateStore } from '$lib/stores/PageStores';
    import type { PageData } from './$types';
    
    export let data: PageData;

    if (!$VillainCreateStore || $VillainCreateStore.user?.id !== data.villain?.user?.id) {
        VillainCreateStore.set(data.villain);
    }

</script>

<svelte:head><title>Create Your Villain - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
    <li class="crumb"><a href="/">Home</a></li>
    <li class="crumb-separator" aria-hidden>&rsaquo;</li>
    <li class="crumb"><a href="/create">Create</a></li>
    <li class="crumb-separator" aria-hidden>&rsaquo;</li>
    <li>Villain</li>
</ol>

<div class="page villain-create-page max-w-7xl">
    <VillainEditorForm villain={$VillainCreateStore}></VillainEditorForm>
</div>