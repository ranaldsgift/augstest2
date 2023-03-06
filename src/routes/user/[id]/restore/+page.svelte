<script lang="ts">
    import HeroTable from '$lib/components/HeroTable.svelte';
    import SkillCardTable from '$lib/components/SkillCardTable.svelte';
    import { User } from '$lib/entities/User';
    import { DataHelper } from '$lib/helpers/DataHelper';
    import type { PageData } from './$types';
    
    export let data: PageData;

    let user = DataHelper.deserialize<User>(User, data.json);
</script>

<svelte:head><title>Restore Homebrews - augs.tools</title></svelte:head>

{#key user.id}
<ol class={data.breadcrumbClass}>
    <li class="crumb"><a href="/">Home</a></li>
    <li class="crumb-separator" aria-hidden>&rsaquo;</li>
    <li class="crumb"><a href="/user/{user.id}">{user.userName}</a></li>
    <li class="crumb-separator" aria-hidden>&rsaquo;</li>
    <li class="crumb">Restore Homebrews</li>
</ol>

<div class="user-restore-page max-w-7xl grid gap-5">
    <div>
        <header class="comic-header">
            <h1>Restore Homebrews</h1>
        </header>
        <div class="comic-body">
            <p>To restore an item, click on it, then click to edit the item, and finally click to restore the item.</p>
        </div>
    </div>
    <HeroTable title="Restore Heroes" isDeleted={true} userId={user.id} hideOnEmpty={true}></HeroTable>
    <SkillCardTable title="Restore Skill Cards" isDeleted={true} userId={user.id} hideOnEmpty={true}></SkillCardTable>
</div>
{/key}