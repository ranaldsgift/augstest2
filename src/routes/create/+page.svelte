<script lang="ts">
    import NavList from '$lib/components/ComicNavList.svelte';
    import { EnumHelper } from '$lib/helpers/EnumHelper';
    import { HomebrewCategoriesEnum } from '$lib/enums/Enums';
    import { StringHelper } from '$lib/helpers/StringHelper';

    let navItems: {name: string, url: string }[] = [];

    const categories = EnumHelper.getKeys(HomebrewCategoriesEnum);

    categories.forEach(category => {
        navItems.push({
            name: StringHelper.toTitleCase(category),
            url: `/homebrew/${category.toLowerCase()}/create`
        })
    });
</script>

<svelte:head><title> Create Your Homebrew</title></svelte:head>

<ol class="breadcrumb-nonresponsive">
	<li class="crumb"><a href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb">Create</li>
</ol>

<div class="page create-page max-w-7xl">
    <header class="comic-header">
        <h1>What do you want to create?</h1>
    </header>
    <div class="comic-body">
        <NavList listItems={navItems}></NavList>
    </div>
</div>