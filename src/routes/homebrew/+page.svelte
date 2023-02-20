<script lang="ts">
    import NavList from '$lib/components/ComicNavList.svelte';
    import { EnumHelper } from '$lib/helpers/EnumHelper';
    import { HomebrewCategoriesEnum } from '$lib/enums/Enums';
    import { StringHelper } from '$lib/helpers/StringHelper';
    import type { PageData } from './$types';

    export let data: PageData;

    let navItems: {name: string, url: string }[] = [];

    const categories = EnumHelper.getKeys(HomebrewCategoriesEnum);

    categories.forEach(category => {
        navItems.push({
            name: StringHelper.toTitleCase(category),
            url: `/homebrew/${category.toLowerCase()}`
        })
    });
</script>

<svelte:head><title>Browse Homebrews - augs.tools</title></svelte:head>

<ol class={data.breadcrumbClass}>
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Homebrew</li>
</ol>

<div class="page create-page max-w-7xl">
    <header class="comic-header">
        <h1>What would you like to see?</h1>
    </header>
    <div class="comic-body">
        <NavList listItems={navItems}></NavList>
    </div>
</div>