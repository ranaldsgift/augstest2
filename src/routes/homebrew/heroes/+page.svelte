<script lang="ts">
    import ComicButton from '$lib/components/ComicButton.svelte';
    import type { PageData } from './$types';
    import HeroTable from '$lib/components/HeroTable.svelte';
    import PageButtonContainer from '$lib/components/PageButtonContainer.svelte';

    export let data: PageData;
</script>

<svelte:head><title>Browse Heroes - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a href="/homebrew">Homebrew</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Heroes</li>   
</ol>

<div class="max-w-7xl grid gap-5">
    <HeroTable></HeroTable>
    {#if data.session}
    <PageButtonContainer>
        <a href="/homebrew/heroes/create/" class="unstyled">
            <ComicButton icon="mdi:edit" text="Create"></ComicButton>
        </a>
    </PageButtonContainer>
    {/if}
</div>