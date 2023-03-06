<script lang="ts">
    import HeroEditor from '$lib/components/HeroEditor.svelte';
    import type { PageData } from './$types';
    import { HeroCreateStore } from '$lib/stores/PageStores';

    export let data : PageData;

    if (!$HeroCreateStore || $HeroCreateStore.user?.id !== data.hero?.user?.id) {
        HeroCreateStore.set(data.hero);
    }
</script>

<svelte:head><title>Create Your Hero - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
    <li class="crumb"><a href="/">Home</a></li>
    <li class="crumb-separator" aria-hidden>&rsaquo;</li>
    <li class="crumb"><a href="/create">Create</a></li>
    <li class="crumb-separator" aria-hidden>&rsaquo;</li>
    <li>Hero</li>
</ol>

<HeroEditor hero={$HeroCreateStore}></HeroEditor>