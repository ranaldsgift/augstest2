<script lang="ts">
    import HeroEditor from '$lib/components/HeroEditor.svelte';
    import { Hero } from '$lib/entities/Hero';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import type { PageData } from './$types';

    export let data : PageData;

    $: hero = DataHelper.deserialize<Hero>(Hero, data.hero);
</script>

<svelte:head><title>Create Your Hero - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
    <li class="crumb"><a href="/">Home</a></li>
    <li class="crumb-separator" aria-hidden>&rsaquo;</li>
    <li class="crumb"><a href="/create">Create</a></li>
    <li class="crumb-separator" aria-hidden>&rsaquo;</li>
    <li>Heroes</li>
</ol>

<HeroEditor {hero}></HeroEditor>