<script lang="ts">
    import HeroEditor from '$lib/components/HeroEditor.svelte';
    import PigeonPeteSays from '$lib/components/PigeonPeteSays.svelte';
    import type { PageData } from './$types';
    import { Hero } from '$lib/entities/Hero';
    import { DataHelper } from '$lib/helpers/DataHelper';

    export let data: PageData;
    
    $: hero = DataHelper.deserialize<Hero>(Hero, data.heroModel);
</script>

<svelte:head><title>{hero ? `Edit ${hero.name}` : `For Pete's Sake!`} - augs.tools</title></svelte:head>


{#if data.session}
    {#if !hero}
        <p>There is no data available for this Homebrew.</p>
    {:else}
    <ol class={data.breadcrumbClass}>
        <li class="crumb"><a href="/">Home</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a href="/homebrew">Homebrew</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a href="/homebrew/heroes">Heroes</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li class="crumb"><a href="/homebrew/heroes/{hero.id}">{hero.name}</a></li>
        <li class="crumb-separator" aria-hidden>&rsaquo;</li>
        <li>Edit</li>
    </ol>
        <HeroEditor hero={hero}></HeroEditor>
    {/if}
{:else}
<div class="flex justify-center">
    <PigeonPeteSays>
        <p>Please login to create homebrew content.</p>
    </PigeonPeteSays>
</div>
{/if}